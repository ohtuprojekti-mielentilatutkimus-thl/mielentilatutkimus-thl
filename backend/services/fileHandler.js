const fs = require('fs').promises
const path = require('path')


async function bufferToPdf(buffer, fileName) {
    try {
        await fs.writeFile(fileName, buffer, { encoding: 'binary'}, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('file written succesfully')
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const deleteTmpFile = fileName => fs.unlink(path.resolve('./', fileName))

module.exports = { bufferToPdf, deleteTmpFile }