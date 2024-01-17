import { Button, Card, TextField } from "@mui/material";

function Login(){
    return <div>
    <Card variant="contained">
        <TextField variant="outlined" label="Name" />
        <br />
        <Button variant="contained">Enter</Button>
    </Card>
    </div>
}

export default Login;