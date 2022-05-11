import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form'

import {
    ChakraProvider,
    Container,
    Button,
    Select,
    FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react'

import theme from '../../theme'


const client = init();
const PROXY_URL = process.env.REACT_APP_PROXY_URL 


interface Ticket {
    project: string;
    issue: string;
    summary: string;
    description: string;
    labels: string;
}

interface Project {
    key: string;
    id: string;
    name: string;
}

interface IssueType {
    id: string;
    name: string;
}


function Modal() {
    const { register, handleSubmit } = useForm()
    const [ projects, setProjects ] = useState<Project[]>([])

    useEffect(() => {
        fetch(`${PROXY_URL}/projects`)
            .then(res => res.json())
            .then(projectsData => {
                const { data } = projectsData

                console.log("====")
                console.log(data)
                console.log("====")

                setProjects(data)
            })
            .catch(err => console.error("Oh no", err))
    }, [])

    const onSubmit = (data: any) => {
        console.log("====")
        console.log(data)
        console.log("====")
    }

    if (!projects.length) return <div>Loading...</div>

    console.log("+++++")
    console.log(projects)
    console.log("+++++")

    return (
        <Container pb='16px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='project'>Select project</FormLabel>
                    <Select id='project' {...register('project')}  placeholder='Projects'>
                        {
                            projects.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='issue'>Issue type</FormLabel>
                    <Select id='issue' {...register('issue')}  placeholder='Bug'>
                        <option value='bug1'>Bug 1</option>
                        <option value='bug2'>Bug 2</option>
                        <option value='bug3'>Bug 3</option>
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
                <FormControl mb='16px'>
                    <FormLabel htmlFor='labels'>Labels</FormLabel>
                    <Input type='text' id='labels' {...register('labels')} />
                </FormControl>
                <Button type='submit'>Create ticket</Button>
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
