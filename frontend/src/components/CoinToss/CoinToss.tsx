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
    Paper,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useLocation } from "react-router-dom";
import QuantityInput from "./QuantityInput";
import CoinTossHistory from "./CoinTossHistory";
import CoinTossResultMessage from "./CoinTossResult";
import { AppState, currentTossData, RootState } from "../../types";
import { coinToss } from "../../actions/coinToss";
import { styles } from "./styles";

const CoinToss = () => {
    const [coinTossForm, setCoinTossForm] = useState({
        wager: 1,
        coinSide: "Heads",
    });
    const [result, setResult] = useState<currentTossData | null>(null);
    const [error, setError] = useState("");
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
    const location = useLocation();
    const coinTossResult = useSelector((state: AppState) => state.coinToss);
    const userState = useSelector((state: RootState) => state.user);
    const handlePlayAgain = () => {
        setCoinTossForm({
            wager: 1,
            coinSide: "Heads",
        });
        setResult(null);
    };
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
            if (coinTossForm.wager > userState.userData.tokens) {
                setError("You don't have enough tokens to place that wager.");
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
            setResult(coinTossResult.currentToss);
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
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    p: 0,
                    gap: 2,
                }}
            >
                <Paper elevation={3} sx={styles.historyPanel}>
                    <CoinTossHistory />
                </Paper>
                <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
                    {!result && (
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="h6"
                                align="center"
                                color="primary"
                            >
                                {`Welcome ${userState.userData.name}! Let's Play A Game.`}
                            </Typography>
                            <FormControl
                                component="form"
                                onSubmit={handleSubmit}
                            >
                                <Box
                                    component="section"
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
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
                                        alignItems: "center",
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
                        </Box>
                    )}
                    {/* Display Result or Error */}
                    {result && (
                        <CoinTossResultMessage
                            result={result.result}
                            resultSide={result.resultSide}
                            winnings={result.winnings}
                            winStreak={result.winStreak}
                            onPlayAgain={handlePlayAgain}
                        />
                    )}
                    {error && (
                        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Grow>
    );
};

export default CoinToss;
