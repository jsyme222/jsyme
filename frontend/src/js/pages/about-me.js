import React from "react";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import SocialLinks from "../components/menus/social-links";

const useStyles = makeStyles((theme) => ({
    aboutRoot: {
        maxWidth: 300,
        padding: '0 1.25rem',
    }
}))

export default function AboutMe(){
    const classes = useStyles();

    return (
      <Paper className={classes.aboutRoot}>
          <p>Hello, my name is Justin Syme. I am a web developer, a father, a husband, and a musician.</p>
          <p>I enjoy writing in my spare time and thus this blog has appeared.</p>
          <p>You can see other shenanigans by following my links below.</p>
          <SocialLinks />
      </Paper>
    )
}