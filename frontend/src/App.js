import React from 'react'
import { useState, useEffect } from 'react'
import service from './services/service'

const App = () => {
    const [content, setContent] = useState()

    useEffect(() => {
        service.getAll().then(response => {
            setContent(response)
        }, [])
    })

    return (
        <div>
            <p>Hello world :)</p>
            {content}
        </div>
    )
}


export default App