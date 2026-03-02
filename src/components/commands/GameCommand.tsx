import { useState, useRef, useEffect } from "react";
import { TicTacToe } from "./games/TicTacToe";
import { GuessNumber } from "./games/GuessNumber";
import { SnakeGame } from "./games/SnakeGame";

export function GameCommand({ onComplete }: { onComplete: () => void }) {
    const [game, setGame] = useState(0); // 0: None, 1: TTT, 2: Guess, 3: Snake
    const [inputValue, setInputValue] = useState("");
    const [isActive, setIsActive] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (game === 0) {
            inputRef.current?.focus();
        }
    }, [game]);

    useEffect(() => {
        const handleGlobalClick = () => {
            if (game === 0 && window.getSelection()?.toString() === "") {
                inputRef.current?.focus();
            }
        };
        document.addEventListener("click", handleGlobalClick);
        return () => document.removeEventListener("click", handleGlobalClick);
    }, [game]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const val = inputValue.trim();
            if (val === "1") setGame(1);
            else if (val === "2") setGame(2);
            else if (val === "3") setGame(3);
            else {
                setIsActive(false);
                onComplete();
            }
            setInputValue("");
        }
    };

    const quitGame = () => {
        setIsActive(false);
        onComplete();
    };

    if (game === 1) return <div className="mt-4"><TicTacToe onQuit={quitGame} /></div>;
    if (game === 2) return <div className="mt-4"><GuessNumber onQuit={quitGame} /></div>;
    if (game === 3) return <div className="mt-4"><SnakeGame onQuit={quitGame} /></div>;

    return (
        <div className="mt-2 space-y-2">
            <div className="text-[#4ade80] font-bold">Choose a game:</div>
            <div className="pl-4 space-y-1 text-[#22d3ee]">
                <div>1. Tic-Tac-Toe</div>
                <div>2. Guess the Number</div>
                <div>3. Mini Snake</div>
                <div className="text-gray-400 mt-2">Press any other key to abort.</div>
            </div>
            <div className="flex mt-4">
                <span className="text-[#4ade80] mr-2">Selection:</span>
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none border-none text-transparent caret-transparent font-mono absolute inset-0 z-10"
                        autoComplete="off"
                        spellCheck="false"
                        disabled={!isActive}
                    />
                    <div className="absolute inset-0 z-0 pointer-events-none flex text-[#cccccc]">
                        <span className="whitespace-pre">{inputValue}</span>
                        {isActive && <span className="animate-blink bg-[#cccccc] w-[8px] sm:w-[10px] h-[1em] inline-block ml-[1px] transform translate-y-[2px]" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
