import { Share2, Twitter, Linkedin, Facebook, Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-[#1DA1F2]"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-[#0077B5]"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-[#1877F2]"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground flex items-center gap-1">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      {shareLinks.map((social) => (
        <Button
          key={social.name}
          variant="ghost"
          size="sm"
          className={`transition-colors ${social.color}`}
          asChild
        >
          <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${social.name}`}>
            <social.icon className="w-4 h-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        className="hover:text-primary"
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SocialShare;
