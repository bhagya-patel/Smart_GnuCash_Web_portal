import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryMappings, mockAccounts } from "@/data/mockData";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

const categories = [
  "Food & Drink",
  "Transportation", 
  "Shopping",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Salary",
  "Investment",
  "Other"
];

export function TransactionModal({ isOpen, onClose, onSave }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    account: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  // AI Category Suggestion
  useEffect(() => {
    if (formData.description && !formData.category) {
      const lowerDesc = formData.description.toLowerCase();
      for (const [keyword, category] of Object.entries(categoryMappings)) {
        if (lowerDesc.includes(keyword)) {
          setFormData(prev => ({ ...prev, category }));
          break;
        }
      }
    }
  }, [formData.description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
      type: parseFloat(formData.amount) > 0 ? 'income' : 'expense'
    });
    setFormData({
      description: "",
      amount: "",
      category: "",
      account: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Transaction</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Starbucks Coffee"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.category && formData.description && (
              <p className="text-xs text-primary">✨ AI suggested this category</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select value={formData.account} onValueChange={(value) => setFormData({ ...formData, account: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {mockAccounts.map(account => (
                  <SelectItem key={account.id} value={account.name}>{account.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:bg-primary-hover">
              Save Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}