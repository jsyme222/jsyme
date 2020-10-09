import React, {useEffect, useState} from "react";
import {Paper, Grid, Chip} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import fullURL from "../../utils/full-url";

const useStyles = makeStyles((theme) => ({
    postRoot: {
        margin: 7.5,
    },
    containerRoot: {

    },
    imgContainer: {
        height: 150,
        width: 200,
        borderRadius: 20,
        margin: 7.5,
        overflow: 'hidden'
    },
    postImage: {
        maxHeight: 150,
        transition: '0.5s ease all',
        '&:hover': {
            maxHeight: 160,
            cursor: 'pointer',
        }
    },
    postData: {
        display: 'flex',
        bottom: 0,
        '&> h5': {
            margin: '5px 7.5px',
            '&:hover': {
                cursor: 'initial',
            }
        }
    },
    gridItem: {
        textAlign: 'left',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    link: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    imageGrid: {
        '@media(max-width: 767px)': {
            display: 'none',
        }
    }
}));

export default function PostCard(props){
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if(props.post){
            setPost(props.post)
        }
    }, [setPost, props.post]);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        })
    }, []);

    return (
        <Paper
            className={classes.postRoot}
            style={{
                backgroundColor: !loaded?'#232323':'initial',
                transition: '1s ease all'
            }}
        >
            <Grid container className={classes.containerRoot}>
                <Grid item className={`${classes.gridItem} ${classes.imageGrid}`}>
                    <a href={`/blog/${post.slug}`}>
                        <div className={classes.imgContainer} >
                            <img src={fullURL(post.image)} alt={post.title} className={classes.postImage}/>
                        </div>
                    </a>
                </Grid>
                <Grid item className={classes.gridItem} style={{position: 'relative'}}>
                    <div>
                        <div
                            onClick={() => window.location = `/blog/${post.slug}`}
                            className={classes.link}
                        >
                            <h2
                                style={{textDecoration: 'underline'}}
                                aria-label={`post titled`}
                            >
                                {post.title}
                            </h2>
                            <h3 aria-label={'post description'}>{post.description}</h3>
                        </div>
                        <div style={{marginBottom: 10}}>
                            {post.tags && post.tags.map((t, i) => (
                                <Chip
                                    className={classes.tag}
                                    key={i}
                                    label={t.title}
                                    clickable
                                    color={'primary'}
                                    onClick={() => window.location = `/category/${t.title.toLowerCase()}`}
                                    aria-label={`${t.title} posts`}
                                />
                            ))}
                        </div>
                        <div className={classes.postData}>
                            {/*<h5><span style={{fontWeight: 100}}>AUTHOR:</span>{post.author || 'Anonymous'}</h5>*/}
                            <h5><i>{post.created_on}</i></h5>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}