import React, {useEffect, useState} from "react";
import axios from "axios";
import './UserPosts.css';
import SingleItem from "../singleItem/SingleItem";


const UserPosts = () => {
    const [post, setPost] = useState([]);
    const token           = localStorage.getItem("accessToken");
    useEffect(() => {
        axios.post('http://localhost:3001/allposts',
            {token},
            {
                headers: {'Authorization': `Bearer ${token}`},
            })
            .then(res => {
                setPost(res.data)
            });
    }, [token]);

    const DeletePost = (postId) => {
        fetch(`http://localhost:3001/delete${postId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                const result = post.filter(post => post["_id"] !== res.id);
                setPost(result);
            })
    };


    return (
        <div className={'showPosts'}>
            {
                post.map((items) =>
                    <SingleItem key={items["_id"]} items={items}
                                DeletePost={DeletePost} />
                )
            }

        </div>
    )
};


export default UserPosts;