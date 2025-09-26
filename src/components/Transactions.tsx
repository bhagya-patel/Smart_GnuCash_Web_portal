import { Plus, Search, Filter, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions } from "@/data/mockData";
import { useState, useMemo } from "react";
import { useTransactions } from "@/contexts/TransactionContext";

interface TransactionsProps {
  onNewTransaction: () => void;
}

export function Transactions({ onNewTransaction }: TransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const { transactions } = useTransactions();

  // Combine dynamic transactions with mock data
  const allTransactions = useMemo(() => {
    return [...transactions, ...mockTransactions];
  }, [transactions]);

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    const matchesAccount = accountFilter === "all" || transaction.account === accountFilter;
    
    return matchesSearch && matchesCategory && matchesAccount;
  });

  const categories = [...new Set(allTransactions.map(t => t.category))];
  const accounts = [...new Set(allTransactions.map(t => t.account))];

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground text-sm md:text-base">View and manage all your transactions</p>
        </div>
        <Button onClick={onNewTransaction} className="bg-gradient-primary hover:bg-primary-hover w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={accountFilter} onValueChange={setAccountFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map(account => (
                  <SelectItem key={account} value={account}>{account}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List/Table */}
      <Card className="shadow-card">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-5 gap-4 pb-4 border-b border-border font-medium text-muted-foreground">
                <div>Date</div>
                <div>Description</div>
                <div>Category</div>
                <div>Account</div>
                <div className="text-right">Amount</div>
              </div>
              
              {/* Transactions */}
              <div className="space-y-2 mt-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="grid grid-cols-5 gap-4 py-3 border-b border-border hover:bg-muted/50 transition-colors">
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                    <div className="font-medium text-foreground">
                      {transaction.description}
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.account}
                    </div>
                    <div className={`text-right font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(Number(transaction.amount)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground text-sm truncate">{transaction.description}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`font-semibold text-sm flex-shrink-0 ml-2 ${transaction.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(Number(transaction.amount)).toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.account}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm md:text-base">No transactions found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}