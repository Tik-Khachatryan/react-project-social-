import React from 'react';
import {useState} from 'react';
import Validator from '../validator/Validator'
import Input from '../input/Input'
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from "axios";


function Register() {

    const [data, setState] = useState({
        email:    '',
        name:     '',
        sureName: '',
        password: '',
        age:      '',
        gender:   '',
    });

    const [error, setErr]     = useState({error: false});
    const [err, setSucces]    = useState({error: null});
    const [toLog, setSuccess] = useState({success: false});
    const [file, setFile]     = useState({
        selectedFile: null
    });

    const selectHandleOnChange = (event) => {
        setFile({
            selectedFile: event.target.files[0]
        });
    };


    const rule = {
        name:     'required|letters|max:8',
        sureName: 'required|letters',
        email:    'required|email',
        password: 'required|min:6',
        age:      'required|number',
        gender:   'required',
        img:      'required'
    };

    const [result, isEmpty] = Validator(data, rule);
    const validator         = () => {

        if (isEmpty) return true;
        console.log('result', result)
    };

    const sendData = () => {

        const fd = new FormData();
        fd.set("name", data.name);
        fd.set("sureName", data.sureName);
        fd.set("email", data.email);
        fd.set("password", data.password);
        fd.set("age", data.age);
        fd.set("gender", data.gender);
        fd.append('img', file.selectedFile);

        axios.post('http://localhost:3001/register',
            fd,
            {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then((res) => {
                if (res) {
                    setSuccess({success: true})
                }
                console.log(res);
            })
            .catch(res => {
                setSucces({error: true});
                console.log(res)
            });

    };
    const click    = () => {
        if (!validator()) {
            setSucces({error: true});
            setErr({error: true});
            return false
        } else {
            setSuccess({success: true});
            sendData()
        }
    };


    return (
        <div className="home">
            <div className="form">
                <h2>Register Page</h2>

                <p className={'p'}>{err.error && "Inputs must be required"}</p>
                <Input data={data} setState={setState} result={result} error={error}/>
                <div className={'regBtn'}>
                    <input type="file" id={'chooseFile'} name="img" accept="image/jpeg"
                           onChange={selectHandleOnChange}/>
                    <Button variant="contained" color="primary" onClick={click} id={'btn'}>
                        Register
                    </Button>
                </div>
                {toLog.success && <Redirect to='/login'/>}
            </div>


        </div>
    );
}

export default Register;