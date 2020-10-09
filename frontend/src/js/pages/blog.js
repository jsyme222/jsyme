import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import {API} from "../utils/data-handlers";
import PostList from "../components/blog/post-list";

export default function Blog(props){
    const [blog_posts, setBlogPosts] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            if(!props.category){
            API('getPosts')
                .then(d => setBlogPosts(d))
            }else{
                API('getPosts', [`category=${props.category}`])
                    .then(d => setBlogPosts(d))
            }
        }
        return () => isSubscribed = false
    }, [props.category, ]);

    useEffect(() => {
        let title;
        if(!props.category){
            title = "the blog"
        }else{
            title = props.category
        }
        document.title = title
    }, [props.category, ])

    return (
        <Container maxWidth={"md"}>
            <h1 style={{marginRight: 50}}>{!props.category?'the blog':`"${props.category}" posts`}</h1>
            <PostList posts={blog_posts} />
        </Container>
    )
}