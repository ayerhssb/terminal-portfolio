"use client";

import { useState } from "react";
import { X, Minus, Square, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TerminalWindow({ children }: { children: React.ReactNode }) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    if (isClosed) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-xl text-red-500 font-bold">System Halt.</p>
                <button
                    onClick={() => setIsClosed(false)}
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-500 transition-colors"
                >
                    Reboot System
                </button>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`flex flex-col bg-[#0c0c0c] border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden ${isMaximized ? "w-screen h-screen rounded-none" : "w-[95vw] sm:w-[85vw] max-w-5xl h-[85vh] lg:h-[80vh] rounded-lg"
                            }`}
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] select-none border-b border-gray-700">
                            <div className="text-sm text-gray-300 font-sans tracking-wide">
                                Command Prompt - C:\Users\Shreya\portfolio.exe
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="p-1 px-3 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                                >
                                    <Minus size={16} />
                                </button>
                                <button
                                    onClick={() => setIsMaximized(!isMaximized)}
                                    className="p-1 px-3 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                                >
                                    {isMaximized ? <Copy size={14} /> : <Square size={14} />}
                                </button>
                                <button
                                    onClick={() => setIsClosed(true)}
                                    className="p-1 px-3 text-gray-400 hover:text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content Box */}
                        <div className="flex-1 overflow-hidden relative">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Taskbar for minimized window */}
            {isMinimized && (
                <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-gray-700 p-2 flex justify-center z-50"
                >
                    <button
                        onClick={() => setIsMinimized(false)}
                        className="px-6 py-2 bg-transparent text-[#4ade80] border border-[#4ade80] rounded hover:bg-[#4ade80] hover:text-black transition-colors font-mono"
                    >
                        code with love @shreya &lt;3
                    </button>
                </motion.div>
            )}
        </>
    );
}
