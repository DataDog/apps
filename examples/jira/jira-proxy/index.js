const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const JIRA_EMAIL = process.env.JIRA_EMAIL
const JIRA_API_KEY = process.env.JIRA_API_KEY
const JIRA_URL = process.env.JIRA_URL

const AUTHORIZATION = `${JIRA_EMAIL}:${JIRA_API_KEY}`


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

    console.log("====")
    console.log(projectsWithIssueTypes)
    console.log("====")

    res.json({
        data: projectsWithIssueTypes
    })
})


app.get('/issue-types', async (req, res) => {
    const data = await getIssueTypes()

    res.json({
        data
    })
})


app.listen(3000, () => {
    console.log('Magic happens')
})




