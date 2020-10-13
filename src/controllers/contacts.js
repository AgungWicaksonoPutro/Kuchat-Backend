const contactModels = require('../models/contacts')
const helpers = require('../helpers/response')

const contacts = {
    getContactById: (req, res) => {
        const id = req.params.id
        contactModels.getFriend(id)
            .then((result) => {
                if (result != '') {
                    helpers.response(res, result, 200, null)
                } else {
                    helpers.response(res, { message: 'Data Not Found!' }, 401, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = contacts
