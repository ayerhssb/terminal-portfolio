export function EducationCommand() {
    return (
        <div className="mt-2 space-y-4">
            <div>
                <div className="text-[#4ade80] font-bold">Indian Institute of Technology Kharagpur</div>
                <div className="text-[#22d3ee] flex justify-between w-full max-w-2xl">
                    <span>Integrated Dual Degree in Chemical Engineering</span>
                    <span className="text-gray-400">Nov 2022 – May 2027</span>
                </div>
                <div className="text-gray-300 ml-4 max-w-2xl">
                    <span className="text-[#22d3ee] mr-2">↳</span>
                    Micro Specialization in Artificial Intelligence and Applications
                </div>
                <div className="text-gray-500 text-sm mt-1">West Bengal, India</div>
            </div>

            <div>
                <div className="text-[#4ade80] font-bold">DAV Public School Bariatu</div>
                <div className="flex justify-between w-full max-w-2xl text-gray-300">
                    <span>AISSCE (CBSE Class XII)</span>
                    <span className="text-gray-400">April 2019 – May 2021</span>
                </div>
                <div className="flex justify-between w-full max-w-2xl text-gray-300 mt-1">
                    <span>AISSE (CBSE Class X)</span>
                    <span className="text-gray-400">2019</span>
                </div>
                <div className="text-gray-500 text-sm mt-1">Ranchi, Jharkhand</div>
            </div>
        </div>
    );
}
