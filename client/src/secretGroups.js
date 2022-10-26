import React from "react";
import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function SecretGroup({userData}) {
    const [groupData, setGroupData] = useState();
    

    const getSecretData = async () => {
        const fetchReq = await fetch("/api/get-secret-group")
        let response = await fetchReq.json();
        response.event_date = new Date(response.event_date).toLocaleString(
            "en-GB",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour:'2-digit',
                minute:'2-digit',
                timeZone: 'UTC'
              }
          );

          response.draw_date = new Date(response.draw_date).toLocaleString(
            "en-GB",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
          );
        setGroupData(response)
    }

    useEffect(()=> {
        getSecretData()
    },[])

  return ( 
  <Card sx={{ height: {md: "70vh", m: 1}}}>
    {groupData ? <> 
        <CardMedia
        component="img"
        height="55%"
        image={groupData.group_photo_url}
        alt="2 girls celebrating the holidays"
        /> 
        <CardContent>
            <Typography variant='h4'>{groupData.group_name}</Typography>
            <Typography variant="body1" color='secondary'><strong>Draw Date: </strong> {groupData.draw_date}</Typography>
            <Typography variant="body1" color='secondary'><strong>Event Date: </strong> {groupData.event_date}</Typography>
            {groupData.online? <Typography variant="body1"><strong>Event Link: </strong> {groupData.meeting_link}</Typography>: <Typography variant="body2"><strong>Event Address: </strong> {groupData.location}</Typography>}
        </CardContent></> :  
        <Typography variant='h3'>Looks like you don't have a Secret Santa group yet</Typography>}
  </Card>
  );

}