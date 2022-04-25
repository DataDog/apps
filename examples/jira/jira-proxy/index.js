const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const JIRA_EMAIL = process.env.JIRA_EMAIL
const JIRA_API_KEY = process.env.JIRA_API_KEY
const JIRA_URL = process.env.JIRA_URL

const AUTHORIZATION = `${JIRA_EMAIL}:${JIRA_API_KEY}`


async function main() {
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

app.get('/', async (req, res) => {
    const data = await main()

    res.json({
        data
    })
})



app.listen(3000, () => {
    console.log('Magic happens')
})




