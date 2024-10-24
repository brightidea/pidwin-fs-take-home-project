import { Container, Grow, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

type User = {
    name: string;
} | null;

const Home = () => {
    const user: User = localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile") ?? "").token)
        : null;
    const isSignedIn = user;

    return (
        <Grow in>
            <Container component="main" maxWidth="sm">
                <Paper elevation={3}>
                    {isSignedIn ? (
                        <Typography variant="h4" align="center" color="primary">
                            {`Welcome ${user.name}`}
                        </Typography>
                    ) : (
                        <Typography variant="h4" align="center" color="primary">
                            Login to Play
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Grow>
    );
};

export default Home;
