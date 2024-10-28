import { useCallback, useState, useEffect } from "react";
import {
    Container,
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
    Box,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../../actions/login";
import * as actionType from "../../constants/actionTypes";
import { AppDispatch, RootState, User } from "../../types";
import { styles } from "./styles";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useNavigate();
    const userState = useSelector((state: RootState) => state.user);
    const coinTossState = useSelector((state: RootState) => state.coinToss);
    const [user, setUser] = useState<Partial<User> | null>(userState.userData);

    const logout = useCallback(() => {
        dispatch({ type: actionType.LOGOUT });
        history("/auth");
        setUser(null);
    }, [dispatch, history]);

    useEffect(() => {
        const authToken = localStorage.getItem("profile");
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            if (
                decodedToken.exp &&
                decodedToken.exp * 1000 < new Date().getTime()
            ) {
                logout();
            }
            if (userState) {
                if (!userState.userData) {
                    dispatch(getProfile());
                }
                if (userState.userData) {
                    setUser(userState.userData);
                }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState, coinTossState]);

    return (
        <AppBar sx={styles.appBar} position="static" color="inherit">
            <Container sx={styles.brandContainer}>
                <Link to="/">
                    <img
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        alt="Game Logo"
                        style={styles.logo}
                    />
                </Link>
            </Container>
            <Toolbar sx={styles.toolbar}>
                {userState.userData ? (
                    <Container sx={styles.profile}>
                        <Typography sx={styles.userName} variant="h6">
                            Tokens: {userState.userData.tokens}
                        </Typography>
                        <Box sx={styles.avatar}>
                            <Avatar
                                sx={styles.purple}
                                alt={userState.userData.name}
                                src={userState.userData.picture}
                            >
                                {user?.name?.charAt(0)}
                            </Avatar>
                            <Box sx={styles.avatarText}>
                                <Typography
                                    sx={styles.userName}
                                    variant="subtitle1"
                                >
                                    Welcome,
                                </Typography>
                                <Typography sx={styles.userName} variant="h6">
                                    {userState.userData.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                aria-label="password settings"
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    history("/password");
                                }}
                            >
                                <SettingsIcon />
                            </Button>
                            <Button
                                aria-label="logout"
                                variant="contained"
                                sx={styles.logout}
                                color="secondary"
                                onClick={logout}
                            >
                                <LogoutIcon />
                            </Button>
                        </Box>
                    </Container>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        <LockOpenIcon /> Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
