import { Box, Card } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import { coinToss } from "../../types";
import { styles } from "./styles";

const CoinTossTile = ({
    _id,
    bonus_level,
    is_win,
    wager,
    winnings,
}: Partial<coinToss>) => {
    const isWin = is_win === "true";

    const winAmount = isWin ? winnings : wager;
    const wonLostText = isWin ? "Tokens Won" : "Tokens Lost";
    const bonusMessages: { [key: number]: string | undefined } = {
        0: "",
        1: `x3 Bonus`,
        2: `x10 Bonus`,
    };

    return (
        <Card
            data-testid="coin-toss-tile"
            key={_id}
            sx={{
                ...styles.historyTile,
                backgroundColor: isWin ? "green" : "red",
            }}
        >
            <div>
                {winAmount} {wonLostText}
            </div>
            {bonus_level ? (
                <Box sx={styles.bonus}>
                    <StarsIcon />
                    {bonusMessages[bonus_level]}
                </Box>
            ) : null}
        </Card>
    );
};

export default CoinTossTile;
