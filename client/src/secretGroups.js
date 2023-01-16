import React from "react";
import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

export default function SecretGroup({userData, setUserGroup}) {
    const [groupData, setGroupData] = useState();
    

    const getSecretData = async () => {
        const fetchReq = await fetch("/api/get-secret-group");
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
        setGroupData(response);
        setUserGroup(response.id);
    };

    useEffect(()=> {
        getSecretData();
    },[]);

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
                    <Typography variant="body1" color='secondary'><strong>Data do Sorteio: </strong> {groupData.draw_date}</Typography>
                    <Typography variant="body1" color='secondary'><strong>Data do Evento: </strong> {groupData.event_date}</Typography>
                    {groupData.online? <Typography variant="body1"><strong>Link do Evento: </strong> {groupData.meeting_link}</Typography>: <Typography variant="body2"><strong>Event Address: </strong> {groupData.location}</Typography>}
                </CardContent></> :  
                <Typography variant='h3'>Parece que você ainda não foi adicionado a nenhum grupo de amigo secreto</Typography>}
            <Typography variant="subtitle2" sx={{  position: "fixed" ,bottom: 0, right: 0, color: "#c22c2d"}}><Link href="https://www.freepik.com/free-photo/two-women-with-sparkle-balloons-talking-party_12306682.htm#page=10&query=girls%20christmas%20party&position=15&from_view=search&track=sph">Image by lookstudio on Freepik</Link></Typography>
                
        </Card>
    );

}