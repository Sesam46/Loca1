import { Link, useLocation } from "wouter";
import { Home, ShoppingBag, Briefcase, FileQuestion } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: ShoppingBag },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/requests", label: "Requests", icon: FileQuestion },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location === item.href || (location === "/" && item.href === "/") ? location === item.href : location.startsWith(item.href) && item.href !== "/";
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={`
                  flex flex-col items-center justify-center w-16 h-full cursor-pointer tap-active
                  transition-colors duration-200
                  ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "fill-primary/20" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
