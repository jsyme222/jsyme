import React from "react";
import {Modal, Paper} from "@material-ui/core";

export default function CustomModal(props){
    // CustomModal creates a centered modal
    return (
        <Modal open={props.open} onClose={props.onCloseAction}>
            <Paper style={{
                position: 'absolute',
                top: 'calc(50vh - 200px)',
                left: 'calc(50vw - 200px)',
                width: 400,
            }}>
                {props.children}
            </Paper>
        </Modal>
    )
}