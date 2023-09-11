const fs = require('fs')

module.exports = {
    deleteFiles: (files) => {
        console.log(files)
        files.images.forEach(value => {

            fs.unlinkSync(value.path)
        })
    }
}