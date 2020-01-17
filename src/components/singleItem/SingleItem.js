import React, {useState} from 'react'

const SingleItem = ({items: item, DeletePost}) => {
    const [init, setInit]   = useState({disable: true});
    const [title, setTitle] = useState(item.title);
    const editPost          = () => {
        setInit({disable: false});
    };

    const handleEditSave = (e) => {
        const postId = e.target.id;
        setInit({disable: true});
        fetch(`http://localhost:3001/edit/${postId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:   JSON.stringify({title:title})
        })
            .then(res => res.json())
    };

    const handleChange = (event) => {
        setTitle(event.target.value)
    };

    return (
        <div key={item["_id"]}>
                            <textarea className={'userPosts'} disabled={init.disable} onChange={handleChange}
                                      value={title}
                            >{}</textarea>
            {!init.disable ?
                <button id={item["_id"]} onClick={handleEditSave} className={'save'}>Save</button> :
                <button id={item["_id"]} className={'edit'} onClick={editPost}>Edit</button>}
            <button onClick={() => DeletePost(item._id)} className={"delete"}>Delete</button>
        </div>
    )
};

export default SingleItem;