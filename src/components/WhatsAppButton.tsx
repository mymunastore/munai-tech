import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "2347062372521";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello MunAiTech, I'd like to discuss a project.");

export const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20BD5A] z-50 flex items-center justify-center transition-all hover:scale-110 group"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
      <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-background border border-border text-foreground text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
};
