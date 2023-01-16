import React, { useState, useEffect } from "react";
import MyProfile from "./myProfile";
import SecretGroup from "./secretGroups";
import ParticipantsList from "./participantsList";
import {CssBaseline, Tooltip, IconButton, Box, Grid, Typography, Toolbar, Card, Container, Collapse, CardHeader, Avatar,CardContent, Link } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


export default function App() {
    const [userData, setUserData] = useState({});
    const [userGroup, setUserGroup] = useState();
    const [groupParticipants, setGroupParticipants] = useState();
    const [mySecretSanta, setMySecretSanta] = useState();
    const [mySecretSantaData, setMySecretSantaData] = useState();
    const [expanded, setExpanded] =useState();


    const getUser = async () => {
        const fetchReq = await fetch("/api/get-user-data");
        const response = await fetchReq.json();
        setUserData(response);
        return;
    };

    const getSecretSanta = async () => {
        const fetchReq = await fetch("/api/get-my-secret-santa");
        const response = await fetchReq.json();

        if (response.secret_friend_id) {
            setMySecretSanta(response.secret_friend_id);
            return;
        } else {
            setMySecretSanta("NO SECRET SANTA");
            return;
        }
    };

    const getGroupUsers = async () => {
        const body = {group:userGroup};
        const bodyJson = JSON.stringify(body);

        const fetchReq = await fetch("/api/get-group-users", {
            method: "POST",
            body: bodyJson,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await fetchReq.json();
        
        let array = [];
        response.map((item) => {
            if (item.participant_id === mySecretSanta) {
                setMySecretSantaData(item);
                return;
            }
            if (item.participant_id != mySecretSanta && item.participant_id != userData.id) {
                array.push(item);
                return;
            }
        });
        setGroupParticipants(array);


        return;
    };



    const profileUpdate = async (newData) => {
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
            return "invalid link"; 
        } else if ( response.success === true ) {
            getUser();
            return "success";
        } else {
            return "error";
        }          
    };

    useEffect(() => {
        getUser();
    },[]);

    useEffect(()=>{
        getGroupUsers();
        getSecretSanta();

    },[userGroup, mySecretSanta]);


    const handleLogOut = async () => {
        const fetchReq = await fetch("/api/logout", {
            method: "DELETE",
        });
        const response = await fetchReq.json();
        if (response.success === true) {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
        return;
    };



    return (
        <> <CssBaseline />
            <Container sx={{display:"flex", justifyContent: "space-between"}}>
                <Typography variant="h2" align='left' sx={{ color: 'primary.main', letterSpacing: 4, m: 2, fontWeight:700}}>Mamães BR Secreto</Typography>
                <Toolbar>
                    <Tooltip title="Log Out">
                        <IconButton onClick={()=>handleLogOut()}>
                            <LogoutIcon  sx={{ color: "primary.main" }} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Container>
            <Box maxWidth="lg" sx={{ flexGrow: 1, mx:'auto', textAlign: 'center', m:2}} >
                <Grid container spacing={5} alignItems="stretch" justifyContent='center'>
                    <Grid item xs={12} md={5}>
                        <MyProfile userData={userData} profileUpdate={profileUpdate}></MyProfile>
                    </Grid>
                    <Grid item xs={12} md={7} sx={{ minHeight: {md: "50vh", lg:'35vh', xl: '30vh'}}}>
                        <SecretGroup userData={userData} setUserGroup={setUserGroup} profileUpdate={profileUpdate}></SecretGroup>
                    </Grid>
                    {mySecretSantaData && 
                    <Grid item xs={12}>
                        <Card>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <Typography variant="h2"> Minha Amiga Secreta</Typography>
                                <CardHeader
                                    avatar={<Avatar alt={mySecretSantaData.name} src={mySecretSantaData.profile_picture_url} sx={{ bgcolor: 'primary.main', height:75, width: 75}}></Avatar>}
                                    title={<Typography variant="h4" sx={{color: 'primary.main'}} >{mySecretSantaData.name}</Typography>}
                                />
                                <CardContent>
                                    {mySecretSantaData.about_me &&
                                <Typography variant="body1" color="text.secondary">{mySecretSantaData.about_me}</Typography>}
                                    {mySecretSantaData.address && 
                                <Typography variant="subtitle1" color="text.primary" sx={{fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}}>{mySecretSantaData.address}</Typography>} 
                                    {mySecretSantaData.wish_one || mySecretSanta.wish_one_description ?              
                                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={mySecretSantaData.wish_one} target="_blank"> 
                                            <Typography variant="body1" color="text.primary">{mySecretSantaData.wish_one_description || mySecretSantaData.wish_one}</Typography> 
                                        </Link> : <></>}
                                    {mySecretSantaData.wish_two || mySecretSantaData.wish_two_description ? 
                                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={mySecretSantaData.wish_two} target="_blank"> 
                                            <Typography variant="body1" color="text.primary">{mySecretSantaData.wish_two_description || mySecretSantaData.wish_two}</Typography> 
                                        </Link> : 
                                        <></>}
                                    {mySecretSantaData.wish_three || mySecretSantaData.wish_three_description ?
                                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={mySecretSantaData.wish_three} target="_blank"> 
                                            <Typography variant="body1" color="text.primary">{mySecretSantaData.wish_three_description || mySecretSantaData.wish_three}</Typography> 
                                        </Link> : <></>}
                                </CardContent>
                            </Collapse>
                                
                            {expanded ? 
                                <Typography variant="h5" onClick={()=> setExpanded(!expanded)}>Fechar</Typography> : 
                                <Typography variant="h4" onClick={()=> setExpanded(!expanded)}>Click aqui para ver sua Amiga Secreta</Typography>}
                        </Card>  
                    </Grid>}
                    {userGroup &&  
                    <Grid item xs={12} sm={12} md={12} width="100%">
                        <ParticipantsList groupParticipants={groupParticipants}></ParticipantsList>
                    </Grid>}
                   
                </Grid>
            </Box>


  
      
        </>
    );
}


