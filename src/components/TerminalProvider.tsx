"use client";

import { useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { executeCommand } from "@/lib/commandExecutor";
import { motion } from "framer-motion";

export function TerminalProvider() {
    const {
        history,
        pushHistory,
        clearHistory,
        bootPhase,
        input,
        setInput,
        inputRef,
        containerRef,
        handleContainerClick,
        isTyping,
        setIsTyping
    } = useTerminal();

    const promptText = "C:\\Users\\Shreya>";

    const [historyIndex, setHistoryIndex] = useState(-1);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isTyping) {
            e.preventDefault();
            return;
        }

        if (e.key === "Enter") {
            const cmd = input.trim();
            setInput("");
            setHistoryIndex(-1);

            if (!cmd) {
                pushHistory({ command: cmd, output: null });
                return;
            }

            executeCommand(cmd, { pushHistory, clearHistory, setIsTyping });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const commands = history.map(h => h.command).filter(c => c !== undefined && c !== "");
            if (commands.length > 0) {
                const newIndex = historyIndex < commands.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commands[commands.length - 1 - newIndex] || "");
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const commands = history.map(h => h.command).filter(c => c !== undefined && c !== "");
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commands[commands.length - 1 - newIndex] || "");
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const availableCommands = [
                "help", "about", "skills", "experience", "education",
                "projects", "resume", "contact", "game", "clear"
            ];
            const currentInput = input.trim().toLowerCase();
            const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));

            if (matches.length === 1) {
                setInput(matches[0]);
            } else if (matches.length > 1) {
                // Find common prefix
                let i = currentInput.length;
                while (i < matches[0].length) {
                    const char = matches[0][i];
                    if (matches.every(cmd => cmd[i] === char)) {
                        i++;
                    } else {
                        break;
                    }
                }
                setInput(matches[0].substring(0, i));
            }
        }
    };

    return (
        <div
            ref={containerRef}
            onClick={handleContainerClick}
            className="h-full w-full p-4 overflow-y-auto font-mono text-sm sm:text-base text-[#cccccc] bg-[#0c0c0c]"
        >
            {/* Boot Sequence */}
            {bootPhase >= 1 && (
                <div className="mb-1 text-[#4ade80]">
                    {promptText} booting portfolio...
                </div>
            )}
            {bootPhase >= 2 && (
                <div className="mb-1">Loading modules...</div>
            )}
            {bootPhase >= 3 && (
                <div className="mb-1 mt-4">Welcome to my terminal portfolio.... (version 1.0.0)</div>
            )}
            {bootPhase >= 4 && (
                <div className="mb-6 space-y-1">
                    <div>Type <span className="text-[#22d3ee]">"help"</span> to see available commands.</div>
                    <div>
                        <a href="https://portfolio-shreya-b.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#22d3ee] underline font-bold hover:text-[#4ade80] transition-colors">
                            [Open Visual Portfolio]
                        </a>
                    </div>
                </div>
            )}

            {/* History */}
            {bootPhase >= 4 && (
                <div className="space-y-3 mb-2">
                    {history.map((item) => (
                        <div key={item.id}>
                            {item.command !== undefined && (
                                <div className="flex">
                                    <span className="text-[#4ade80] mr-2">{promptText}</span>
                                    <span>{item.command}</span>
                                </div>
                            )}
                            {item.output && (
                                <div className="mt-1 ml-4 text-[#cccccc] whitespace-pre-wrap">
                                    {item.output}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Current Input */}
            {bootPhase >= 4 && !isTyping && (
                <div className="flex">
                    <span className="text-[#4ade80] mr-2 shrink-0">{promptText}</span>
                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent outline-none border-none text-transparent caret-transparent font-mono absolute inset-0 z-10"
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {/* Custom blinking block cursor relative to text */}
                        <div className="absolute inset-0 z-0 pointer-events-none flex text-[#cccccc]">
                            <span className="whitespace-pre">{input}</span>
                            <span className="animate-blink bg-[#cccccc] w-[8px] sm:w-[10px] h-[1em] inline-block ml-[1px] transform translate-y-[2px]" />
                        </div>
                    </div>
                </div>
            )}

            {/* Extra padding at bottom to ensure easy scrolling */}
            <div className="h-8" />
        </div>
    );
}
