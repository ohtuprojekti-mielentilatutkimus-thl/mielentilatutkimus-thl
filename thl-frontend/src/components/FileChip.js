import React from 'react'
import { Chip } from '@mui/material'
import { styled } from '@mui/material'

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(1),
}))

const FileChip = ({ fileInfo, removeFile }) => (
    <ListItem>
        <Chip
            disabled={fileInfo.disabled}
            label={fileInfo.name}
            variant='outlined'
            onDelete={() => removeFile(fileInfo.name)}
            filename={fileInfo.name}
            attachmenttype={fileInfo.whichFile}
        />
    </ListItem>
)

export default FileChip