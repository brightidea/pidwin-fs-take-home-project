import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/LockRounded";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Input from "../Login/Input";
import { changePassword } from "../../actions/login";
import { User } from "../../types";
import { styles } from "./styles";

const PasswordSetting = () => {
    const user: User = localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile") ?? "").token)
        : null;
    const isSignedIn = user;
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [changeFormData, setChangeFormData] = useState({
        oldPassword: "",
        newPassword: "",
        email: user?.email,
    });
    const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

    const handleChangeC = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeFormData({
            ...changeFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword((prevPassword) => !prevPassword);
    };

    const handleSubmitChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(changePassword(changeFormData, history));
    };

    useEffect(() => {
        if (!isSignedIn) {
            history("/");
        }
    }, []);

    if (isSignedIn) {
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <Paper sx={styles.paper} elevation={3}>
                        <Avatar sx={styles.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h5" color="primary">
                            Set Password
                        </Typography>
                        <form style={styles.form} onSubmit={handleSubmitChange}>
                            <Grid container spacing={2}>
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={styles.typo}
                                    align="left"
                                >
                                    To change your password, enter your current
                                    password and your new password.
                                </Typography>
                                <Input
                                    name="oldPassword"
                                    label="Current Password"
                                    handleChange={handleChangeC}
                                    type={showPassword ? "text" : "password"}
                                    handleShowPassword={handleShowPassword}
                                />
                                <Input
                                    name="newPassword"
                                    label="New Password"
                                    handleChange={handleChangeC}
                                    type="password"
                                    value={changeFormData.newPassword}
                                />
                                <Button
                                    type="submit"
                                    sx={styles.submit}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Change Password
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    } else {
        return <>No Access</>;
    }
};

export default PasswordSetting;
