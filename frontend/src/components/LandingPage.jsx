import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const LandingPage = () => {
    
    return <div>
        <Grid container style={{padding: "2vh"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"} style={{fontFamily:"monospace"}}>
                    Welcome to Todo Application
                    </Typography>
                    <Typography variant={"h6"}>
                    Make your life organized and efficient with our powerful Todo application. Manage your tasks, set deadlines,
                  and stay on top of your goals effortlessly.
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSFb0b4D0QjeeepuAa1nmcksjmNSC0dfRijA&usqp=CAU" width={"100%"} />
            </Grid>
        </Grid>
    </div>
}

export default LandingPage;