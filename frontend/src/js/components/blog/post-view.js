import React, {useEffect, useState} from "react";
import {Chip, Container} from "@material-ui/core";
import fullURL from "../../utils/full-url";
import {useParams} from 'react-router-dom';
import {API} from "../../utils/data-handlers";
import Sanitizer from "./components/sanitizer";
import {makeStyles} from "@material-ui/core/styles";

export default function PostView(){
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { slug } = useParams();

    const useStyles = makeStyles((theme) => ({
        postRoot: {
            textAlign: 'left',
            margin: '1.5rem auto',
            backgroundColor: !loaded?'#232323':'initial',
            transition: '1s ease all',
        },
        postData: {
            '&> h3': {
            }
        },
        headerContainer: {
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
        },
        tag: {
            padding: 2.5,
            margin: 5
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            console.log(slug)
            API('getPosts', [`slug=${slug}`])
                .then((d) => setPost(d))
        }
    }, [slug, ]);

    useEffect(() => {
        if(post && post.title){
            document.title = post.title || "";
            document.description = post.description || "";
        }
    }, [post, ]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 250);
    }, [])

    return (
        <Container maxWidth={'md'} className={classes.postRoot}>
            <div className={classes.headerContainer}>
                <img src={fullURL(post.image)} alt={post.title} style={{width: '75vw', height: 'auto'}}/>
                <h1
                    aria-label={'post title'}
                    style={{
                        textDecoration: 'underline',
                        marginBottom: 0,
                    }}
                >{post.title}</h1>
                <div className={classes.postData}>
                    <p><i>{post.created_on}</i></p>
                    {/*<h3><span style={{fontWeight: 100}}>AUTHOR:</span>{post.author || 'Anonymous'}</h3>*/}
                </div>
                <div>
                {post.tags && post.tags.map((t, i) => (
                    <Chip
                        className={classes.tag}
                        key={i}
                        label={t.title}
                        clickable
                        color={'primary'}
                        onClick={() => window.location = `/category/${t.title.toLowerCase()}`}
                    />
                ))}
                </div>
            </div>
            <Sanitizer>
                {post.content}
            </Sanitizer>
        </Container>
    )
}