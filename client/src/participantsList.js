import React from "react";
import {Card, CardHeader, CardContent, Avatar, Typography, Link, Grid} from '@mui/material';



export default function ParticipantsList({groupParticipants}){
    
    return(<>
        <Typography variant="h2">Participants</Typography>
        <Grid container alignItems="stretch" justifyContent='center'>
            {groupParticipants && groupParticipants.map((participants) => {
                return (
                    <Grid item xs={12} sm={5} md={3} key={participants.participant_id} sx={{m:1, p:1, width:"100%"}}>
                        <Card sx={{ overflow: "scroll", height: {sm: "30vh", md: "50vh", m: 1, overflow:"scroll"}}}>
                            <CardHeader
                                avatar={<Avatar alt={participants.name} src={participants.profile_picture_url} sx={{ bgcolor: 'primary.main', height:75, width: 75}}></Avatar>}
                                title={<Typography variant="h4" sx={{color: 'primary.main'}} >{participants.name}</Typography>}
                            />
                            <CardContent>
                                {participants.about_me &&
                                <Typography variant="body1" color="text.secondary">{participants.about_me}</Typography>} 
                                {participants.address &&
                                <Typography variant="body1" color="text.primary">{participants.address}</Typography>} 
                                {participants.wish_one_description || participants.wish_one ?
                                    <Link variant="body1" color="text.secondary" href={participants.wish_one} target="_blank">
                                        <Typography variant="body1" color="text.primary">{participants.wish_one_description || participants.wish_one}</Typography> 
                                    </Link>: <></>}
                                {participants.wish_two || participants.wish_two_description ?
                                    <Link variant="body1" color="text.secondary" target="_blank" href={participants.wish_two}> 
                                        <Typography variant="body1" color="text.primary">{participants.wish_two_description || participants.wish_two}</Typography> 
                                    </Link> : <></>}
                                {participants.wish_three || participants.wish_three_description ? 
                                    <Link variant="body1" color="text.secondary" target="_blank" href={participants.wish_three}> 
                                        <Typography variant="body1" color="text.primary">{participants.wish_three_description || participants.wish_three}</Typography> 
                                    </Link> : <></>}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid></>);
}






