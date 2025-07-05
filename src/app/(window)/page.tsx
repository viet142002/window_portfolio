import ContentScreen from "@/app/(window)/components/ContentScreen";
import Taskbar from "@/app/(window)/components/Taskbar";

export default function Window() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] grid grid-rows-[1fr_8vh] bg-[url(/images/windows-11-bloom.webp)] bg-center bg-cover">
      <ContentScreen />
      <Taskbar />
    </div>
  );
}
