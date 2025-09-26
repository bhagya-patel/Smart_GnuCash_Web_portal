import { FileText, TrendingUp, DollarSign, PieChart, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useReports } from "@/contexts/ReportContext";

interface ReportsProps {}

const reportTypes = [
  {
    id: 'balance-sheet',
    title: 'Balance Sheet',
    description: 'Assets, liabilities, and equity at a point in time',
    icon: DollarSign,
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss',
    description: 'Income and expenses over a period',
    icon: TrendingUp,
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow Statement',
    description: 'Cash inflows and outflows',
    icon: PieChart,
  },
];

export function Reports({}: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { reports, addReport, removeReport } = useReports();

  const generateReport = (reportId: string) => {
    setSelectedReport(reportId);
  };

  const closeReport = () => {
    setSelectedReport(null);
  };

  const handlePrintReport = () => {
    if (selectedReport) {
      const reportType = reportTypes.find(r => r.id === selectedReport);
      if (reportType) {
        addReport({
          type: selectedReport as any,
          title: reportType.title,
          data: {} // You can add actual report data here
        });
      }
    }
    closeReport();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate financial reports and statements</p>
      </div>

      {/* Generated Reports */}
      {reports.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Generated Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => {
              const reportType = reportTypes.find(r => r.id === report.type);
              const Icon = reportType?.icon || FileText;
              
              return (
                <Card key={report.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-medium text-foreground">{report.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {report.id}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeReport(report.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Report Types */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          
          return (
            <Card key={report.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => generateReport(report.id)}
                  className="w-full bg-gradient-primary hover:bg-primary-hover"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-card-foreground">
                {reportTypes.find(r => r.id === selectedReport)?.title} Report
              </h2>
              <Button variant="ghost" size="sm" onClick={closeReport}>
                ×
              </Button>
            </div>

            <div className="p-6">
              {selectedReport === 'balance-sheet' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Smart GnuCash</h3>
                    <p className="text-muted-foreground">Balance Sheet</p>
                    <p className="text-sm text-muted-foreground">As of January 15, 2024</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-foreground">Assets</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Current Assets:</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Primary Checking</span>
                          <span>$8,500</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>High Yield Savings</span>
                          <span>$25,000</span>
                        </div>
                        <div className="flex justify-between pl-4 border-t border-border pt-2">
                          <span className="font-medium">Total Current Assets</span>
                          <span className="font-medium">$33,500</span>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <span>Investment Assets:</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Investment Portfolio</span>
                          <span>$45,000</span>
                        </div>
                        <div className="flex justify-between pl-4 border-t border-border pt-2">
                          <span className="font-medium">Total Investment Assets</span>
                          <span className="font-medium">$45,000</span>
                        </div>
                        
                        <div className="flex justify-between pt-4 border-t border-border font-bold text-lg">
                          <span>TOTAL ASSETS</span>
                          <span>$78,500</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-foreground">Liabilities & Equity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Current Liabilities:</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Visa Credit Card</span>
                          <span>$1,250</span>
                        </div>
                        <div className="flex justify-between pl-4 border-t border-border pt-2">
                          <span className="font-medium">Total Liabilities</span>
                          <span className="font-medium">$1,250</span>
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <span>Owner's Equity:</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Net Worth</span>
                          <span>$77,250</span>
                        </div>
                        <div className="flex justify-between pl-4 border-t border-border pt-2">
                          <span className="font-medium">Total Equity</span>
                          <span className="font-medium">$77,250</span>
                        </div>
                        
                        <div className="flex justify-between pt-4 border-t border-border font-bold text-lg">
                          <span>TOTAL LIABILITIES & EQUITY</span>
                          <span>$78,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'profit-loss' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Smart GnuCash</h3>
                    <p className="text-muted-foreground">Profit & Loss Statement</p>
                    <p className="text-sm text-muted-foreground">January 1 - January 15, 2024</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-success">Income</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between pl-4">
                          <span>Salary</span>
                          <span>$5,000</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Total Income</span>
                          <span className="text-success">$5,000</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-destructive">Expenses</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between pl-4">
                          <span>Food & Drink</span>
                          <span>$162.50</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Utilities</span>
                          <span>$120.00</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span>Shopping</span>
                          <span>$89.99</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Total Expenses</span>
                          <span className="text-destructive">$372.49</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>NET INCOME</span>
                        <span className="text-success">$4,627.51</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'cash-flow' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Smart GnuCash</h3>
                    <p className="text-muted-foreground">Cash Flow Statement</p>
                    <p className="text-sm text-muted-foreground">January 1 - January 15, 2024</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Operating Activities</h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex justify-between">
                          <span>Net Income</span>
                          <span>$4,627.51</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Net Cash from Operating Activities</span>
                          <span>$4,627.51</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Investing Activities</h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex justify-between">
                          <span>No investing activities</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Net Cash from Investing Activities</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Financing Activities</h4>
                      <div className="space-y-2 pl-4">
                        <div className="flex justify-between">
                          <span>No financing activities</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-2 font-medium">
                          <span>Net Cash from Financing Activities</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>NET INCREASE IN CASH</span>
                        <span className="text-success">$4,627.51</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button variant="outline" onClick={closeReport}>
                  Close
                </Button>
                <Button 
                  className="bg-gradient-primary hover:bg-primary-hover"
                  onClick={handlePrintReport}
                >
                  Save Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}