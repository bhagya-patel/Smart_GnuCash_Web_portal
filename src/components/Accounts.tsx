import { Plus, CreditCard, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAccounts } from "@/contexts/AccountContext";

interface AccountsProps {
  onNewAccount: () => void;
}

const accountIcons = {
  checking: Wallet,
  savings: PiggyBank,
  credit: CreditCard,
  investment: TrendingUp,
};

export function Accounts({ onNewAccount }: AccountsProps) {
  const { accounts } = useAccounts();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage your financial accounts</p>
        </div>
        <Button onClick={onNewAccount} className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add New Account
        </Button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = accountIcons[account.type];
          const isNegative = account.balance < 0;
          
          return (
            <Card key={account.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`text-2xl font-bold ${isNegative ? 'text-destructive' : 'text-foreground'}`}>
                    {isNegative ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className="text-xs capitalize"
                    >
                      {account.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{account.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Account Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                ${accounts
                  .filter(acc => acc.type !== 'credit' && acc.balance > 0)
                  .reduce((sum, acc) => sum + acc.balance, 0)
                  .toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Assets</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                ${Math.abs(accounts
                  .filter(acc => acc.balance < 0)
                  .reduce((sum, acc) => sum + acc.balance, 0))
                  .toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Liabilities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${accounts
                  .reduce((sum, acc) => sum + (acc.type === 'credit' ? 0 : acc.balance), 0)
                  .toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Net Worth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}