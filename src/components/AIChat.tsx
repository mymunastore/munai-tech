import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, X, Send, Sparkles, RotateCcw, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import ReactMarkdown from "react-markdown";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "👋 Hi! I'm MunAiTech's AI assistant. Ask me anything about our **services**, **capabilities**, **projects**, or **expertise**.\n\nFor project inquiries, use the **Contact** page on our website."
};

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setRetryMessage(null);

    try {
      const conversationHistory = messages
        .filter(m => !m.error)
        .map(m => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [...conversationHistory, { role: 'user', content: content.trim() }],
        }
      });

      if (error) throw error;

      if (data?.response) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error('No response received');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg = error?.message?.includes('429')
        ? "I'm getting too many requests right now. Please wait a moment and try again."
        : "Sorry, I couldn't process that. Please try again.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg, error: true }]);
      setRetryMessage(content);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSend = () => sendMessage(input);

  const handleRetry = () => {
    if (retryMessage) {
      setMessages(prev => prev.filter(m => !m.error));
      sendMessage(retryMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setRetryMessage(null);
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50 animate-pulse hover:animate-none"
          size="icon"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[90vw] max-w-[400px] h-[70vh] max-h-[600px] shadow-2xl z-50 flex flex-col border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b bg-primary/5">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              MunAiTech Assistant
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={handleClearChat} title="Clear chat" className="h-8 w-8">
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : msg.error
                            ? 'bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-md'
                            : 'bg-muted rounded-bl-md'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {retryMessage && !isLoading && (
              <div className="px-4 py-2 border-t bg-muted/30">
                <Button variant="outline" size="sm" onClick={handleRetry} className="w-full text-xs gap-1.5">
                  <RotateCcw className="h-3 w-3" />
                  Retry last message
                </Button>
              </div>
            )}

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  className="flex-1 rounded-full text-sm"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="rounded-full shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <a 
                  href="/contact" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  Contact Us
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
