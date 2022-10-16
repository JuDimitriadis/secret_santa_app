import { BrowserRouter, Route, Link } from "react-router-dom";
import {CssBaseline, Box, Container} from '@mui/material';
// import Registration from "./registration";
// import Login from "./login";
// import ResetPassword from "./resetPassword";

export default function Start() {
    return (
        <>
            <BrowserRouter>
            <CssBaseline />
            <img src="/secret_santa.jpg" alt='Santa Claus' z-index='-1' position= 'fixed' top= '0' bottom= '0' right= '0' left= '0' width= '100%' height= '100%' object-fit= 'cover'/>
            </BrowserRouter>
            <footer>
                <p>&copy; BR Secret Santa</p>
            </footer>
        </>
    );
}