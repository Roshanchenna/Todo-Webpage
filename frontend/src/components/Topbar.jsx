import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();

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
  );
};

export default Topbar;
