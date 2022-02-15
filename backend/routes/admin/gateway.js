const auth = require('../../helper/jwt')

module.exports = function (app, admConnection, uuidv4, bcrypt) {

    app.route('/api/admins/signup')
        .post((req, res, next) => {
            let { username, password, email } = req.body;
            if (username.length > 0 && password.length > 0 && email.length > 0) {
                bcrypt.genSalt(process.env.SALT)
                .then(salt => { 
                    bcrypt.hash(password, salt).then(hash => {
                        admConnection.query("INSERT INTO `databassee`.`admin` (`id`, `username`, `password`, `email`) VALUES (?, ?, ?, ?)",[uuidv4(), username, hash, email],
                            (sqlErr, sqlResult) => {
                                if (sqlErr) {
                                    if(sqlErr.code === "ER_DUP_ENTRY") res.json({error: true, message: "Admin Exists.", data: null})
                                    else res.json({error: true, message: "Something went wrong", data: null})
                                } else {
                                    res.json({error: false, message: "Admin created successfully", data: null})
                                }
                            })
                    })
                })
                .catch(bcryptErr => {
                    res.json({error: true, message: "Something went wrong", data: null})
                })
            } else {
                res.json({error: true, message: "Invalid Input", data: null})
            }
        })
    
    app.route('/api/admins/login')
        .post((req, res, next) => { 
            let { username, password } = req.body;
            if (username.length > 0 && password.length > 0) {
                admConnection.query("SELECT * FROM `databassee`.`admin` WHERE `username` = ?", [username],
                    (sqlErr, sqlResult) => {
                        if (sqlErr) {
                            res.json({error: true, message: "Something went wrong", data: null})
                        } else {
                            if (sqlResult.length > 0) {
                                bcrypt.compare(password, sqlResult[0].password).then(result => {
                                    if (result) {
                                        const acsToken = auth.generateAdminAcsToken(sqlResult[0].username)
                                        const rfsToken = auth.generateAdminRfsToken(sqlResult[0].username)
                                        res.json({error: false, message: "Login Successful", data: {username, acsToken, rfsToken}})
                                    } else {
                                        res.json({error: true, message: "Invalid Password", data: null})
                                    }
                                })
                            } else {
                                res.json({error: true, message: "Invalid Username", data: null})
                            }
                        }
                    })
            } else {
                res.json({error: true, message: "Invalid Input", data: null})
            }
        })
    
    app.route('/api/admin/dash')
        .get((req, res, next) => {
        res.json({error: false, message:"Nice Work", data: null})
    })
}