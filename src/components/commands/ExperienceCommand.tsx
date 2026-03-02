export function ExperienceCommand() {
    return (
        <div className="flex flex-col space-y-4 mt-2">
            <div className="relative pl-4 border-l-2 border-gray-600 space-y-1">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
                <div className="font-bold text-[#22d3ee] text-base sm:text-lg">Software Development Engineer Intern @ Snello</div>
                <div className="text-sm text-gray-400">Oct 2025 - Present</div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 mt-2">
                    <li>Improved Google Ads analytics query performance by 40% by redesigning database schemas.</li>
                    <li>Lowered chat/tool response latency from 15s to ~3s via Gemini & OpenAI orchestration.</li>
                    <li>Migrated 45+ MCP server tools to Pydantic schemas.</li>
                    <li>Built Supabase cron pipelines for scheduled alerts.</li>
                </ul>
            </div>

            <div className="relative pl-4 border-l-2 border-gray-600 space-y-1">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-500" />
                <div className="font-bold text-[#22d3ee] text-base sm:text-lg">Software Developer Intern @ ButterCut AI</div>
                <div className="text-sm text-gray-400">May 2025 - Jul 2025</div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 mt-2">
                    <li>Built end-to-end captioning pipeline using Silero VAD, SarvamAI & Whisper.</li>
                    <li>Reduced video processing time from 2 mins to 0.5 mins via FastAPI async optimization.</li>
                    <li>Lowered memory load by 40% (MoviePy to FFmpeg shift).</li>
                    <li>Increased Instagram account linking by 70% by redesigning UX in Bubble.io.</li>
                </ul>
            </div>

            <div className="relative pl-4 border-l-2 border-gray-600 space-y-1">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-500" />
                <div className="font-bold text-[#22d3ee] text-base sm:text-lg">Full Stack Developer Intern @ Bharat MedTech</div>
                <div className="text-sm text-gray-400">Mar 2025 - Jun 2025</div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 mt-2">
                    <li>Architected scalable backend (Node.js/MySQL), reducing table redundancy by 35%.</li>
                    <li>Created role-based admin dashboard in React.js with OAuth.</li>
                    <li>Led backend support for first client onboarding.</li>
                </ul>
            </div>

            <div className="relative pl-4 border-l-2 border-transparent space-y-1 pb-4">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-500" />
                <div className="font-bold text-[#22d3ee] text-base sm:text-lg">UI/UX Design Intern @ Urja Talents</div>
                <div className="text-sm text-gray-400">Jul 2023 - Aug 2023</div>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-300 space-y-1 mt-2">
                    <li>Designed 10+ admin dashboards in Figma.</li>
                    <li>Reduced user navigation complaints by 30%.</li>
                </ul>
            </div>
        </div>
    );
}
