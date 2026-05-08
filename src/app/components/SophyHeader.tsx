import { Instagram, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { SophyLogo } from "./SophyLogo";
import { useSettings } from "../contexts/SettingsContext";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.05 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 5.83 2.41 8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42-.14-.01-.31-.01-.47-.01a.9.9 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );
}

interface Props {
  onAdminClick: () => void;
  onHomeClick?: () => void;
}

export function SophyHeader({ onAdminClick, onHomeClick }: Props) {
  const settings = useSettings();
  const instagramUrl = `https://instagram.com/${settings.instagram_handle}`;
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/85 backdrop-blur-md border-b border-[#ecb4bc]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        <button onClick={onHomeClick} className="flex items-center">
          <SophyLogo />
        </button>

        {/* Center menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#3a2129]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick?.();
            }}
            className="hover:text-[#cf4e71] transition-colors"
          >
            Vitrine
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-[#cf4e71] transition-colors"
          >
            <Instagram className="h-4 w-4" />
            @{settings.instagram_handle}
          </a>
          <button
            onClick={onAdminClick}
            className="flex items-center gap-1 text-[#dc8494] hover:text-[#cf4e71] transition-colors"
          >
            <Lock className="h-3.5 w-3.5" />
            Admin
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onAdminClick}
            className="md:hidden text-[#dc8494] hover:text-[#cf4e71] hover:bg-[#fbe9ed]"
            aria-label="Admin"
          >
            <Lock className="h-4 w-4" />
          </Button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#cf4e71] hover:bg-[#b8425f] text-white rounded-full px-4 sm:px-5 h-11 shadow-md shadow-[#cf4e71]/25 transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">+{settings.whatsapp_number}</span>
            <span className="sm:hidden text-sm">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export { WhatsAppIcon };
