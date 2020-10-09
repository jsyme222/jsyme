import React, {useEffect, useState} from "react";
import {Chip, Container, Grid, TextField, Paper, Button, Checkbox, FormControlLabel} from "@material-ui/core";
import TextEditor from "../components/text-editor/text-editor";
import {API} from "../utils/data-handlers";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import ImageUploader from 'react-images-upload';
// import {useDispatch} from "react-redux";

const useStyles = makeStyles(() => ({
    tags: {
        margin: '2rem'
    },
    tag: {
        padding: 2.5,
        margin: 5
    },
    buttonGroup: {
        margin: 10
    }
}));

export default function CreatePost(){
    const author = useSelector((state) => state.user.user);
    const content = useSelector((state) => state.admin.blog.editingPostContent);
    const authentication = useSelector((state) => state.user.authentication);
    const [availableTags, setAvailableTags] = useState([]);
    const [image, setImage] = useState([]);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publish, setPublish] = useState(false);
    const [error, setError] = useState(null);
    const classes = useStyles();
    // const dispatch = useDispatch();

    const toggleTag = (tag) => {
        if(tags.includes(tag)){
            setTags(tags.filter((t) => t !== tag))
        }else{
            setTags([...tags, tag])
        }
    };

    const savePost = () => {
        let post = {
            author: author,
            image: image,
            publish: publish,
            title: title,
            description: description,
            content: content,
            tags: tags,
        };
        let options = {
            method: "POST",
            body: post,
            headers: {
                'Authorization': authentication
            }
        };

        API('savePost', [], options)
            .then(d => {
                console.log(d)
                if(!d.error) {
                    window.location = '/'
                }else {
                    setError(d.error)
                }
            })

    }

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            API('tags')
                .then(d => setAvailableTags(d))
        }
        return () => isSubscribed = false
    }, []);

    return (
        <Container
            maxWidth={'lg'}
        >
            <div>
                <Container maxWidth={"md"}>
                    <div className={classes.tags}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose image'
                            onChange={(i) => setImage(image.concat(i))}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            singleImage={true}
                        />
                        <Grid container spacing={2}>
                            <Grid item xl={6} style={{display: 'flex',flexFlow: 'column'}}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={publish}
                                        onChange={() => setPublish(!publish)}
                                        name="publish"
                                        color="primary"
                                      />
                                    }
                                    label="Publish Now?"
                                  />
                                <TextField
                                    id="title"
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    variant="outlined"
                                    style={{
                                        marginTop: 10,
                                    }}
                                />
                                <TextField
                                  id="description"
                                  label="Description"
                                  multiline
                                  rows={4}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  variant="outlined"
                                  style={{
                                      marginTop: 10,
                                  }}
                                />
                            </Grid>
                            <Grid item xl={6}>
                              <Paper style={{height: '100%'}}>
                            {availableTags.map((tag, i) => (
                                <Chip
                                    className={classes.tag}
                                    key={i}
                                    label={tag.title}
                                    clickable onClick={() => toggleTag(tag)}
                                    color={tags.includes(tag)?'primary':'secondary'}
                                />
                            ))}
                        </Paper>
                            </Grid>

                        </Grid>
                    </div>
                </Container>
                <TextEditor />
                {error && <p style={{color: "red"}}>{error}</p>}
            </div>
            <div className={classes.buttonGroup}>
                <Button variant={'contained'} color={'primary'} onClick={savePost}>Save</Button>
            </div>
        </Container>
    )
}