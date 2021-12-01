import { useState } from 'react'

const useMessage = () => {
    const [messages, setMessages] = useState([])
    const [errorMessages, setErrorMessages] = useState([])

    const setMsg = (msg, duration = null, afterMsgFunc = null) => {
        if (messages.includes(msg)) {
            return
        }

        setMessages((prevMessages) => (
            prevMessages.concat(msg)
        ))

        if (duration) {
            setTimeout(() => {
                setMessages(messages.filter(msgInArray => msgInArray !== msg))
                afterMsgFunc()
            }, duration * 1000)
        }
    }

    const setErrorMsg = (msg, duration = 10, afterMsgFunc = null) => {
        if (errorMessages.includes(msg)) {
            return
        }

        setErrorMessages((prevMessages) => (
            prevMessages.concat(msg)
        ))

        setTimeout(() => {
            setErrorMessages(errorMessages.filter(msgInArray => msgInArray !== msg))
            afterMsgFunc()
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