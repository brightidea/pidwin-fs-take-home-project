import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputPropsType } from "../../types";

const Input = ({
    name,
    value,
    handleChange,
    label,
    half,
    autoFocus,
    type,
    handleShowPassword,
}: InputPropsType) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            value={value}
            InputProps={
                name === "password" || name === "oldPassword"
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={handleShowPassword}>
                                      {type === "password" ? (
                                          <Visibility />
                                      ) : (
                                          <VisibilityOff />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : undefined
            }
        />
    </Grid>
);

export default Input;
