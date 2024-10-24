import React, { useState, useEffect } from "react";
import {
    Container,
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import { User } from "../../types";
import { styles } from "./styles";

const Navbar = () => {
    const [user, setUser] = useState<User>(
        localStorage.getItem("profile")
            ? jwtDecode(JSON.parse(localStorage.getItem("profile") ?? "").token)
            : null
    );

    const dispatch = useDispatch();
    let location = useLocation();
    const history = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history("/auth");
        setUser(null);
    };

    useEffect(() => {
        if (user) {
            if (user.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(
            localStorage.getItem("profile")
                ? jwtDecode(
                      JSON.parse(localStorage.getItem("profile") ?? "").token
                  )
                : null
        );
    }, [location]);

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
                {user ? (
                    <Container sx={styles.profile}>
                        <Avatar
                            sx={styles.purple}
                            alt={user.name}
                            src={user.picture}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography sx={styles.userName} variant="h6">
                            {user.name}
                        </Typography>
                        <Typography sx={styles.userName} variant="h6">
                            {user.tokens}
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
