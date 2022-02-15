import axios from 'axios'
import React, { useState } from 'react'
import { Navigate  } from 'react-router-dom'


import {setAccessToken, setRefreshToken, setUser} from '../helpers/token'

const Login = () => {

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Loading, setLoading] = useState(false)
    const [RedirectTo, setRedirect] = useState(false)

    if (Loading) {
        return <div>Loading...</div>
    }

    if(RedirectTo){
        return <Navigate to="/verify" />
    }

    const handleClick = () => {
        localStorage.clear()
        setLoading(true)
        const credentials = {
            username: Username,
            password: Password
        }
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/admins/login',
            data: credentials
        })
            .then((response) => {   
                if (response.status === 200) {
                    if (!response.data.error && response.data.message == 'Login Successful') {
                        console.log(response.data.data.acsToken);
                        setAccessToken(response.data.data.acsToken)
                        setRefreshToken(response.data.data.rfsToken)
                        setUser(response.data.data.username)
                        setPassword('')
                        setUsername('')
                        axios({
                            method: 'POST',
                            url: 'http://127.0.0.1:8080/api/verify/getcode',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            data: {
                                to: '+918269866601',
                                channel: 'sms'
                            }
                        })
                            .then(res => {
                                setLoading(false)
                                if (res.status == 200) setRedirect(true)
                                else console.log('Not 200 OTP');
                            })
                            .catch(err => { 
                                setLoading(false)
                                console.log("Otp not Sent");
                            })
                    } else {
                        setLoading(false)
                        console.log("Error");
                    }
                } else {
                    setLoading(false)
                    console.log("Error");
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error.stack);
            })
    }

    return (
        <div>
            <div>
                    <h1>Admin Login</h1>
                    <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    <button onClick={handleClick}>Submit</button>
            </div>
        </div>
        );
}

export default Login