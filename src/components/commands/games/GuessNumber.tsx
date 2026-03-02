import { useState, useRef, useEffect } from "react";

export function GuessNumber({ onQuit }: { onQuit: () => void }) {
    const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [guesses]);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (gameOver && e.key === "Enter") {
                onQuit();
            }
        };

        if (gameOver) {
            window.addEventListener("keydown", handleGlobalKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, [gameOver, onQuit]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const val = inputValue.trim();
            const num = parseInt(val, 10);
            if (isNaN(num)) {
                setGuesses(prev => [...prev, `Invalid input: ${val}`]);
            } else {
                if (num === target) {
                    setGuesses(prev => [...prev, `${num} - Correct! You won!`]);
                    setGameOver(true);
                } else if (num < target) {
                    setGuesses(prev => [...prev, `${num} - Too low`]);
                } else {
                    setGuesses(prev => [...prev, `${num} - Too high`]);
                }
            }
            setInputValue("");
        }
    };

    return (
        <div className="space-y-2">
            <div className="text-[#22d3ee] font-bold">Guess The Number (1 - 100)</div>
            {guesses.map((g, i) => (
                <div key={i} className="text-gray-300">{g}</div>
            ))}
            {!gameOver ? (
                <div className="flex">
                    <span className="text-[#4ade80] mr-2">Your guess:</span>
                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent outline-none border-none text-transparent caret-transparent font-mono absolute inset-0 z-10"
                            autoFocus
                        />
                        <div className="absolute inset-0 z-0 pointer-events-none flex text-[#cccccc]">
                            <span className="whitespace-pre">{inputValue}</span>
                            <span className="animate-blink bg-[#cccccc] w-[8px] sm:w-[10px] h-[1em] inline-block ml-[1px] transform translate-y-[2px]" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-[#4ade80]">Press Enter to quit.</div>
            )}
        </div>
    );
}
