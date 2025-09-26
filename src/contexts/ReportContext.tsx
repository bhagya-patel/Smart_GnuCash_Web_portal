import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Report {
  id: string;
  type: 'balance-sheet' | 'profit-loss' | 'cash-flow';
  title: string;
  generatedAt: string;
  data: any; // Report-specific data
}

interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'generatedAt'>) => void;
  removeReport: (id: string) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  const addReport = (reportData: Omit<Report, 'id' | 'generatedAt'>) => {
    const newReport: Report = {
      ...reportData,
      id: `RPT-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);
  };

  const removeReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  return (
    <ReportContext.Provider value={{
      reports,
      addReport,
      removeReport
    }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
}