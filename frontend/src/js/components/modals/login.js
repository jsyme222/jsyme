import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CustomModal from "./custom-modal";
import {Button, TextField} from "@material-ui/core";
import {API} from "../../utils/data-handlers";
import {useCookies} from 'react-cookie';

export default function Login(){
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['authentication']);  // user cookie
    const loggingIn = useSelector((state) => state.user.isLoggingIn);  // login modal status
    const [error, setError] = useState(null);  // error message
    const [username, setUsername] = useState("");  // login username
    const [password, setPassword] = useState("");  // login password
    const dispatch = useDispatch();

    const login = () => {
      let options = {
          method: 'POST',
          body: {
              username: username,
              password: password
          }
      };

      API('login', [], options)
          .then(d => {
              if(d.authentication && d.user){
                // Registered user is logged in
                dispatch({type: "SET_USER_AUTHENTICATION", payload: d});  // Set authentication
                dispatch({type: "SET_LOGGING_IN", payload: false});  // Close login modal
                setCookie('authentication', `Token ${d.token}`, {path: '/', maxAge: 60*60*12})
              }else{
                  setError('ERROR')  // Error boundary...limited to avoid too much "distraction"...
              }
          })
    };

    return (
        <CustomModal
            open={loggingIn}
            onCloseAction={() => dispatch({type: "SET_LOGGING_IN", payload: false})}
        >
                {console.log(cookies)}
            <div style={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                padding: 20
            }}>
                <p>Login</p>
                <TextField
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error &&
                    <p style={{color: 'red'}}>{error}</p>
                }
                <Button
                    variant={"text"}
                    style={{margin: 10}}
                    onClick={login}
                >Submit</Button>
            </div>
        </CustomModal>
    )
}