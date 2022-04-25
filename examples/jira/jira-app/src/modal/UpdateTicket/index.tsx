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
    FormLabel,
    FormControl,
    Textarea
} from '@chakra-ui/react'

import theme from '../../theme'

const client = init();


function Modal() {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        console.log("=====")
        console.log(data)
        console.log("=====")
    }

    return (
        <Container pb='16px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel htmlFor='project'>Select project</FormLabel>
                    <Select id='project' {...register('project')}  placeholder='Projects'>
                        <option value='project1'>Project 1</option>
                        <option value='project2'>Project 2</option>
                        <option value='project3'>Project 3</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='ticket'>Select ticket</FormLabel>
                    <Select id='ticket' {...register('ticket')}  placeholder='Ticket'>
                        <option value='ticket1'>Ticket 1</option>
                        <option value='ticket2'>Ticket 2</option>
                        <option value='ticket3'>Ticket 3</option>
                    </Select>
                </FormControl>
                <FormControl mb='16px'>
                    <FormLabel htmlFor='comment'>Comment</FormLabel>
                    <Textarea id='comment' {...register('comment')} />
                </FormControl>
                <Button type='submit'>Update ticket</Button>
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
