import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grow,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useLocation } from "react-router-dom";
import QuantityInput from "./QuantityInput";
import { AppState, RootState } from "../../types";
import { coinToss } from "../../actions/coinToss";

const CoinToss = () => {
    const [coinTossForm, setCoinTossForm] = useState({
        wager: 1,
        coinSide: "Heads",
    });
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState("");
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
    const location = useLocation();
    const coinTossResult = useSelector((state: AppState) => state.coinToss);
    const userState = useSelector((state: RootState) => state.user);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setResult(null);

        // Input validation
        if (
            !coinTossForm.wager ||
            isNaN(coinTossForm.wager) ||
            Number(coinTossForm.wager) <= 0
        ) {
            setError("Please enter a valid wager.");
            return;
        } else if (!coinTossForm.coinSide) {
            setError("Please choose Heads or Tails.");
            return;
        }

        try {
            if (coinTossForm.wager > 100) {
                setError("Max wager is 100 tokens.");
                return;
            }
            dispatch(coinToss(coinTossForm));
        } catch (err) {
            setError("Error placing wager. Please try again.");
        }
    };

    useEffect(() => {
        if (coinTossResult?.currentToss?.result) {
            dispatch({
                type: "UPDATE",
                data: {
                    ...userState,
                    userData: {
                        ...userState.userData,
                        tokens: coinTossResult.currentToss.tokens,
                    },
                },
            });
            setResult(
                `The coin landed on ${
                    coinTossResult.currentToss.resultSide
                }. You ${
                    coinTossResult.currentToss.winnings > 0
                        ? `won ${coinTossResult.currentToss.winnings} tokens!`
                        : "lost your wager."
                }`
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinTossResult]);

    useEffect(() => {
        setResult(null);
    }, [location]);

    return (
        <Grow in>
            <Container
                component="main"
                maxWidth="xl"
                sx={{ display: "flex", flexDirection: "column" }}
            >
                {!result && (
                    <>
                        <Typography variant="h6" align="center" color="primary">
                            {`Welcome ${userState.userData.name}! Let's Play A Game.`}
                        </Typography>
                        <FormControl component="form" onSubmit={handleSubmit}>
                            <Box
                                component="section"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                    gap: 2,
                                }}
                            >
                                <FormLabel component="legend">
                                    What do you wager?
                                </FormLabel>
                                <QuantityInput
                                    id="wager"
                                    onChange={(
                                        event:
                                            | React.FocusEvent<HTMLInputElement>
                                            | React.PointerEvent
                                            | React.KeyboardEvent,
                                        newValue: number | undefined
                                    ) => {
                                        event.preventDefault();
                                        setCoinTossForm({
                                            ...coinTossForm,
                                            wager: newValue ?? 1,
                                        });
                                    }}
                                    value={coinTossForm.wager}
                                    max={userState.userData.tokens}
                                />
                            </Box>
                            <Box
                                component="section"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                    gap: 2,
                                }}
                            >
                                <FormLabel component="legend">
                                    Choose Heads or Tails
                                </FormLabel>
                                <RadioGroup
                                    aria-label="coin-flip"
                                    name="coinSide"
                                    value={coinTossForm.coinSide}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        event.preventDefault();
                                        setCoinTossForm({
                                            ...coinTossForm,
                                            coinSide: event.target.value,
                                        });
                                    }}
                                    row
                                >
                                    <FormControlLabel
                                        value="Heads"
                                        control={<Radio />}
                                        label="Heads"
                                    />
                                    <FormControlLabel
                                        value="Tails"
                                        control={<Radio />}
                                        label="Tails"
                                    />
                                </RadioGroup>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Flip Coin
                            </Button>
                        </FormControl>{" "}
                    </>
                )}
                {/* Display Result or Error */}
                {result && (
                    <>
                        <Typography
                            variant="h6"
                            color="success.main"
                            sx={{ mt: 2 }}
                        >
                            {result}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setCoinTossForm({
                                    wager: 1,
                                    coinSide: "Heads",
                                });
                                setResult(null);
                            }}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Play Again
                        </Button>
                    </>
                )}
                {error && (
                    <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Container>
        </Grow>
    );
};

export default CoinToss;
