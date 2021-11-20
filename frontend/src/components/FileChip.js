import React from 'react'
import { Chip } from '@material-ui/core'
import { styled } from '@material-ui/core'

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(1),
    alignSelf: 'center',
}))

const FileChip = ({ fileName, attachmentType, removeFile }) => (
    <ListItem>
        <Chip
            label={fileName}
            variant="outlined"
            onDelete={() => removeFile(fileName)}
            fileName={fileName}
            attachmentType={attachmentType}
        />
    </ListItem>
)

export default FileChip