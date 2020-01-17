import React from 'react'
import TextField from "@material-ui/core/TextField";


const Input = ({data, setState, result, error}) => {
    const handleOnChange = ({type, value}) => {
        setState(preVstate => ({
            ...preVstate, [type]: value
        }))

    };


    return (
        <div className={"inputs"}>
            <div>
                <TextField  label="Email" variant="outlined"
                           onChange={({target: {value}}) => handleOnChange({type: "email", value})}
                           value={data.email}
                           name='email'
                           type='email'
                           required/>
                <p className={'p'}>{error && result.email.required ? '' : result.email.email}</p>
            </div>
            <div>
                <TextField  label="Name" variant="outlined"
                           onChange={({target: {value}}) => handleOnChange({type: "name", value})}
                           value={data.name}
                           name='name'
                           type='name'
                           required/>
                <p className={'p'}>{error && result.name.required ? '' : result.name.letters || result.name.max}</p>
            </div>
            <div>
                <TextField  label="Sure name" variant="outlined" onChange={({target: {value}}) => handleOnChange({type: "sureName", value})}
                           value={data.sureName}
                           name='sureName'
                           type='sureName'
                           required/>
                <p className={'p'}>{error && result.sureName.required ? '' : result.sureName.letters}</p>
            </div>
            <div>
                <TextField  label="Password" variant="outlined" onChange={({target: {value}}) => handleOnChange({type: "password", value})}
                           value={data.password}
                           name='password'
                           type='password'
                           required/>
                <p className={'p'}>{error && result.password.required ? '' : result.password.min}</p>
            </div>
            <div>
                <TextField  label="Age" variant="outlined" onChange={({target: {value}}) => handleOnChange({type: "age", value})}
                           value={data.age}
                           name='age'
                           type='number'
                           required/>
                <p className={'p'}>{error && result.age.required ? '' : result.age.number || result.age.max}</p>
            </div>
            <ul>
                <li>
                    <select className={'select'} name={'gender'}
                            onChange={({target: {value}}) => handleOnChange({type: "gender", value})}>
                        <option value="">--Please choose gender--</option>
                        <option value="male" className={'option'}>Male</option>
                        <option value="female" className={'option'}>Female</option>
                    </select>
                </li>
            </ul>
        </div>

    )
}

export default Input