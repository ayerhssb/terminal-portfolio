import { useState, useEffect } from "react";

export function TicTacToe({ onQuit }: { onQuit: () => void }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares: any[]) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const handleClick = (i: number) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onQuit();
            if ((winner || isDraw) && e.key === "Enter") onQuit();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onQuit, winner, isDraw]);

    return (
        <div className="space-y-4">
            <div className="text-[#22d3ee] font-bold">Tic-Tac-Toe</div>
            <div className="grid grid-cols-3 gap-1 w-[120px]">
                {board.map((cell, i) => (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className="w-10 h-10 border border-gray-600 flex items-center justify-center text-xl hover:bg-gray-800 transition-colors bg-[#1a1a1a]"
                    >
                        {cell === "X" ? <span className="text-red-400">X</span> : cell === "O" ? <span className="text-[#22d3ee]">O</span> : ""}
                    </button>
                ))}
            </div>
            {(winner || isDraw) ? (
                <div className="text-[#4ade80] font-bold">
                    {winner ? `Winner: ${winner}` : "Draw!"} <br />
                    <span className="text-gray-400 text-sm">Press Enter to quit.</span>
                </div>
            ) : (
                <div className="text-gray-400 text-sm">Next player: {isXNext ? "X" : "O"}</div>
            )}
            <button onClick={onQuit} className="px-4 py-1 border border-gray-600 hover:bg-gray-800 transition-colors text-sm rounded bg-[#1a1a1a] text-white">
                Quit Game
            </button>
        </div>
    );
}
