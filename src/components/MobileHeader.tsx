import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function MobileHeader({ onMenuClick, title }: MobileHeaderProps) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border shadow-card z-30 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-foreground">{title}</h1>
      </div>
      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
        SC
      </div>
    </header>
  );
}