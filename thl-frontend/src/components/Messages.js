import React from 'react'
import { Alert } from '@material-ui/lab'
import { Stack } from '@mui/material'

const Messages = ({ msgArray, severity }) => (
    <Stack spacing={1}>
        {msgArray.map(msg => (
            <Alert key={msg} severity={severity}>{msg}</Alert>
        ))}
    </Stack>
)

export default Messages