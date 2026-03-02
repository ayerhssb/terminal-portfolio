export function SkillsCommand() {
    const skills = [
        { category: "Frontend", items: "React, TypeScript, Tailwind CSS, Next.js, Redux, Framer Motion" },
        { category: "Backend", items: "Node.js, Express, PostgreSQL, MongoDB, REST APIs, FastAPI, Django, Flask" },
        { category: "Languages", items: "C++, Python, JavaScript, C, HTML, CSS" },
        { category: "Machine_Learning", items: "NumPy, Pandas, OpenCV, Scikit-learn, TensorFlow, Feature Engineering, Neural Networks" },
        { category: "Tools", items: "Git, Github, Docker, WebSocket, Kubernetes, Figma, CI/CD, Firebase, Redis" },
    ];

    return (
        <div className="flex flex-col space-y-2 mt-1">
            {skills.map(skill => (
                <div key={skill.category} className="flex flex-col sm:flex-row">
                    <span className="text-[#22d3ee] font-bold inline-block w-40 shrink-0">{skill.category}:</span>
                    <span className="text-gray-300">{skill.items}</span>
                </div>
            ))}
        </div>
    );
}
