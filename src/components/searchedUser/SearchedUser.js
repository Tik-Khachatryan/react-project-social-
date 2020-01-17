import React, {Fragment, useContext, useEffect, useState} from 'react'
import Button from "@material-ui/core/Button";
import {Context} from "../../Context";

const SearchedUser = ({data, id}) => {
    const token                 = localStorage.getItem("accessToken");
    const [reqData, setReqData] = useState({});
    const { setStatus }   = useContext(Context);

    useEffect(() => {
        setStatus(reqData)
    }, [reqData]);



    const addFriend = () => {

        fetch(`http://localhost:3001/friend/${id}`, {
            method:  'POST',
            headers: {
                'Accept':        'application/json',
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:    JSON.stringify({_id: id, token: token})
        })
            .then(res => res.json())
            .then(res => {
                setReqData(res)
            })
            .catch(err => console.log(err));
    };


    return (
        <div className={'main_data'}>
            <img src={`/img/${data.img}`} alt="" width={'70px'} height={'70px'} className={'avatar'}/>
            <div className={'data'}>{data.name}</div>
            <div className={'data'}>{data.sureName}</div>
            <div className={'data'}>{data.email}</div>
            <div className={'data'}>{data.age}</div>
            <div className={'data'}>{data.gender}</div>
            <Button variant="contained" color="primary">
                Send message
            </Button>
            {!reqData.status && <Fragment> <Button variant="contained" color="primary" onClick={addFriend}>
                Add to friends
            </Button>
            </Fragment>
            }
            {reqData.status && <Fragment><Button variant="contained" color="default" onClick={addFriend}>
                {reqData.status}
            </Button></Fragment>}

        </div>
    )
};

export default SearchedUser