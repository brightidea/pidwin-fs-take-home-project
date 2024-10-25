import { useState, useEffect } from "react";
import {
    Container,
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../actions/login";
import * as actionType from "../../constants/actionTypes";
import { AppDispatch, RootState, User } from "../../types";
import { styles } from "./styles";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useNavigate();

    const userState = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<Partial<User> | null>(userState.userData);
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history("/auth");
        setUser(null);
    };

    useEffect(() => {
        if (userState) {
            if (userState.exp && userState.exp * 1000 < new Date().getTime())
                logout();
            if (!userState.userData) {
                dispatch(getProfile());
            }
            if (userState.userData) {
                setUser(userState.userData);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppBar sx={styles.appBar} position="static" color="inherit">
            <Container sx={styles.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    sx={styles.heading}
                    variant="h5"
                    align="center"
                >
                    CoinToss
                </Typography>
            </Container>
            <Toolbar sx={styles.toolbar}>
                {userState.userData ? (
                    <Container sx={styles.profile}>
                        <Typography sx={styles.userName} variant="h6">
                            Tokens: {userState.userData.tokens}
                        </Typography>

                        <Avatar
                            sx={styles.purple}
                            alt={userState.userData.name}
                            src={userState.userData.picture}
                        >
                            {user?.name?.charAt(0)}
                        </Avatar>
                        <Typography sx={styles.userName} variant="h6">
                            {userState.userData.name}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={styles.logout}
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                history("/password");
                            }}
                        >
                            Set Password
                        </Button>
                    </Container>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
