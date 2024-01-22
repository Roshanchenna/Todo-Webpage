import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {username} from "../Store/selectors/user"; 
import {userState} from "../Store/atoms/user";

const Topbar = () => {
    const navigate = useNavigate();
    const user = useRecoilValue(username)
    const setUser = useSetRecoilState(userState);

    if(user){
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo Webpage
            </Typography>
              <>
                <Button color="inherit" onClick={()=>{
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading:false,
                    username: null
                  })
                  navigate("/");
              }}>
                  Logout
                </Button>
              </>
          </Toolbar>
        </AppBar>
      )
    }else{
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo Webpage
            </Typography>
              <>
                <Button color="inherit" onClick={()=>{
                navigate("/SignupPage")
              }}>Signup</Button>
                <Button color="inherit" onClick={()=>{
                navigate("/LoginPage")
              }}>
                  Login
                </Button>
              </>
          </Toolbar>
        </AppBar>
      )
    }
};

export default Topbar;
