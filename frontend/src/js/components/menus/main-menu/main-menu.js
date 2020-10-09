import React, {useEffect} from "react";
import {List, ListItem} from "@material-ui/core";
import {API} from "../../../utils/data-handlers";
import {useDispatch, useSelector} from "react-redux";
import {Album, Book, TableChart} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function MainMenu() {
    const menuItems = useSelector((state) => state.mainMenu.items);
    const authenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const icons = {
        'blog': <Book/>,
        'musician': <Album/>,
        'projects': <TableChart/>
    };

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            API('mainMenu', [`admin=${authenticated}`, ])
                .then(d => dispatch({type: "SET_MENU_ITEMS", payload: d}))
        }
        return () => isSubscribed = false
    }, [dispatch, authenticated]);

    return (
        <>
            <List
                style={{
                    minWidth: 200,
                    padding: '1 rem',
                }}
                component={"nav"}
            >
                <ListItem
                    button
                    component={'a'}
                    href={'/'}
                >
                    <h3 style={{fontFamily: "Courier Prime", margin: '10px auto'}}>j-sy.me</h3>
                </ListItem>
                {menuItems.map((item, i) => (
                    <ListItem
                        button
                        component={'a'}
                        key={i}
                        href={`/${item.url}`}
                    >
                        <ListItemIcon>{icons[item.url]}</ListItemIcon>
                        {item.title}
                    </ListItem>
                ))}
            </List>
        </>
    )
}