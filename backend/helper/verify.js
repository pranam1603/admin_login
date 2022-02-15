const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceSid = process.env.TWILIO_SERVICE_SID
const client = require('twilio')(accountSid, authToken);

module.exports = function (app) {

    app.route('/api/verify/getcode')
        .post((req, res, next) => {
            const { to, channel } = req.body
            client.verify.services(serviceSid)
                .verifications
                .create({ to, channel })
                .then(verifyStatus => res.json({ error: false, message: 'Code Sent Successfully', data: verifyStatus}))
                .catch(err => res.json({error:true, message: 'Something went wrong', data: null}))
        })
    
    app.route('/api/verify/checkcode')
        .post((req, res, next) => {
            const { to, code } = req.body;
            client.verify.services(serviceSid)
                .verificationChecks
                .create({ to, code })
                .then(verification => res.json({ error: false, message: 'OK', data: verification }))
                .catch(err => res.json({error:true, message: 'Invalid OTP', data: null}))
    })
}