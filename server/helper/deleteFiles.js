const fs = require('fs')

module.exports = {
    deleteFiles: (files) => {
        files.image.forEach(value => {
            fs.unlinkSync(value.path)
        })
    }
}