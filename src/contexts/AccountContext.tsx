import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockAccounts } from '@/data/mockData';

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  createdAt: string;
}

interface AccountContextType {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  removeAccount: (id: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(
    mockAccounts.map(account => ({ ...account, createdAt: new Date().toISOString() }))
  );

  const addAccount = (accountData: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: `ACC-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAccounts(prev => [newAccount, ...prev]);
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(prev => 
      prev.map(account => account.id === id ? { ...account, ...updates } : account)
    );
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  return (
    <AccountContext.Provider value={{
      accounts,
      addAccount,
      updateAccount,
      removeAccount
    }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
}