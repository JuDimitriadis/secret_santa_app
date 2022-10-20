import React from "react";
import "./style.css";

import {CssBaseline, Tooltip, IconButton, Box, Grid, Typography} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {

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
              <Tooltip title="Log Out">
            <IconButton onClick={()=>handleLogOut()}>
              <LogoutIcon sx={{ color: "#c22c2d" }} />
            </IconButton>
          </Tooltip>
   
    <Box sx={{ flexGrow: 1, mx:'auto', textAlign: 'center', alignContent: "center" }} >
      <Grid container spacing={1}>
        <Grid item xs={10} md={6}>
          <Typography variant="h1" sx={{ color: 'primary.main', letterSpacing: 4 }}>Amigo Secreto Mutterschaft</Typography>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box sx={{ bgcolor: 'secondary.main', height: '40vh', borderRadius: 2, boxShadow: 3 ,  m: 1, p:2   }}>name and picture</Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box sx={{ bgcolor: 'primary.main', height: '40vh', borderRadius: 2, boxShadow: 3 ,  m: 1, p:2  }}>event description</Box>
        </Grid>
        <Grid item xs={10} md={6}>
          <Box sx={{ bgcolor: 'secondary.main', height: '40vh', borderRadius: 2, boxShadow: 3,  m: 1, p:2   }}>secret friend + wish list</Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default App;
