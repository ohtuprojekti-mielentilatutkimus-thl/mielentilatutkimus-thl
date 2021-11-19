import React from 'react'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const FileButton = ({ fileName, attachmentType, removeFile }) => (
    <Button variant="text" onClick={() => removeFile(fileName)} endIcon={<Delete />} fileName={fileName} attachmentType={attachmentType}>
        {fileName}
    </Button>
)

export default FileButton