import React from "react";
import {Container} from "@material-ui/core";
import { Editor } from '@tinymce/tinymce-react';
import {useDispatch, useSelector} from "react-redux";

export default function TextEditor(){
    const value = useSelector((state) => state.admin.blog.editingPostValue);
    const dispatch = useDispatch();

    const editorChange = (e) => {
        dispatch({type: "SET_POST_VALUE", payload: e.target.getContent()})
    };

    return (
        <Container maxWidth={'md'}>
                <Editor
                    initialValue={value}
                    value={value}
                    init={{
                      height: 600,
                      plugins: 'print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                      // imagetools_cors_hosts: ['picsum.photos'],
                      menubar: 'file edit view insert format tools table help',
                      toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                      toolbar_sticky: true,
                      // autosave_ask_before_unload: true,
                      // autosave_interval: '30s',
                      // autosave_prefix: '{path}{query}-{id}-',
                      // autosave_restore_when_empty: false,
                      // autosave_retention: '2m',
                      image_advtab: true,
                      // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onChange={editorChange}
                    apiKey={'ad842b72oka3r5dq95jc88p4mno2x3f7rug2ghh3qtnlc7qu'}
            />
        </Container>
    )
}