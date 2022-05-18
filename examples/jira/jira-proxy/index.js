const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { v1 } = require('@datadog/datadog-api-client')

const app = express()

app.use(express.json())
app.use(cors())

const JIRA_EMAIL = process.env.JIRA_EMAIL
const JIRA_API_KEY = process.env.JIRA_API_KEY
const JIRA_URL = process.env.JIRA_URL

const AUTHORIZATION = `${JIRA_EMAIL}:${JIRA_API_KEY}`

const configuration = v1.createConfiguration()
const apiInstance = new v1.SnapshotsApi(configuration)

async function getProjects() {
    const res = await fetch(`${JIRA_URL}/rest/api/3/project`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${Buffer.from(
               AUTHORIZATION 
            ).toString('base64')}`
        }
    })
    return await res.json()
}

async function getIssueTypes(projectId) {
    const res = await fetch(`${JIRA_URL}/rest/api/3/issuetype/project?projectId=${projectId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${Buffer.from(
               AUTHORIZATION 
            ).toString('base64')}`
        }
    })
    return await res.json()
}

async function createIssue(issue) {
    const {
        summary,
        description,
        projectId,
        issueTypeId,
        snapshotUrl
    } = issue

    const bodyData = {
        fields: {
            summary,
            issuetype: {
                id: issueTypeId
            },
            project: {
                id: projectId
            },
            description: {
                type: "doc",
                version: 1,
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                text: description,
                                type: "text"
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                text: snapshotUrl,
                                type: "text"
                            }
                        ]
                    }
                ]
            }
        }
    }

    return await fetch(`${JIRA_URL}/rest/api/3/issue`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(
               AUTHORIZATION 
            ).toString('base64')}`
        },
        body: JSON.stringify(bodyData)
    })
        .then(res => res.json())
        .catch(err => console.log("an error occurs", err))
}

app.get('/projects', async (req, res) => {
    const projects = await getProjects()

    const projectsWithIssueTypes = await Promise.all(projects.map(async project => {
        const { id } = project
        const issueTypes = await getIssueTypes(id)

        return {
            ...project,
            issueTypes
        }
    }))

    res.json({
        data: projectsWithIssueTypes
    })
})

app.post('/projects', async(req, res) => {
    const {
        body: {
            request,
            timeframe: {
                start, end
            },
            description,
            issueTypeId,
            projectId,
            summary
        }
    } = req

    const params = {
        metricQuery: request,
        start,
        end
    }

    const { snapshotUrl } = await apiInstance.getGraphSnapshot(params)
        .then(data => data)
        .catch(err => console.log("an error occurs", err))

    const jiraResponse = await createIssue({
        summary,
        description,
        issueTypeId,
        projectId,
        snapshotUrl
    })

    console.log("======")
    console.log(jiraResponse)
    console.log("======")

    res.json({
        data: jiraResponse
    })
})


app.listen(3000, () => {
    console.log('Magic happens')
})

