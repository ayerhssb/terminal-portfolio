import { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';

export function ContactCommand({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0); // 0: Name, 1: Email, 2: Message, 3: Success, 4: Error
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (step < 3) {
            inputRef.current?.focus();
        }
    }, [step]);

    // Keep focus within this component when active
    useEffect(() => {
        const handleGlobalClick = () => {
            if (step < 3 && window.getSelection()?.toString() === "") {
                inputRef.current?.focus();
            }
        };
        document.addEventListener("click", handleGlobalClick);
        return () => document.removeEventListener("click", handleGlobalClick);
    }, [step]);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const val = inputValue.trim();
            if (step === 0) {
                if (!val) {
                    setIsActive(false);
                    onComplete(); // abort if empty
                    return;
                }
                setName(val);
                setStep(1);
            } else if (step === 1) {
                setEmail(val);
                setStep(2);
            } else if (step === 2) {
                setMessage(val);
                setIsSending(true);

                try {
                    await emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                        {
                            from_name: name,
                            from_email: email,
                            message: val,
                        },
                        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
                    );
                    setStep(3);
                } catch (error) {
                    console.error("Failed to send email:", error);
                    setStep(4);
                } finally {
                    setIsSending(false);
                    setIsActive(false);
                    onComplete();
                }
            }
            setInputValue("");
        }
    };

    return (
        <div className="mt-2 space-y-2">
            <div className="text-gray-300">Let's Connect! I'm always open to discussing new projects.</div>
            <div className="flex space-x-6 pb-2 text-[#4ade80]">
                <a href="https://github.com/ayerhssb" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/shreya-bharti-86465824b/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">LinkedIn</a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Twitter</a>
                <a href="mailto:shreyabhartissb1@gmail.com" className="underline hover:text-white transition-colors">Email</a>
            </div>

            {step > 0 && <div><span className="text-[#22d3ee] w-32 inline-block">Enter Name:</span> <span className="text-gray-300">{name}</span></div>}
            {step === 0 && (
                <div className="flex">
                    <span className="text-[#22d3ee] w-32 shrink-0">Enter Name:</span>
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
            )}

            {step > 1 && <div><span className="text-[#22d3ee] w-32 inline-block">Enter Email:</span> <span className="text-gray-300">{email}</span></div>}
            {step === 1 && (
                <div className="flex">
                    <span className="text-[#22d3ee] w-32 shrink-0">Enter Email:</span>
                    <div className="relative flex-1">
                        <input
                            ref={inputRef}
                            type="email"
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
            )}

            {step > 2 && <div><span className="text-[#22d3ee] w-32 inline-block">Message:</span> <span className="text-gray-300">{message}</span></div>}
            {step === 2 && !isSending && (
                <div className="flex">
                    <span className="text-[#22d3ee] w-32 shrink-0">Message:</span>
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
            )}

            {isSending && <div className="text-yellow-400 mt-2">Connecting to SMTP server... Sending message...</div>}
            {step === 3 && <div className="text-[#4ade80] mt-2 font-bold bg-[#1a1a1a] inline-block px-4 py-2 rounded border border-gray-700">Email sent successfully!</div>}
            {step === 4 && <div className="text-red-400 mt-2 font-bold bg-[#1a1a1a] inline-block px-4 py-2 rounded border border-red-900">Failed to send message. Please try again later.</div>}
        </div>
    );
}
