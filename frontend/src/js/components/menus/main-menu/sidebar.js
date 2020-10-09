import React from "react";
import {Button, IconButton, SwipeableDrawer} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MainMenu from "./main-menu";
import Login from "../../modals/login";
import {makeStyles} from "@material-ui/core/styles";
import AboutMe from "../../../pages/about-me";
import {useCookies} from "react-cookie";
import {BlogLink} from "../header-links";

const useStyles = makeStyles(() => ({
    buttonRoot: {
    },
    mainHeader: {
        minHeight: '4rem',
        width: '100vw'
    },
    menuButton: {
        display: 'inline-grid',
        '&> span': {
            width: 20,
            height: 3,
            margin: 2.5,
            background: '#232323',
            borderRadius: 5,
            // transition: '1s ease all',
        },
    },
    menuButtonIcon: {
        position: 'fixed',
        right: 20,
        top: 5,
    },
    bottomButtons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
    },
}));

export default function Sidebar(){
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['authentication']);  // user cookie
    const menuOpen = useSelector((state) => state.mainMenu.isOpen);
    const authenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const classes = useStyles();

    const toggleDrawer = (state = null) => {
        // If no state is sent then defaults to !menuOpen
        dispatch({type: "SET_MENU_OPEN", payload: (state!==null)?state:!menuOpen})
    };

    const logout = () => {
        dispatch({type: "LOGOUT"});
        removeCookie('authentication');
        dispatch({type: "SET_MENU_OPEN", payload: false});
    }

    return (
        <div className={classes.sidebarRoot}>
            <Login />
            <div className={classes.mainHeader}>
                <BlogLink />
                <IconButton onClick={() => toggleDrawer()} className={classes.menuButtonIcon}>
                    <div className={classes.menuButton}>
                        <span />
                        <span />
                        <span />
                    </div>
                </IconButton>
            </div>
              <SwipeableDrawer
                anchor={'right'}
                open={menuOpen}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
              >
                  <MainMenu />
                  <AboutMe />
                  <div className={classes.bottomButtons}>
                    <Button
                        variant={"text"}
                        onClick={() => {
                            !authenticated?dispatch({type: "SET_LOGGING_IN", payload: true}):logout()
                        }}
                    >{!authenticated?'Login':'Logout'}</Button>
                  </div>
              </SwipeableDrawer>
        </div>
    )
}