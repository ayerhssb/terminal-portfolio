import { useState, useEffect, useCallback, useRef } from "react";

export function SnakeGame({ onQuit }: { onQuit: () => void }) {
    const [snake, setSnake] = useState([[5, 5]]);
    const [food, setFood] = useState([10, 10]);
    const [dir, setDir] = useState([1, 0]);
    const [gameOver, setGameOver] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    const moveSnake = useCallback(() => {
        if (gameOver) return;
        setSnake(prev => {
            const head = prev[prev.length - 1];
            const newHead = [head[0] + dir[0], head[1] + dir[1]];

            if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
                setGameOver(true);
                return prev;
            }
            for (const segment of prev) {
                if (segment[0] === newHead[0] && segment[1] === newHead[1]) {
                    setGameOver(true);
                    return prev;
                }
            }

            const newSnake = [...prev, newHead];
            if (newHead[0] === food[0] && newHead[1] === food[1]) {
                setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
            } else {
                newSnake.shift();
            }
            return newSnake;
        });
    }, [dir, food, gameOver]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 120);
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onQuit();
            if (gameOver && e.key === "Enter") onQuit();
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [gameOver, onQuit]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp" && dir[1] !== 1) { e.preventDefault(); setDir([0, -1]); }
        if (e.key === "ArrowDown" && dir[1] !== -1) { e.preventDefault(); setDir([0, 1]); }
        if (e.key === "ArrowLeft" && dir[0] !== 1) { e.preventDefault(); setDir([-1, 0]); }
        if (e.key === "ArrowRight" && dir[0] !== -1) { e.preventDefault(); setDir([1, 0]); }
        if (e.key === "Enter" && gameOver) onQuit();
        if (e.key === "Escape") onQuit();
    };

    return (
        <div
            className="space-y-4 outline-none select-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={containerRef}
        >
            <div className="text-[#22d3ee] font-bold flex justify-between w-64">
                <span>Snake Game</span>
                <span className="text-[#4ade80]">Score: {snake.length - 1}</span>
            </div>
            <div className="bg-[#1a1a1a] w-fit border-2 border-gray-600 p-1 rounded">
                {Array.from({ length: 20 }).map((_, y) => (
                    <div key={y} className="flex">
                        {Array.from({ length: 20 }).map((_, x) => {
                            const head = snake[snake.length - 1];
                            const isHead = head[0] === x && head[1] === y;
                            const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
                            const isFood = food[0] === x && food[1] === y;
                            return (
                                <div
                                    key={x}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${isHead ? "bg-[#22d3ee]" : isSnake ? "bg-[#4ade80]" : isFood ? "bg-red-500" : "bg-transparent"
                                        }`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            {gameOver && (
                <div className="text-red-400 font-bold">Game Over! Press Enter to quit.</div>
            )}
            <div className="text-gray-500 text-sm">Use Arrow Keys. Click here if controls aren't working.</div>
        </div>
    );
}
