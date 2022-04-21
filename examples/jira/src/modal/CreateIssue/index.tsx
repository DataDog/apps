import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import React, { useState } from 'react';
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


interface Ticket {
    project: string;
    issue: string;
    summary: string;
    description: string;
    labels: string;
}


function Modal() {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        console.log("====")
        console.log(data)
        console.log("====")
    }

    return (
        <Container pb='16px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='project'>Select project</FormLabel>
                    <Select id='project' {...register('project')}  placeholder='Projects'>
                        <option value='project1'>Project 1</option>
                        <option value='project2'>Project 2</option>
                        <option value='project3'>Project 3</option>
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
                <Button type='submit'>Submit</Button>
            </form>
        </Container>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider>
                <Modal />
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
