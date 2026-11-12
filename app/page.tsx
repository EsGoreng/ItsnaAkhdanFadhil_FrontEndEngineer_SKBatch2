import { RoleExplorer } from "@/components/RoleExplorer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
      <main className="flex-1">
        {/* The Role Explorer Component Container */}
        <div id="explorer">
          <RoleExplorer />
        </div>
      </main>
    </div>
  );
}
