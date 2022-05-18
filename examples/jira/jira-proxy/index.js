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


    const bodyData = {
        fields: {
            summary: "Hello from API 6.0",
            issuetype: {
                id: "10001"
            },
            project: {
                id: "10000"
            },
            description: {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                text: "A nice description",
                                type: "text"
                            }
                        ]
                    }
                ]
            }
        }
    }

    console.log("=====")
    console.log(bodyData)
    console.log("=====")

    const res = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
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

    console.log("=====")
    console.log(res)
    console.log("=====")
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

    await createIssue({
        summary,
        description: snapshotUrl,
        issueTypeId,
        projectId
    })

    res.json({
        data: 'ok'
    })
})


app.listen(3000, () => {
    console.log('Magic happens')
})

