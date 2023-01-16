import React from "react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardActions, Avatar, Tooltip, Button, IconButton, Typography,  TextField, Alert, Link  } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export default function MyProfile({userData, profileUpdate}) {
    const [edit, setEdit] = useState(false);
    const [aboutMe, setAboutMe] = useState(userData.about_me);
    const [address, setAddress] = useState(userData.address);
    const [wishOne, setWishOne] = useState(userData.wish_one);
    const [wishOneDescription, setWishOneDescription] = useState(userData.wish_one_description);
    const [wishTwo, setWishTwo] = useState(userData.wish_two);
    const [wishTwoDescription, setWishTwoDescription] = useState(userData.wish_two_description);
    const [wishThree, setWishThree] = useState(userData.wish_three);
    const [wishThreeDescription, setWishThreeDescription] = useState(userData.wish_three_description);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    const handleCancel = () => {
        setEdit(false);
        setAboutMe(userData.about_me);
        setAddress(userData.address);
        setWishOne(userData.wish_one);
        setWishTwo(userData.wish_two);
        setWishThree(userData.wish_three);
        setAlert(false);
        setError(false);
    };

    const handleSave = async()=> {
        setAlert(false);
        setError(false);
        
        console.log("about me", aboutMe);

        console.log("wishOne", wishOne);
        if (!aboutMe && !wishOne && !wishTwo && !wishThree && !address) {
            setAlert("warning");
            setError("Por favor, preencha todos os campos");
            return;
        } else {
            const body = {
                aboutMe: aboutMe,
                address: address,
                wishOne: wishOne,
                wishTwo: wishTwo,
                wishThree: wishThree,
                wishOneDescription:wishOneDescription, 
                wishTwoDescription:wishTwoDescription,
                wishThreeDescription:wishThreeDescription
            };
            const callUpdate = await profileUpdate(body);
            if (callUpdate === "invalid link") {
                setAlert("warning");
                setError("Ops! Link invalido.");
                return;
            } else if (callUpdate === "success") {
                setEdit(false);
                setAlert(false);
                setError(false);
                return;
            } else {
                setAlert("error");
                setError("Ops! Algo deu errado, por favor tente novamente!"); 
                return;
            }
                

        }};

    useEffect(()=> {
        setAboutMe(userData.about_me);
        setAddress(userData.address);
        setWishOne(userData.wish_one);
        setWishTwo(userData.wish_two);
        setWishThree(userData.wish_three);
        setWishOneDescription(userData.wish_one_description);
        setWishTwoDescription(userData.wish_two_description);
        setWishThreeDescription(userData.wish_three_description);
    },[userData.about_me, userData.address, userData.wish_one, userData.wish_two, userData.wish_three, userData.wish_three_description, userData.wish_two_description, userData.wish_three_description]);

    return ( 
        <Card sx={{ overflow: "scroll", height: {md: "70vh", m: 1, }}}>
            <CardHeader
                avatar={<Avatar alt={userData.name} src={userData.profile_picture_url} sx={{ bgcolor: 'primary.main', height:75, width: 75}}></Avatar>}
                title={<Typography variant="h4" sx={{color: 'primary.main'}} >{userData.name}</Typography>}
                action={edit? <Tooltip title="Cancel">
                    <IconButton onClick={handleCancel}>
                        <CloseIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                </Tooltip> : <Tooltip title="Edit">
                    <IconButton onClick={()=>setEdit(true)}>
                        <EditIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                </Tooltip>}
            />
            <CardContent>
                { edit? <> <TextField fullWidth label="Eu sou ...." id="aboutMe" type="text" margin="normal" defaultValue={userData.about_me} size="large" onChange={(e)=> setAboutMe(e.target.value)} />
                    <TextField fullWidth label="Endereço" id="address" type="text" margin="dense" defaultValue={userData.address}  size="small" onChange={(e)=>setAddress(e.target.value)}/>
                    <TextField fullWidth label="Descreva seu desejo #1" id="wishOneDes" type="text" margin="dense" defaultValue={userData.wishOneDescription}  size="small" onChange={(e)=>setWishOneDescription(e.target.value)}/>
                    <TextField fullWidth label="Adicione o Link #1" id="wishOne" type="url" margin="dense" defaultValue={userData.wish_one}  size="small" onChange={(e)=>setWishOne(e.target.value)}/>
                    <TextField fullWidth label="Descreva seu desejo #2" id="wishTwoDes" type="text" margin="dense" defaultValue={userData.wishTwoDescription}  size="small" onChange={(e)=>setWishTwoDescription(e.target.value)}/>
                    <TextField fullWidth label="Adicione o Link  #2" id="wishTwo"type="url" margin="dense" defaultValue={userData.wish_two}  size="small" onChange={(e)=> setWishTwo(e.target.value)}/>
                    <TextField fullWidth label="Descreva seu desejo #3" id="wishThreeDes" type="text" margin="dense" defaultValue={userData.wishThreeDescription}  size="small" onChange={(e)=>setWishThreeDescription(e.target.value)}/> 
                    <TextField fullWidth label="Adicione o Link  #3" id="wishThree"type="url" margin="dense" defaultValue={userData.wish_three}   size="small" onChange={(e)=> setWishThree(e.target.value)}/>
                </> : <>      
                    {userData.about_me? 
                        <Typography variant="body1" color="text.secondary">{userData.about_me}</Typography> :       
                        <Typography variant="body1" color="text.secondary">Nos conte um pouquinho sobre você</Typography> 
                    } 
                    {userData. address ? 
                        <Typography variant="subtitle1" color="text.primary" sx={{fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}}>{address}</Typography>: 
                        <Typography variant="subtitle1">Coloque seu endereço aqui</Typography>}
                    {userData.wish_one || userData.wish_two || userData.wish_three ? <>
                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={userData.wish_one} target="_blank">
                            <Typography variant="body1" color="text.primary">{wishOneDescription || userData.wish_one}</Typography>
                        </Link>
                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={userData.wish_two} target="_blank">
                            <Typography variant="body1" color="text.primary">{wishTwoDescription || userData.wish_two}</Typography> 
                        </Link>
                        <Link variant="body1" color="text.secondary" sx={{m:1}} href={userData.wish_three} target="_blank">
                            <Typography variant="body1" color="text.primary">{wishThreeDescription || userData.wish_three}</Typography> 
                        </Link></>:       
                        <Typography variant="body1" color="text.primary" sx={{m:1}}>Aqui voce pode incluir ate 3 links de presentes que você deseja ganhar.</Typography> 
                    } </>}
        
   
            </CardContent>
            {edit && 
            <CardActions>
                <Button variant="text" size="large" fontSize="large"  sx={{fontWeight: 700, color: 'secondary.main' }} onClick={handleSave}>Salvar</Button>
                {alert && <Alert severity={alert}>{error}</Alert>}
            </CardActions>}
        </Card>
    );

}
