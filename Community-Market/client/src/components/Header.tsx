import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  onSearch?: (term: string) => void;
  action?: React.ReactNode;
}

export function Header({ title, showSearch = true, onSearch, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">{title}</h1>
          {action}
        </div>
        
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${title.toLowerCase()}...`}
              className="pl-10 bg-slate-50 border-slate-200 placeholder:text-muted-foreground focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all rounded-2xl text-sm"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}
      </div>
    </header>
  );
}
