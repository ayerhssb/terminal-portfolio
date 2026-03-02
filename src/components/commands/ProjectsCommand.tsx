export function ProjectsCommand({ specificProject }: { specificProject?: string }) {
    if (!specificProject) {
        return (
            <div className="mt-2 space-y-2">
                <div className="text-[#4ade80] font-bold">Projects:</div>
                <ol className="list-decimal list-inside ml-2 sm:ml-4 text-gray-300 space-y-1">
                    <li>Canvas - Whiteboard Collaboration App</li>
                    <li>CodeHelper - Chrome Extension</li>
                    <li>Cold Email And Resume Automation Platform</li>
                </ol>
                <div className="text-gray-400 mt-4">
                    Type <span className="text-[#22d3ee]">project [number]</span> to see detailed information about a project (e.g. <span className="text-[#22d3ee]">project 1</span>).
                </div>
            </div>
        );
    }

    const num = specificProject.replace("project", "").trim();

    const projectsData: Record<string, any> = {
        "1": {
            name: "Canvas - Whiteboard Collaboration App",
            desc: "Multi-user collaborative whiteboard focused on real-time interaction.",
            stack: "Next.js, TypeScript, Tailwind CSS, Websocket.",
            links: ["[Code]", "[Live Demo]"]
        },
        "2": {
            name: "CodeHelper - Chrome Extension",
            desc: "Context-aware Chrome extension for Leetcode providing step-wise hints using Gemini LLM.",
            stack: "JavaScript, Node.js, Express, Gemini LLM.",
            links: ["[Code]", "[Live Demo]"]
        },
        "3": {
            name: "Cold Email And Resume Automation Platform",
            desc: "Automated email outreach platform using Llama 3.1 on Groq Cloud with LangChain pipelines.",
            stack: "Llama 3.1, Groq Cloud, LangChain, Gmail API.",
            links: ["[Code]", "[Live Demo]"]
        }
    };

    const project = projectsData[num];

    if (!project) {
        return <div className="text-red-400 mt-2">Project '{num}' not found. Try 'project 1', 'project 2', or 'project 3'.</div>;
    }

    return (
        <div className="mt-4 space-y-2 bg-[#1a1a1a] p-4 rounded border border-gray-700 w-full sm:w-[90%] md:w-[80%]">
            <div className="text-[#4ade80] font-bold text-lg">{project.name}</div>
            <div className="mt-2 flex flex-col sm:flex-row">
                <span className="text-[#22d3ee] font-bold w-20 shrink-0">Desc:</span>
                <span className="text-gray-300">{project.desc}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
                <span className="text-[#22d3ee] font-bold w-20 shrink-0">Stack:</span>
                <span className="text-gray-300">{project.stack}</span>
            </div>
            <div className="flex flex-col sm:flex-row mt-2">
                <span className="text-[#22d3ee] font-bold w-20 shrink-0">Links:</span>
                <div className="flex space-x-4">
                    {project.links.map((link: string, i: number) => (
                        <a key={i} href="#" className="text-[#4ade80] hover:text-white underline transition-colors">{link}</a>
                    ))}
                </div>
            </div>
        </div>
    );
}
