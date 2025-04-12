import { useState } from "react";
import { Home, MessageSquare, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "New Chat", icon: Plus },
  { name: "Conversations", icon: MessageSquare },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("New Chat");

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-muted border-r border-border text-muted-foreground flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-border text-lg font-semibold">
        cold mailer.ai
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-sm",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border text-xs text-muted-foreground">
        <span className="block">Logged in as</span>
        <span className="text-sm font-medium">you@example.com</span>
      </div>
    </aside>
  );
}
