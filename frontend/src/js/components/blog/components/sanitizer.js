import React from "react";

export default function Sanitizer(props){
    return (
        <div className={'html-content'} dangerouslySetInnerHTML={{__html: props.children}} />
    )
}