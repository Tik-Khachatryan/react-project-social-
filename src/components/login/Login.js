import React, {useState,} from 'react';
import {Redirect} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function Login({setInit}) {
    const [data, setData] = useState({
        email: '',
        password: '',
        success: null,
    });

    const [err, setSucces] = useState({error: null});

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    };

    const saveData = () => {

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: data})
        })
            .then(res => res.json())
            .then((res) => {
                localStorage.setItem('accessToken', res.accessToken);
                setData({success: true});
                setInit({complete: true});
            })
            .catch(error => {
                    console.log('error', error);
                    setSucces({error: true})
                }
            )
    };


    return (
        <div className="home">
            <div className="login-form">
                <h2>Login Page</h2>
                <ul>

                    <p className={'p'}>{err.error && "wrong email or password"}</p>

                    <li><label>
                        <TextField label="Email" variant="outlined" onChange={handleOnChange} name="email" type="email"/>
                    </label></li>
                    <br/>
                    <li><label>
                        <TextField  label="Password" variant="outlined" onChange={handleOnChange} name="password" type="password"/>
                    </label></li>
                    <li>
                        <br/>
                        <Button variant="contained" color="primary" onClick={saveData} id={'btn'}>
                            Login
                        </Button>
                        {data.success  && <Redirect to={{pathname: '/profile'}}/>}
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default Login;