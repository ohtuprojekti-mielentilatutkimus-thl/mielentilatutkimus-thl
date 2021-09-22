import ReactDOM from 'react-dom'
import App from './App'
import React from 'react'
import {  HashRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Router basename='/mielentilatutkimus'>
        <App/>
    </Router>,
    document.getElementById('root')
)