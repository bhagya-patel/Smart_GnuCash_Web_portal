import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/hooks/use-theme";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { TransactionProvider, useTransactions } from "@/contexts/TransactionContext";
import { InvoiceProvider } from "@/contexts/InvoiceContext";
import { ReportProvider } from "@/contexts/ReportContext";
import { AccountProvider } from "@/contexts/AccountContext";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Auth from "@/components/Auth";
import { FinancialSidebar } from "./components/FinancialSidebar";
import { MobileHeader } from "./components/MobileHeader";
import { FloatingChatbotButton } from "./components/FloatingChatbotButton";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { Dashboard } from "./components/Dashboard";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";
import { Reports } from "./components/Reports";
import { Budget } from "./components/Budget";
import { Invoices } from "./components/Invoices";
import { TransactionModal } from "./components/TransactionModal";
import { AccountModal } from "./components/AccountModal";

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { user, loading } = useAuth();
  const { addTransaction } = useTransactions();

  const getPageTitle = (tab: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      accounts: 'Accounts',
      transactions: 'Transactions',
      invoices: 'Invoices',
      reports: 'Reports',
      budget: 'Budget'
    };
    return titles[tab] || 'Dashboard';
  };

  const handleSaveTransaction = (transactionData: any) => {
    addTransaction({
      date: transactionData.date,
      description: transactionData.description,
      category: transactionData.category,
      amount: transactionData.amount,
      type: transactionData.amount > 0 ? 'income' : 'expense',
      account: transactionData.account
    });
    setIsTransactionModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNewTransaction={() => setIsTransactionModalOpen(true)} />;
      case 'accounts':
        return <Accounts onNewAccount={() => setIsAccountModalOpen(true)} />;
      case 'transactions':
        return <Transactions onNewTransaction={() => setIsTransactionModalOpen(true)} />;
      case 'invoices':
        return <Invoices />;
      case 'reports':
        return <Reports />;
      case 'budget':
        return <Budget />;
      default:
        return <Dashboard onNewTransaction={() => setIsTransactionModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileHeader 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        title={getPageTitle(activeTab)}
      />
      
      <div className="flex">
        <FinancialSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onNewTransaction={() => setIsTransactionModalOpen(true)}
          onNewInvoice={() => {}} // Not needed since invoices are handled in the Invoices component
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="flex-1 md:ml-16 lg:ml-64 pt-14 md:pt-0">
          <div className="p-4 md:p-6">
            {renderActiveComponent()}
          </div>
        </main>
      </div>
      
      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSave={handleSaveTransaction}
      />
      
      <AccountModal 
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onSave={() => setIsAccountModalOpen(false)}
      />

      {/* Floating Chatbot Button - Always visible */}
      <FloatingChatbotButton onClick={() => setIsChatbotOpen(true)} />
      
      {/* Chatbot Widget */}
      <ChatbotWidget 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
      
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <CurrencyProvider>
          <AccountProvider>
            <TransactionProvider>
              <InvoiceProvider>
                <ReportProvider>
                  <MainApp />
                </ReportProvider>
              </InvoiceProvider>
            </TransactionProvider>
          </AccountProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;