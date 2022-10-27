import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import Welcome from './welcome';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#c22c2d',
            contrastText: '#ffe2e2',
        },
        secondary: {
            main: '#54944a',
        },
        background: {
            paper: "#ffeed2",
            default: "#ffeed2"
        },
        text: {
            primary: '#c22c2d',
            secondary:'#54944a'
        },
    },
    typography: {
        fontFamily: [
            'Amatic SC',
            'cursive',
        ].join(','),

        h2: {
            fontWeight: 900,
        },

        h4: {
            fontWeight: 900,
        },

        body1: {
            fontWeight: 700,
        },
    }

});


fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
        if (result.success === false) {
            console.log("result.success === false");
            ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <Welcome />
                    </ThemeProvider>
                </React.StrictMode>, document.querySelector("main")
            );
        } else {
            console.log("result.success === true");
            ReactDOM.render(
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </React.StrictMode>, document.querySelector("main")
            );
        }}) ;




