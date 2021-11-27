import { useState } from 'react'

const useMessage = () => {
    const [messages, setMessages] = useState([])
    const [errorMessages, setErrorMessages] = useState([])

    const setMsg = (msg, duration = null) => {
        if (messages.includes(msg)) {
            return
        }

        setMessages(messages.concat(msg))

        if (duration) {
            setTimeout(() => {
                setMessages(messages.filter(msgInArray => msgInArray !== msg))
            }, duration * 1000)
        }
    }

    const setErrorMsg = (msg, duration = 10) => {
        if (errorMessages.includes(msg)) {
            return
        }

        setErrorMessages(errorMessages.concat(msg))

        setTimeout(() => {
            setErrorMessages(errorMessages.filter(msgInArray => msgInArray !== msg))
        }, duration * 1000)
    }

    const clear = () => {
        setMessages([])
        setErrorMessages([])
    }

    const messagesNotEmpty = () => messages.length > 0
    const errorMessagesNotEmpty = () => errorMessages.length > 0

    return {
        messages,
        errorMessages,
        setMsg,
        setErrorMsg,
        messagesNotEmpty,
        errorMessagesNotEmpty,
        clear
    }
}

export default useMessage