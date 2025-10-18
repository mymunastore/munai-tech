import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          e.preventDefault();
          shortcut.action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);

  const showShortcutsHelp = () => {
    const helpText = shortcuts
      .map(s => {
        const keys = [];
        if (s.ctrl) keys.push("Ctrl");
        if (s.shift) keys.push("Shift");
        if (s.alt) keys.push("Alt");
        keys.push(s.key.toUpperCase());
        return `${keys.join(" + ")}: ${s.description}`;
      })
      .join("\n");

    toast({
      title: "Keyboard Shortcuts",
      description: (
        <pre className="text-xs whitespace-pre-wrap">{helpText}</pre>
      ),
    });
  };

  return { showShortcutsHelp };
};
