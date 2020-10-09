import React from "react";
import {ArrowBack} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import { useHistory } from 'react-router-dom';

export function BlogLink() {
    let history = useHistory();

    return (
            <Button variant={"outlined"} onClick={() => history.push('/blog')}>
                <ArrowBack />
                the blog
            </Button>
    )
}