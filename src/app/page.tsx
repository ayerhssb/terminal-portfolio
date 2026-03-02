import { TerminalWindow } from "../components/TerminalWindow";
import { TerminalProvider } from "../components/TerminalProvider";

export default function Home() {
  return (
    <main className="w-full h-full flex items-center justify-center relative">
      {/* Background container if you want an image later. Right now dark theme handled by globals.css */}
      <TerminalWindow>
        <TerminalProvider />
      </TerminalWindow>
    </main>
  );
}
