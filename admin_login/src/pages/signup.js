import React, { useState } from 'react'
import axios from 'axios'
import { Navigate  } from 'react-router-dom'


const Signup = props => {

    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Shownext, setShownext] = useState('')
    const [RedirectTo, setRedirect] = useState(false)

    if(RedirectTo){
        return <Navigate to="/login" />
    }

    const handleClick = () => {
        const user = {
            username: Username,
            email: Email,
            password: Password
        }

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8080/api/admins/signup',
            data: user
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200 && response.data.message === 'Admin created successfully') {
                    setPassword('')
                    setUsername('')
                    setEmail('')
                    setRedirect(true)
                }
            })
            .catch((error) => {
            console.log(error);
        })
    }

    return (
    <div>
        <div>
                <h1>Admin SignUp</h1>
                <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button onClick={handleClick}>Submit</button>
        </div>
    </div>
    );
}

export default Signup;
