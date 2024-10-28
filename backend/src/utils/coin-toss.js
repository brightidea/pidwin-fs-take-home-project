import CoinToss from "../models/coin-toss.js";

export const tossCoin = async (userId, wager, coinSide) => {
    // Simulate the coin toss - 50% chance of heads or tails - Change the condition to 1 for to force win/lose.
    const resultSide = Math.random() < 0.5 ? "Heads" : "Tails";
    const isWin = resultSide === coinSide;

    let winStreak = await getWinningStreak(userId);
    let winnings = isWin ? wager * 2 : 0;
    let bonusLevel = 0;
    if (isWin) {
        // Streak calculation happens before the current win is saved
        if (winStreak === 2) {
            winnings = wager * 3; // 3x payout on 3rd consecutive win
            bonusLevel = 1;
        } else if (winStreak === 4) {
            winnings = wager * 10; // 10x payout on 5th consecutive win
            bonusLevel = 2;
        }
    }
    // Save the coin toss result
    await saveCoinToss(
        userId,
        wager,
        coinSide,
        isWin,
        resultSide,
        winnings,
        bonusLevel
    ) // Update the winning streak after the current win is saved
        .then(() => (winStreak = winStreak + (isWin ? 1 : 0)))
        .catch((error) => {
            console.error(error);
        });
    // Return the result
    return { isWin, resultSide, winnings, winStreak, bonusLevel };
};

const saveCoinToss = async (
    userId,
    wager,
    coinSide,
    isWin,
    resultSide,
    winnings,
    bonusLevel
) => {
    const coinToss = new CoinToss({
        user_id: userId,
        wager,
        selected_side: coinSide,
        is_win: isWin,
        result_side: resultSide,
        winnings,
        bonus_level: bonusLevel,
    });
    await coinToss.save();
};

const getWinningStreak = async (userId) => {
    // Fetch last 5 tosses and Fetch only required fields to reduce data transfer
    const coinTosses = await CoinToss.find({ user_id: userId })
        .sort({ date: -1 })
        .limit(5)
        .select("is_win bonus_level");

    let streak = 0;

    for (let i = 0; i < coinTosses.length; i++) {
        if (
            coinTosses[i].is_win === "true" &&
            coinTosses[i].bonus_level !== 2
        ) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};
