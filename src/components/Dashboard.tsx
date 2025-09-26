import { Plus, TrendingUp, TrendingDown, TriangleAlert as AlertTriangle, X, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { mockTransactions, mockAccounts, monthlyData, expenseByCategory, aiInsights } from "@/data/mockData";
import { useState, useMemo } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTransactions } from "@/contexts/TransactionContext";

interface DashboardProps {
  onNewTransaction: () => void;
}

export function Dashboard({ onNewTransaction }: DashboardProps) {
  const [showAnomaly, setShowAnomaly] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { formatAmount } = useCurrency();
  const { transactions } = useTransactions();
  
  // Combine dynamic transactions with mock data, with dynamic ones first
  const allTransactions = useMemo(() => {
    return [...transactions, ...mockTransactions];
  }, [transactions]);
  
  // Calculate summary stats
  const totalAssets = mockAccounts
    .filter(acc => acc.type !== 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0);
  
  const totalLiabilities = Math.abs(mockAccounts
    .filter(acc => acc.type === 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0));
  
  const netWorth = totalAssets - totalLiabilities;
  
  const currentMonth = monthlyData[monthlyData.length - 1];
  const ytdProfit = monthlyData.reduce((sum, month) => sum + (month.income - month.expense), 0);

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-foreground">Welcome Back, User!</h1>
          <p className="text-muted-foreground text-sm md:text-base">Here's your financial overview</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-background/50 border-primary/20 hover:bg-primary/5 flex-1 sm:flex-none"
            onClick={() => setIsChatbotOpen(true)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="sm:hidden">AI</span>
          </Button>
          <Button onClick={onNewTransaction} className="bg-gradient-primary hover:bg-primary-hover flex-1 sm:flex-none">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">New Transaction</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* AI Anomaly Alert */}
      {showAnomaly && (
        <Alert className="border-warning bg-warning-light">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="flex justify-between items-center">
            <span className="text-warning dark:text-warning-foreground">{aiInsights.anomaly.message}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAnomaly(false)}
              className="hover:bg-warning/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-gradient-surface shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <TrendingUp className="h-4 w-4 text-success flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-foreground break-words">
              {formatAmount(netWorth)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-foreground break-words">
              {formatAmount(totalAssets)}
            </div>
            <p className="text-xs text-muted-foreground">
              +8.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Liabilities</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-foreground break-words">
              {formatAmount(totalLiabilities)}
            </div>
            <p className="text-xs text-muted-foreground">
              -2.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Profit/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-success flex-shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-success break-words">
              +{formatAmount(ytdProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.2% vs last year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <Card className="shadow-card">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Monthly Income vs Expense</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="income" fill="hsl(var(--success))" name="Income" />
                <Bar dataKey="expense" fill="hsl(var(--destructive))" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Expense by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={window.innerWidth < 768 ? 60 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Budget Forecast */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            AI Budget Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{aiInsights.budgetForecast}</p>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-card">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-3 md:space-y-4">
            {allTransactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-medium text-foreground text-sm md:text-base truncate">{transaction.description}</span>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    <Badge variant="secondary" className="text-xs">{transaction.category}</Badge>
                  </div>
                </div>
                <div className={`font-semibold text-sm md:text-base flex-shrink-0 ml-2 text-right ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatAmount(Math.abs(Number(transaction.amount)))}
                </div>
              </div>
            ))}
            {allTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm md:text-base">No transactions yet</p>
                <p className="text-xs md:text-sm">Add your first transaction to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chatbot Widget */}
      <ChatbotWidget 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}