import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { CookiesProvider, useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Home from "./js/pages/home";
import MainMenu from "./js/components/menus/main-menu/sidebar";
import CreatePost from "./js/pages/create-post";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Blog from "./js/pages/blog";
import PostView from "./js/components/blog/post-view";

export default function App() {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['authentication']);  // user cookie
  const dispatch = useDispatch();

    const theme = createMuiTheme({
      typography: {
        fontFamily: 'Courier Prime, Serif',
      },
    });

  useEffect(() => { // set user if cookie is set (persist data)
      if(cookies.authentication){
          dispatch({type: "SET_USER_AUTHENTICATION", payload: cookies.authentication});  // Set authentication
      }
  }, [cookies, dispatch]);

  return (
    <CookiesProvider>
     <ThemeProvider theme={theme}>
        <div className="App">
          <MainMenu />
          <Router>
            <Switch>
              <Route exact path={"/"} render={() => (
                  <Home />
              )} />
              <Route exact path={"/blog"} render={() => (
                  <Blog />
              )} />
              <Route path={"/category/:category"} render={(c) => (
                  <Blog category={c.match.params.category} />
              )} />
              <Route path={"/blog/:slug"} render={() => (
                  <PostView />
              )} />
            </Switch>

              {/*ADMIN VIEWS*/}
            <Switch>
                <Route path={"/create-post"} render={() => (
                    // redirect to home if no user cookie
                    !cookies.authentication?<Redirect to={'/'} />:<CreatePost />
                )} />
            </Switch>
          </Router>
        </div>
     </ThemeProvider>
    </CookiesProvider>
  );
}
