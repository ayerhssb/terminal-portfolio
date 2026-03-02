import React from "react";
import { HelpCommand } from "@/components/commands/HelpCommand";
import { AboutCommand } from "@/components/commands/AboutCommand";
import { SkillsCommand } from "@/components/commands/SkillsCommand";
import { ExperienceCommand } from "@/components/commands/ExperienceCommand";
import { EducationCommand } from "@/components/commands/EducationCommand";
import { ProjectsCommand } from "@/components/commands/ProjectsCommand";
import { ResumeCommand } from "@/components/commands/ResumeCommand";
import { ContactCommand } from "@/components/commands/ContactCommand";
import { GameCommand } from "@/components/commands/GameCommand";

export function executeCommand(
    cmd: string,
    { pushHistory, clearHistory, setIsTyping }:
        { pushHistory: Function, clearHistory: Function, setIsTyping: Function }
) {
    const lowerCmd = cmd.toLowerCase().trim();

    if (lowerCmd === "clear") {
        clearHistory();
        return;
    }

    if (lowerCmd.startsWith("project ")) {
        pushHistory({ command: cmd, output: <ProjectsCommand specificProject={lowerCmd} /> });
        return;
    }

    let output: React.ReactNode = null;
    let isInteractive = false;

    switch (lowerCmd) {
        case "help":
            output = <HelpCommand />;
            break;
        case "about":
            isInteractive = true;
            output = <AboutCommand onComplete={() => setIsTyping(false)} />;
            break;
        case "skills":
            output = <SkillsCommand />;
            break;
        case "experience":
            output = <ExperienceCommand />;
            break;
        case "education":
            output = <EducationCommand />;
            break;
        case "resume":
            output = <ResumeCommand />;
            break;
        case "projects":
            output = <ProjectsCommand />;
            break;
        case "contact":
            isInteractive = true;
            output = <ContactCommand onComplete={() => setIsTyping(false)} />;
            break;
        case "game":
            isInteractive = true;
            output = <GameCommand onComplete={() => setIsTyping(false)} />;
            break;
        default:
            output = (
                <div className="text-red-400">
                    Command not found: '{cmd}'
                </div>
            );
    }

    if (isInteractive) {
        setIsTyping(true);
    }
    pushHistory({ command: cmd, output });
}
