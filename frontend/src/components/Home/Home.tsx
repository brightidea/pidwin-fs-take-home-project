import { useSelector } from "react-redux";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { RootState, User } from "../../types";

import CoinToss from "../CoinToss/CoinToss";

const Home = () => {
    const user: Partial<User> = useSelector(
        (state: RootState) => state.user.userData
    );

    const isSignedIn = user;

    return (
        <Grow in>
            <Container component="main" maxWidth="lg">
                {isSignedIn ? (
                    <CoinToss />
                ) : (
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h4" align="center" color="primary">
                            Login to Play
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Grow>
    );
};

export default Home;
