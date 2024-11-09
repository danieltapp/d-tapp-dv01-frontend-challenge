import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
            }`}
            aria-hidden={theme === "dark" ? "true" : "false"} // Hide sun icon when dark theme is active
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            }`}
            aria-hidden={theme === "light" ? "true" : "false"} // Hide moon icon when light theme is active
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Theme options">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
