import Taskbar from "./taskbar";
import DesktopProvider from "./desktop-provider";

const Desktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`relative flex flex-col h-screen overflow-hidden`}>
      <DesktopProvider>{children}</DesktopProvider>
      <Taskbar />
    </main>
  );
};

export default Desktop;
