const fs = require('fs').promises
const path = require('path')

const tmpFolder = './tmp'

async function bufferToPdf(buffer, fileName) {
    ensureTmpFolderExists()    

    try {
        await fs.writeFile(tmpFolder + '/' + fileName, buffer, { encoding: 'binary'}, (err) => {
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

const ensureTmpFolderExists = async () => {
    try {
        await fs.mkdir(path.resolve('./', 'tmp'))
    } catch (err) {
        if (err.code === 'EEXIST') {
            return
        }
        console.log(err)
    }
}

const deleteTmpFile = fileName => fs.unlink(path.resolve(tmpFolder, fileName))

module.exports = { bufferToPdf, deleteTmpFile }