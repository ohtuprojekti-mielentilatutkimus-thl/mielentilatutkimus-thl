const _ = require('lodash')

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}
    
const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}
//https://www.freecodecamp.org/news/how-to-log-a-node-js-api-in-an-express-js-app-with-mongoose-plugins-efe32717b59/
const getDiff = (curr, prev) => {
    function changes(object, base) {
        return _.transform(object, (result, value, key) => {
            if (!_.isEqual(value, base[key]))
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
        })
    }
    return changes(curr, prev)
}


module.exports = {
    info, error, getDiff
}