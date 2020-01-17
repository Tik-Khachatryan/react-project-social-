import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from "axios";
import {Context} from '../../Context';



const Posts = ({post, setPost, token}) => {
    const {setUser} = useContext(Context);

    const handleOnChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    };


    const addPost = () => {
        axios.post('http://localhost:3001/posts',
            {post},
            {
                headers: {'Authorization': `Bearer ${token}`},
            })
            .then(res => {
                setUser(res.data)
            });
    };

    return (
        <div className={'allPosts'}>
            <div className={'textBtn'}>
                <TextareaAutosize aria-label="minimum height" rows={3} placeholder="Write your post . . ." name="title"
                                  onChange={handleOnChange} id={'textarea'}/>
                <Button variant="contained" color="primary" onClick={addPost}>
                    Post
                </Button>

            </div>
        </div>
    )
};

export default Posts;