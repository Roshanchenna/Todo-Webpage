import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import {useSetRecoilState, useRecoilValue} from "recoil";
import {userState} from "../Store/atoms/user";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../config";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const setUser = useSetRecoilState(userState);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form>
        <TextField
            label="Username"
            type="text"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            required
          />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={ async ()=>{
            const respone = await axios.post(`${BASE_URL}/Login`,{
              username,
              password
            },{
              headers: {
                  "Content-type": "application/json"
              }
          })
            localStorage.setItem("token", respone.data.token);
            setUser({
              isLoading:true,
              username:username
            })
            alert(respone.data.message);
            navigate("/TodoWindow")
          }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
