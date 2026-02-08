import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ExternalLink } from "lucide-react";

interface UserProfileLinkProps {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  className?: string;
  avatarClassName?: string;
  showDropdown?: boolean;
}

export function UserProfileLink({
  userId,
  displayName,
  avatarUrl,
  className = "",
  avatarClassName = "h-8 w-8",
  showDropdown = true,
}: UserProfileLinkProps) {
  const profileUrl = displayName ? `/u/${encodeURIComponent(displayName)}` : null;

  const avatar = (
    <Avatar className={`${avatarClassName} cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all`}>
      <AvatarImage src={avatarUrl || undefined} alt={displayName || "Bruger"} />
      <AvatarFallback>
        <User className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );

  if (!profileUrl) {
    return <div className={className}>{avatar}</div>;
  }

  if (!showDropdown) {
    return (
      <Link to={profileUrl} className={className}>
        {avatar}
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        {avatar}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={profileUrl} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Se profil
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
