import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingChatbotButtonProps {
  onClick: () => void;
}

export function FloatingChatbotButton({ onClick }: FloatingChatbotButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-gradient-primary hover:bg-primary-hover shadow-elevated hover:shadow-card transition-all duration-300 hover:scale-105"
      size="icon"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
}