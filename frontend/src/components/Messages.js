import React from 'react'
import { Alert } from '@material-ui/lab'

const Messages = ({ msgArray, severity }) => (
    <div>
        {msgArray.map(msg => (
            <Alert key={msg} severity={severity}>{msg}</Alert>
        ))}
    </div>
)

export default Messages