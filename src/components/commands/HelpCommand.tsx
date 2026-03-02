export function HelpCommand() {
    const commands = [
        { name: "about", desc: "Learn more about me" },
        { name: "projects", desc: "View my portfolio projects" },
        { name: "skills", desc: "Check out my technical skills" },
        { name: "experience", desc: "My work experience" },
        { name: "education", desc: "My academic background" },
        { name: "resume", desc: "Download or view my resume" },
        { name: "contact", desc: "Get in touch with me" },
        { name: "help", desc: "Check available commands" },
        { name: "game", desc: "Play a quick game" },
        { name: "clear", desc: "Clear the terminal" },
    ];

    return (
        <div className="flex flex-col space-y-1">
            <div>Available commands:</div>
            {commands.map(cmd => (
                <div key={cmd.name} className="flex flex-col sm:flex-row">
                    <div className="w-40 text-[#22d3ee] font-bold">{cmd.name}</div>
                    <div className="text-gray-400">- {cmd.desc}</div>
                </div>
            ))}
            <div className="mt-4 pt-2 border-t border-gray-800 text-gray-500 text-sm space-y-1">
                <div><span className="text-gray-400 font-bold">Tip:</span> Press <kbd className="bg-gray-800 px-1 rounded">Tab</kbd> to auto-complete commands.</div>
                <div><span className="text-gray-400 font-bold">Tip:</span> Use <kbd className="bg-gray-800 px-1 rounded">↑</kbd> and <kbd className="bg-gray-800 px-1 rounded">↓</kbd> arrows to navigate command history.</div>
            </div>
        </div>
    );
}
