import { Button, Input, Stack, useNumberInput } from '@chakra-ui/react'

export interface PizzaInputProps {
    onIncrement?: React.MouseEventHandler<HTMLButtonElement>
    onDecrement?: React.MouseEventHandler<HTMLButtonElement>
}

export function PizzaInput({ onIncrement, onDecrement }: PizzaInputProps) {
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps
    } = useNumberInput({
        step: 1,
        defaultValue: 0,
        min: 0,
        max: 10,
        precision: 0,
    })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    if (typeof onIncrement === 'function') {
        inc.onClick = onIncrement
    }

    if (typeof onDecrement === 'function') {
        dec.onClick = onDecrement
    }

    return (
        <Stack width='40px' justifyContent="center">
            <Button {...inc} onClick={onIncrement} margin="0">+</Button>
            <Input {...input} marginX="0" marginY="5px" textAlign="center" readOnly />
            <Button {...dec} onClick={onDecrement} margin="0">-</Button>
        </Stack>
    )
}
