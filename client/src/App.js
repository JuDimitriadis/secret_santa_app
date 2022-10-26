import React, { useState, useEffect } from "react";
import MyProfile from "./myProfile";
import SecretGroup from "./secretGroups";
import "./style.css";

import {CssBaseline, Tooltip, IconButton, Box, Grid, Typography, Toolbar, AppBar} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const [userData, setUserData] = useState({})

  const getUser = async () => {
    const fetchReq = await fetch("/api/get-user-data")
    const response = await fetchReq.json();
    setUserData(response)
  }

  const profileUpdate = async (newData) => {
    console.log("calling profile update", newData) ;
    const bodyJson = JSON.stringify(newData);
    const fetchReq = await fetch("/api/profile-update", {
                          method: "POST",
                          body: bodyJson,
                          headers: {
                           "Content-Type": "application/json",
                    },
                });
    const response = await fetchReq.json();
    if (response.error === "invalid link") {
      return "invalid link" 
    } else if ( response.success === true ) {
      getUser()
      return "success"
    } else {
      return "error"
    }          
  }

  useEffect(() => {
    getUser()
  },[]);


  const handleLogOut = async () => {
    console.log("log out clicked");
    const fetchReq = await fetch("/api/logout", {
      method: "DELETE",
  });
    const response = await fetchReq.json();
    if (response.success === true) {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
  }
    return
  }

  return (
    <> <CssBaseline />
      <Typography variant="h2" align='left' sx={{ color: 'primary.main', letterSpacing: 4, m: 2, fontWeight:700}}>BR Secret Santa</Typography>
    <Box maxWidth="lg" sx={{ flexGrow: 1, mx:'auto', textAlign: 'center'}} >
      <Grid container spacing={5} alignItems="stretch" justifyContent='center'>
        <Grid item xs={10} md={4}>
          <MyProfile userData={userData} profileUpdate={profileUpdate}></MyProfile>
        </Grid>
        <Grid item xs={10} md={7} sx={{ minHeight: {md: "50vh", lg:'35vh', xl: '30vh'}}}>
          <SecretGroup userData={userData} profileUpdate={profileUpdate}></SecretGroup>
        </Grid>
      </Grid>
    </Box>


    <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Tooltip title="Log Out">
            <IconButton onClick={()=>handleLogOut()}>
              <LogoutIcon  sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
      </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
