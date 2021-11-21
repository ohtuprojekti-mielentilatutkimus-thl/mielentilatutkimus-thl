import React from 'react'
import { Chip } from '@material-ui/core'
import { styled } from '@material-ui/core'

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
            fileName={fileInfo.name}
            attachmentType={fileInfo.whichFile}
        />
    </ListItem>
)

export default FileChip