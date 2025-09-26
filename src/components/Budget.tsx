import { Plus, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BudgetModal } from "./BudgetModal";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";

export function Budget() {
  const { formatAmount } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    { category: "Housing", limit: 2000, spent: 1850, color: "#3B82F6" },
    { category: "Food & Dining", limit: 600, spent: 420, color: "#10B981" },
    { category: "Transportation", limit: 400, spent: 380, color: "#F59E0B" },
    { category: "Entertainment", limit: 300, spent: 125, color: "#8B5CF6" },
    { category: "Shopping", limit: 500, spent: 650, color: "#EF4444" },
  ]);

  const handleAddBudget = (newBudget: { category: string; limit: number; color: string }) => {
    setBudgets(prev => [...prev, { ...newBudget, spent: 0 }]);
  };

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budget</h1>
          <p className="text-muted-foreground">Track your spending against your budget</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          New Budget Category
        </Button>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground break-all">
              {formatAmount(totalBudgeted)}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly budget allocation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-destructive break-all">
              {formatAmount(totalSpent)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget used
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className={`h-4 w-4 ${totalRemaining >= 0 ? 'text-success' : 'text-destructive'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-lg sm:text-xl lg:text-2xl font-bold break-all ${totalRemaining >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalRemaining >= 0 ? '+' : ''}{formatAmount(Math.abs(totalRemaining))}
            </div>
            <p className="text-xs text-muted-foreground">
              Available to spend
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget, index) => {
              const progressPercentage = Math.min((budget.spent / budget.limit) * 100, 100);
              const isOverBudget = budget.spent > budget.limit;
              const remaining = budget.limit - budget.spent;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{budget.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatAmount(budget.spent)} of {formatAmount(budget.limit)} spent
                      </p>
                    </div>
                    <div className={`text-right ${isOverBudget ? 'text-destructive' : 'text-success'}`}>
                      <p className="font-semibold">
                        {isOverBudget ? '-' : '+'}{formatAmount(Math.abs(remaining))}
                      </p>
                      <p className="text-xs">
                        {isOverBudget ? 'Over budget' : 'Remaining'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{progressPercentage.toFixed(1)}% used</span>
                      <span>{isOverBudget ? 'Over by' : 'Within'} budget</span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : '[&>div]:bg-success'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Budget Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="border-warning bg-warning-light">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning dark:text-warning-foreground">
                ⚠️ You're projected to be $50 over your 'Shopping' budget this month based on current spending patterns.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-success bg-success-light">
              <AlertTriangle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success dark:text-success-foreground">
                ✅ Great job! You're under budget in 4 out of 5 categories this month.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-primary bg-primary-light">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary dark:text-primary-foreground">
                💡 Consider reallocating $80 from 'Utilities' to 'Shopping' to balance your budget better.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
      
      <BudgetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBudget}
      />
    </div>
  );
}