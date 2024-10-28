import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoinTossResultMessage from "./CoinTossResult";
import { CoinTossResultMessageProps } from "../../types";

describe("CoinTossResultMessage Component", () => {
    const defaultProps: CoinTossResultMessageProps = {
        result: "win",
        resultSide: "heads",
        winnings: 100,
        winStreak: 3,
        onPlayAgain: jest.fn(),
    };

    it("renders win message correctly", () => {
        render(<CoinTossResultMessage {...defaultProps} />);

        expect(
            screen.getByText(/The coin landed on heads/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/won 100 tokens/i)).toBeInTheDocument();
        expect(
            screen.getByText(/You're on a win streak! 3 wins in a row!/i)
        ).toBeInTheDocument();
    });

    it("renders lose message correctly", () => {
        const loseProps = { ...defaultProps, result: "lose", winnings: -1 };
        render(<CoinTossResultMessage {...loseProps} />);

        expect(
            screen.getByText(/The coin landed on heads/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/lost your wager/i)).toBeInTheDocument();
        expect(
            screen.queryByText(/You're on a win streak!/i)
        ).not.toBeInTheDocument();
    });

    it("does not show win streak message for non-streak values", () => {
        const noStreakProps = { ...defaultProps, winStreak: 2 };
        render(<CoinTossResultMessage {...noStreakProps} />);

        expect(
            screen.queryByText(/You're on a win streak!/i)
        ).not.toBeInTheDocument();
    });

    it("calls onPlayAgain when Play Again button is clicked", () => {
        render(<CoinTossResultMessage {...defaultProps} />);

        const playAgainButton = screen.getByRole("button", {
            name: /Play Again/i,
        });
        fireEvent.click(playAgainButton);

        expect(defaultProps.onPlayAgain).toHaveBeenCalledTimes(1);
    });
});
