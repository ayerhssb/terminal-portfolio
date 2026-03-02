import { useState, useEffect } from "react";

export function AboutCommand({ onComplete }: { onComplete: () => void }) {
    const text = `I'm a Full Stack Developer who loves building products that look good, work fast, and don't break in production. Over the past few years, I've worked on real-world projects and internships where I built scalable systems, improved performance, and learned what it actually takes to ship software that people use. From backend pipelines to polished frontends, I enjoy working across the stack and obsessing over the little details.

My journey started in college with a curiosity for problem-solving (and a lot of late-night debugging). Since then, I've worked on things like AI-powered video captioning systems, automation tools, and full-stack platforms and somewhere along the way, I realized I genuinely enjoy building things that make life easier.

Right now, I'm focused on becoming a really solid software engineer, learning how great systems are designed, and contributing to meaningful products (and maybe some open-source too).

Fun Facts: I've maintained a 550+ day Duolingo streak learning Japanese, I love singing, I run on chai, and when I'm not coding, you'll probably find me doing some random art & craft or redesigning something that didn't need redesigning :)`;

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                onComplete();
            }
        }, 15); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [onComplete]);

    return <div className="whitespace-pre-wrap leading-relaxed mt-2 text-gray-300">{displayedText}</div>;
}
