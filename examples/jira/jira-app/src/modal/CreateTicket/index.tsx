import { init } from '@datadog/ui-extensions-sdk';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import {
    ChakraProvider,
    Container,
    Button,
    Select,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Text
} from '@chakra-ui/react'

import theme from '../../theme'


const client = init();
const PROXY_URL = process.env.REACT_APP_PROXY_URL 


type Ticket = {
    description: string;
    issue: string;
    project: string;
    summary: string;
}

interface IssueType {
    description: string;
    id: string;
    name: string;
}

interface Project {
    id: string;
    issueTypes: [IssueType];
    key: string;
    name: string;
}


function Modal() {
    const { register, handleSubmit, watch } = useForm<Ticket>()

    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ hasError, setHasError ] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ projects, setProjects ] = useState<Project[]>([])

    useEffect(() => {
        fetch(`${PROXY_URL}/projects`)
            .then(res => res.json())
            .then(projectsData => {
                const { data } = projectsData
                setProjects(data)
            })
            .catch(err => console.error("Oh no", err))
    }, [])

    
    const onSubmit: SubmitHandler<Ticket> = async data => {
        const { args }: { args?: any } = await client.getContext()

        setIsSubmitting(true)

        fetch(`${PROXY_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                description: data.description,
                issueTypeId: data.issue,
                projectId: data.project,
                request: args.requests[0].queries[0].query,
                summary: data.summary,
                timeframe: args.timeframe
            })
        })
            .then(res => res.json())
            .then(() => {
                setIsSubmitted(true)
            })
            .catch(() => setHasError(true))
    }

    if (!projects.length) return <div>Loading...</div>

    if (hasError) {
        return (
            <Container pb='16px'>
                <Text fontSize='md' color='red.500'>
                    An error occurred when creating the issue
                </Text>
            </Container>
        )
    }

    if (isSubmitted) {
        return (
            <Container pb='16px'>
                <Text fontSize='md' color='green.500'>
                    Issue Created on Jira
                </Text>
            </Container>
        )
    }

    const currentProject = watch('project')

    return (
        <Container pb='16px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='project'>Select project</FormLabel>
                    <Select id='project' {...register('project')} placeholder='Projects'>
                        {
                            projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='issue'>Issue type</FormLabel>
                    <Select id='issue' {...register('issue')}  placeholder='Types'>
                        {
                            currentProject 
                                ? projects
                                    .filter(project => project.id === currentProject)
                                    .map(project => project.issueTypes.map(issueType => (
                                        <option key={issueType.id} value={issueType.id}>{issueType.name}</option>
                                    )))
                                : projects.map(project => project.issueTypes.map(issueType => (
                                    <option key={issueType.id} value={issueType.id}>{issueType.name}</option>
                                 )))
                        }
                    </Select>
                </FormControl>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='summary'>Ticket summary</FormLabel>
                    <Input type='text' id='summary' {...register('summary')} />
                </FormControl>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='description'>Ticket Description</FormLabel>
                    <Textarea id='description' {...register('description')} />
                </FormControl>
                <Button type='submit' isLoading={isSubmitting}>Create ticket</Button>
            </form>
        </Container>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <Modal />
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
