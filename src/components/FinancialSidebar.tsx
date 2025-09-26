import { Settings, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/useAuth";
import { CurrencySelector } from "./CurrencySelector";
import { useState } from "react";

interface FinancialSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewTransaction: () => void;
  onNewInvoice: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
  { id: 'accounts', name: 'Accounts', icon: '🏦' },
  { id: 'transactions', name: 'Transactions', icon: '💸' },
  { id: 'invoices', name: 'Invoices', icon: '📄' },
  { id: 'reports', name: 'Reports', icon: '📈' },
  { id: 'budget', name: 'Budget', icon: '🎯' }
];

export function FinancialSidebar({ activeTab, onTabChange, onNewTransaction, onNewInvoice, isMobileMenuOpen, setIsMobileMenuOpen }: FinancialSidebarProps) {
  const { signOut, user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleMenuItemClick = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  const handleActionClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false); // Close mobile menu after action
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-card border-r border-border shadow-elevated z-50 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:translate-x-0 md:w-16 lg:w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                  <h1 className="font-bold text-foreground">Smart GnuCash</h1>
                  <p className="text-xs text-muted-foreground">Web Portal</p>
                </div>
              </div>
              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 px-3 ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>{item.name}</span>
              </Button>
            ))}

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border space-y-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-xs"
                onClick={() => handleActionClick(onNewTransaction)}
              >
                <span>➕</span>
                <span className={`${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>New Transaction</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-xs"
                onClick={() => handleActionClick(onNewInvoice)}
              >
                <span>📄</span>
                <span className={`${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>New Invoice</span>
              </Button>
            </div>
          </nav>

          {/* Footer */}
          <div className="mt-auto p-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm text-muted-foreground ${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>Currency</span>
              <CurrencySelector />
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm text-muted-foreground ${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>Theme</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hover:bg-muted"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
            <div className={`mb-2 text-xs text-muted-foreground truncate ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              {user?.email}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className={`${isMobileMenuOpen ? 'inline' : 'hidden lg:inline'}`}>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}