import { useState } from 'react';
import { X, Wallet, PiggyBank, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAccounts } from '@/contexts/AccountContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (accountData: {
    name: string;
    type: 'checking' | 'savings' | 'credit' | 'investment';
    balance: number;
    currency: string;
  }) => void;
}

const accountTypes = [
  { id: 'checking', name: 'Checking Account', icon: Wallet },
  { id: 'savings', name: 'Savings Account', icon: PiggyBank },
  { id: 'credit', name: 'Credit Card', icon: CreditCard },
  { id: 'investment', name: 'Investment Account', icon: TrendingUp },
] as const;

export function AccountModal({ isOpen, onClose, onSave }: AccountModalProps) {
  const { selectedCurrency } = useCurrency();
  const { addAccount } = useAccounts();
  const [formData, setFormData] = useState({
    name: '',
    type: '' as 'checking' | 'savings' | 'credit' | 'investment',
    balance: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.balance) return;

    const accountData = {
      name: formData.name,
      type: formData.type,
      balance: parseFloat(formData.balance),
      currency: selectedCurrency.code,
    };

    addAccount(accountData);
    onSave(accountData);
    setFormData({ name: '', type: '' as any, balance: '' });
    onClose();
  };

  const selectedType = accountTypes.find(type => type.id === formData.type);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Add New Account</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName" className="text-foreground font-medium">
              Account Name
            </Label>
            <Input
              id="accountName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter account name"
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Account Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance" className="text-foreground font-medium">
              Initial Balance ({selectedCurrency.symbol})
            </Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              placeholder="Enter initial balance"
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          {selectedType && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <selectedType.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{selectedType.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.type === 'credit' 
                  ? 'Credit balances will show as negative values' 
                  : 'This account will be added to your assets'}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Add Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}