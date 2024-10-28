import { Box, Button, Typography } from "@mui/material";
import { CoinTossResultMessageProps } from "../../types";
import StarIcon from "@mui/icons-material/Star";
import { styles } from "./styles";

const CoinTossResultMessage = ({
    result,
    resultSide,
    winnings,
    winStreak,
    onPlayAgain,
}: CoinTossResultMessageProps) => {
    const isWin = result === "win";
    const winStreakMessage =
        winStreak === 3 || winStreak === 5
            ? `You're on a win streak! ${winStreak} wins in a row!`
            : null;
    return (
        <Box sx={styles.resultMessage}>
            <Typography
                variant="h2"
                color={isWin ? "success.main" : "red"}
                sx={{ mt: 2 }}
            >
                <StarIcon />
            </Typography>
            <Typography
                variant="h6"
                color={isWin ? "success.main" : "red"}
                sx={{ mt: 2 }}
            >
                {`The coin landed on ${resultSide}. You ${
                    winnings > 0
                        ? `won ${winnings} tokens!`
                        : "lost your wager."
                }`}
            </Typography>
            {winStreakMessage && winnings > 0 && (
                <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                    {winStreakMessage}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    onPlayAgain();
                }}
                fullWidth
                sx={{ mt: 10 }}
            >
                Play Again
            </Button>
        </Box>
    );
};

export default CoinTossResultMessage;
