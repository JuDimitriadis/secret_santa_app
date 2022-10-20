import "./style.css"
import { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {CssBaseline, Stack, Divider, Tooltip, IconButton, Modal, Fade, Box, Typography, Backdrop, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Registration from "./registration";
import Login from "./login";
// import ResetPassword from "./resetPassword";

export default function Start() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    return (
        <>
            <BrowserRouter>
            <CssBaseline />
            <img src="/secret_santa.jpg" alt='Santa Claus' id="welcomeImg"/>
            <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <div>
          <Tooltip title="Login">
            <IconButton onClick={()=>setOpenLogin(true)}>
              <LoginIcon sx={{ color: "#c22c2d" }} />
            </IconButton>
          </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openLogin}
        onClose={()=>setOpenLogin(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openLogin}>
          <Box sx={modalStyle}>
            <Login/>
          </Box>
        </Fade>
      </Modal>
    </div>
    <div>
    <Tooltip title="Cadastre-se">
            <IconButton onClick={()=>setOpenRegister(true)}>
            <AppRegistrationIcon sx={{ color: "#c22c2d" }} />
            </IconButton>
          </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openRegister}
        onClose={()=> setOpenRegister(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRegister}>
          <Box sx={modalStyle}>
            <Registration/>
          </Box>
        </Fade>
      </Modal>
    </div>
      </Stack>
    </div>
            </BrowserRouter>
        </>
    );
}