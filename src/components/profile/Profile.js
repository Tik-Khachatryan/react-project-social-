import React, {Fragment, useContext, useEffect, useState} from 'react';
import './profile.css';
import Posts from "../posts/Posts";
import SearchedUser from "../searchedUser/SearchedUser";
import {Context} from "../../Context";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const Profile = ({match}) => {
    let id                    = match.params.id;
    const token               = localStorage.getItem("accessToken");
    const [data, setData]     = useState({});
    const [post, setPost]     = useState({});
    const {status} = useContext(Context);

    console.log(status, 'STATUSSSSS');


    useEffect(() => {
        fetch(`http://localhost:3001/profile/${id}`, {
            method:  'POST',
            headers: {
                'Accept':        'application/json',
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:    JSON.stringify({user: token})
        })
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
            .catch(error => {
                    console.log('error', error);
                }
            );
    }, [token, id]);

    const createNotification = (type) => {

            switch (type) {
                case 'pending':
                    NotificationManager.info(`${status.fromName} want add to his friend list`);
                    break;
                default:
                    console.log('err')
            }

    };



    if(status.toUserId === id){
        createNotification(status.status)
    }

    return (
        <div className={'main'}>
            {!id && <Fragment>
                <div className={'main_data'}>
                    <img src={`/img/${data.img}`} alt="" width={'70px'} height={'70px'} className={'avatar'}/>
                    <div className={'data'}>{data.name}</div>
                    <div className={'data'}>{data.sureName}</div>
                    <div className={'data'}>{data.email}</div>
                    <div className={'data'}>{data.age}</div>
                    <div className={'data'}>{data.gender}</div>
                </div>

                <div className="addPost">
                    <Posts post={post} setPost={setPost} token={token}/>
                </div>
            </Fragment>
            }
            {id && <Fragment>
                <SearchedUser data={data} id={id}/>
            </Fragment>
            }


            <NotificationContainer/>
        </div>

    )
};

export default Profile;