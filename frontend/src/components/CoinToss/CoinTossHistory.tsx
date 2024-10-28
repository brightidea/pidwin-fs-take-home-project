import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getCoinTosses } from "../../actions/coinToss";
import CoinTossTile from "./CoinTossTile";
import { coinToss, RootState } from "../../types";
import { styles } from "./styles";

const CoinTossHistory = () => {
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

    const coinTossState = useSelector((state: RootState) => state.coinToss);

    const [coinTosses, setCoinTosses] = useState<coinToss[]>([]);

    useEffect(() => {
        // Check if the current toss has a tossHistory and set the coinTosses state or fetch the coinToss history
        if (coinTossState.tossHistory) {
            setCoinTosses(coinTossState.tossHistory);
        } else {
            dispatch(getCoinTosses());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinTossState.tossHistory, coinTossState.currentToss]);

    if (!coinTosses) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Typography
                variant="h6"
                align="center"
                color="primary"
                sx={styles.historyPanelTitle}
            >
                Flip History
            </Typography>
            <Grid container columns={1} spacing={2}>
                {coinTosses?.map((cointoss: coinToss) => (
                    <Grid item xs={12} key={cointoss._id}>
                        <CoinTossTile {...cointoss} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default CoinTossHistory;
