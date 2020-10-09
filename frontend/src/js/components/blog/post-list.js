import React, {useEffect, useState} from "react";
import PostCard from "./post-card";

export default function PostList(props){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(props.posts){
            setPosts(props.posts)
        }
    }, [props.posts, ]);

    return (
        (posts.length > 0) && posts.map((p, i) => (
            <PostCard post={p} key={i}/>
        ))
    )
}