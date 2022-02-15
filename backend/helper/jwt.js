const jwt = require('jsonwebtoken');

let acsToken = '';
let rfsToken = []

module.exports = {
    acsToken,
    rfsToken,

    authenticateToken: function (req, res, next) { 
        const token = req.headers.authorization.split(' ')[1];
        const user = req.headers["user"]

        jwt.verify(token, process.env.ACS_TKN_SCT, (err, usr) => {
            if (err) res.sendStatus(403)
            else if (usr.user == user) res.sendStatus(403)
            else next()
        })
        next()
    },

    generateAdminAcsToken: function (user) {return jwt.sign({user: user}, process.env.ACS_TKN_SCT, { expiresIn: '1d' }) },
    generateAdminRfsToken: function (user) {return jwt.sign({user: user}, process.env.RFS_TKN_SCT, { expiresIn: '7d' }) }

}