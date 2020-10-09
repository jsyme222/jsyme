import React from "react";
import {IconButton} from "@material-ui/core";
import github from '../../../imgs/github.png';
import codepen from '../../../imgs/codepen.png';

function SocialBlock(props){
    return (
            <IconButton
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: 250,
                    maxHeight: 100,
                    margin: '0 auto',
                }}
            >
                <a  href={props.url}>
                    <img src={props.icon} alt={props.title} style={{maxHeight: 50}} />
                </a>
            </IconButton>
    )
}

function Github(){
    return (
        <SocialBlock icon={github} title={"Github"} url={'https://github.com/jsyme222/'}/>
    )
}

function CodePen(){
    return (
        <SocialBlock icon={codepen} title={"Codepen"} url={'https://codepen.io/jsyme222/'}/>
    )
}
export default function SocialLinks() {
    return (
        <>
            <Github />
            <CodePen />
        </>
    )
}