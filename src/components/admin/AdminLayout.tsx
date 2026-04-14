"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Users,
  BookOpen,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/services", label: "Services", icon: Layers, exact: false },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, exact: false },
  { to: "/admin/users", label: "Users", icon: Users, exact: false },
  { to: "/admin/blog", label: "Blog", icon: BookOpen, exact: false },
];

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.to;
    return pathname.startsWith(item.to);
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <span className="font-bold text-lg text-foreground">rasel.cloud</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive(item)
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            data-testid={`nav-admin-${item.label.toLowerCase()}`}
          >
            <item.icon size={17} />
            {item.label}
            {isActive(item) && <ChevronRight size={13} className="ml-auto opacity-60" />}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border/50 space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-foreground truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          data-testid="button-admin-logout"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border/50 flex-col bg-card/30">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border/50 flex items-center px-6 gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-1.5 rounded text-muted-foreground hover:text-foreground"
                data-testid="button-admin-menu"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-background border-r border-border">
              <SidebarContent onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
