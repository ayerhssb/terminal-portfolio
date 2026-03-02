import { useState, useEffect, useRef } from 'react';

export type HistoryItem = {
    id: string;
    command?: string;
    output: React.ReactNode;
};

export function useTerminal() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [bootPhase, setBootPhase] = useState(0);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Boot sequence logic
    useEffect(() => {
        const sequence = [
            { phase: 1, delay: 1000 },
            { phase: 2, delay: 1000 },
            { phase: 3, delay: 500 },
            { phase: 4, delay: 500 },
        ];

        if (bootPhase < 4) {
            const current = sequence.find(s => s.phase === bootPhase + 1);
            if (current) {
                const timer = setTimeout(() => {
                    setBootPhase(current.phase);
                }, current.delay);
                return () => clearTimeout(timer);
            }
        }
    }, [bootPhase]);

    // Auto scroll to bottom
    useEffect(() => {
        const scrollToBottom = () => {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        };
        // small delay to let react render
        setTimeout(scrollToBottom, 50);
    }, [history, bootPhase, input]);

    const pushHistory = (item: Omit<HistoryItem, 'id'>) => {
        setHistory(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    // Keep input focused when clicking on terminal body (but not when selecting text)
    const handleContainerClick = () => {
        if (window.getSelection()?.toString() === "") {
            inputRef.current?.focus();
        }
    };

    return {
        history,
        pushHistory,
        clearHistory,
        bootPhase,
        setBootPhase,
        input,
        setInput,
        inputRef,
        containerRef,
        handleContainerClick,
        isTyping,
        setIsTyping,
    };
}
