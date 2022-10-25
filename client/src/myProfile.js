import React from "react";
import { useEffect, useState } from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip,Button, TextField, Alert, Link  } from "@mui/material";
import { palette } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';




export default function MyProfile({userData, profileUpdate}) {
    const [edit, setEdit] = useState(false);
    const [aboutMe, setAboutMe] = useState(userData.about_me);
    const [wishOne, setWishOne] = useState(userData.wish_one);
    const [wishTwo, setWishTwo] = useState(userData.wish_two);
    const [wishThree, setWishThree] = useState(userData.wish_three);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    const handleCancel = () => {
        setEdit(false);
        setAboutMe(userData.about_me);
        setWishOne(userData.wish_one);
        setWishTwo(userData.wish_two);
        setWishThree(userData.wish_three);
        setAlert(false);
        setError(false);
    }

    const handleSave = async()=> {
        setAlert(false);
        setError(null);
        
        console.log("about me", aboutMe)

        console.log("wishOne", wishOne)
        if (!aboutMe && !wishOne && !wishTwo && !wishThree) {
            setAlert("warning");
            setError("Please, fill up the fields before saving");
            return
        } else {
                const body = {
                    aboutMe: aboutMe || null,
                    wishOne: wishOne || null,
                    wishTwo: wishTwo || null,
                    wishThree: wishThree || null
                };
                console.log("body my profile", body);
                const callUpdate = await profileUpdate(body);
                if (callUpdate === "invalid link") {
                    setAlert("warning");
                    setError("Ops! Invalid Link, please check your data.")
                    return
                } else if (callUpdate === "success") {
                    setEdit(false);
                    setAlert(false);
                    setError(false);
                    return
                } else {
                    setAlert("error");
                    setError("Ops! Something went wrong, please try again!") 
                    return
                }
                

    }}

    useEffect(()=> {
        setAboutMe(userData.about_me);
        setWishOne(userData.wish_one);
        setWishTwo(userData.wish_two);
        setWishThree(userData.wish_three);
    },[userData.about_me, userData.wish_one, userData.wish_two, userData.wish_three])

  return ( 
  <Card sx={{ m: 2 }}>
      <CardHeader
        avatar={<Avatar alt={userData.name} src={userData.profile_picture_url} sx={{ bgcolor: 'primary.main', height:75, width: 75}}></Avatar>}
        title={<Typography variant="h4" sx={{color: 'primary.main'}} >{userData.name}</Typography>}
        action={edit? <Tooltip title="Cancel">
        <IconButton onClick={handleCancel}>
          <CloseIcon sx={{ color: "#c22c2d" }} />
        </IconButton>
      </Tooltip> : <Tooltip title="Edit">
        <IconButton onClick={()=>setEdit(true)}>
          <EditIcon sx={{ color: "#c22c2d" }} />
        </IconButton>
      </Tooltip>}
      />
    <CardContent>
        { edit? <> <TextField fullWidth label="About Me" id="aboutMe" type="text" margin="normal" defaultValue={userData.about_me} size="large" onChange={(e)=> { console.log("event about ,me ", aboutMe); setAboutMe(e.target.value)}} />
            <TextField fullWidth label="Wish #1" id="wishOne" type="url" margin="dense" defaultValue={userData.wish_one}  size="small" onChange={(e)=>setWishOne(e.target.value)}/>
            <TextField fullWidth label="Wish #2" id="wishTwo"type="url" margin="dense" defaultValue={userData.wish_two}  size="small" onChange={(e)=> setWishTwo(e.target.value)}/>
            <TextField fullWidth label="Wish #3" id="wishThree"type="url" margin="dense" defaultValue={userData.wish_three}   size="small" onChange={(e)=> setWishThree(e.target.value)}/>
        </> : <>      
        {userData.about_me? 
            <Typography variant="body2" color="text.secondary">{userData.about_me}</Typography> :       
            <Typography variant="body2" color="text.secondary">Tell us a little about yourself</Typography> 
        } {userData.wish_one || userData.wish_two || userData.wish_three ? <>
            {/* ADDITIONAL FEATURE - scrape websites and display previews with Cheerio */}
            <Link variant="body2" color="text.primary" sx={{m:1}}>{userData.wish_one} </Link> 
            <Link variant="body2" color="text.primary" sx={{m:1}}>{userData.wish_two} </Link>
            <Link variant="body2" color="text.primary" sx={{m:1}}>{userData.wish_three} </Link></>:       
            <Typography variant="body2" color="text.primary" sx={{m:1}}>Here you can add up to 3 links from gifts you would like to receive.</Typography> 
        } </>}
        
   
    </CardContent>
        {edit && 
            <CardActions>
                <Button variant="text" size="large" fontSize="large"  sx={{fontWeight: 700, color: 'secondary.main' }} onClick={handleSave}>Save</Button>
                {alert && <Alert severity={alert}>{error}</Alert>}
            </CardActions>}
  </Card>
  );

}
