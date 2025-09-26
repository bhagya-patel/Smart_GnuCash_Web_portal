import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  dueDate: string;
  template: string;
  createdAt: string;
  status: 'draft' | 'sent' | 'paid';
}

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'status'>) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'status'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => 
      prev.map(invoice => invoice.id === id ? { ...invoice, status } : invoice)
    );
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      addInvoice,
      updateInvoiceStatus
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}