import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoinTossTile from "./CoinTossTile";

// Mock styles and icons if needed
jest.mock("./styles", () => ({
    styles: {
        historyTile: {},
        bonus: {},
    },
}));

describe("CoinTossTile Component", () => {
    it("renders number of tokens won when is_win is true", () => {
        render(
            <CoinTossTile
                _id="1"
                is_win="true"
                wager={100}
                winnings={300}
                bonus_level={1}
            />
        );

        expect(screen.getByText(/300 Tokens Won/i)).toBeInTheDocument();
        expect(screen.getByText(/x3 Bonus/i)).toBeInTheDocument();
    });

    it("renders tokens lost when is_win is false", () => {
        render(
            <CoinTossTile _id="2" is_win="false" wager={150} winnings={0} />
        );

        expect(screen.getByText(/150 Tokens Lost/i)).toBeInTheDocument();
        expect(screen.queryByText(/x3 Bonus/i)).not.toBeInTheDocument();
    });

    it("background color is green for a win", () => {
        render(
            <CoinTossTile _id="3" is_win="true" wager={200} winnings={600} />
        );

        expect(screen.getByTestId("coin-toss-tile")).toHaveStyle(
            `background-color: green`
        );
    });

    it("background color is red for a loss", () => {
        render(
            <CoinTossTile _id="4" is_win="false" wager={250} winnings={0} />
        );

        expect(screen.getByTestId("coin-toss-tile")).toHaveStyle(
            `background-color: red`
        );
    });

    it("renders no bonus message if bonus_level is 0 or undefined", () => {
        const { rerender } = render(
            <CoinTossTile _id="5" is_win="true" wager={50} winnings={150} />
        );

        expect(screen.queryByText(/x3 Bonus/i)).not.toBeInTheDocument();

        rerender(
            <CoinTossTile
                _id="6"
                is_win="true"
                wager={50}
                winnings={150}
                bonus_level={0}
            />
        );

        expect(screen.queryByText(/x3 Bonus/i)).not.toBeInTheDocument();
    });
});
