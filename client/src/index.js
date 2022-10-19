import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Start from './start';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
      }
      // text: {
      //     customOne: '#F40058',
      //     customTwo: '#161B40',
      //     customThree: '#EFA500',
      //     customFour: '#41B853',
      //     customFive: '#43BEEE',
      //     customWhite: '#FFFFF5',
      // },
  },
  // typography: {
  //     h2: {
  //         fontFamily: "'Poppins', sans-serif",
  //         fontWeight: 700,
  //     },
  //     h3: {
  //         fontFamily: "'Poppins', sans-serif",
  //     },
  //     button: {
  //         textTransform: 'none',
  //         fontFamily: "'Poppins', sans-serif",
  //         fontWeight: '300',
  //     },
  // },
});


fetch("/api/user")
    .then((res) => res.json())
    .then((result) => {
        if (result.success === false) {
          root.render(
            <React.StrictMode>
              <ThemeProvider theme={theme}>
                <Start />
              </ThemeProvider>
            </React.StrictMode>
          );
        } else {
          root.render(
            <React.StrictMode>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </React.StrictMode>
          );
    }}) ;



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
