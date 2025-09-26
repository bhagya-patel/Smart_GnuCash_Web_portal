import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: { category: string; limit: number; color: string }) => void;
}

const budgetCategories = [
  'Housing', 'Transportation', 'Food & Dining', 'Shopping', 'Entertainment',
  'Healthcare', 'Education', 'Utilities', 'Insurance', 'Savings', 'Other'
];

const budgetColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export function BudgetModal({ isOpen, onClose, onSave }: BudgetModalProps) {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [selectedColor, setSelectedColor] = useState(budgetColors[0]);
  const { selectedCurrency } = useCurrency();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && limit) {
      onSave({
        category,
        limit: parseFloat(limit),
        color: selectedColor
      });
      setCategory('');
      setLimit('');
      setSelectedColor(budgetColors[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">New Budget Category</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground font-medium">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                {budgetCategories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="hover:bg-muted">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit" className="text-foreground font-medium">
              Monthly Limit ({selectedCurrency.symbol})
            </Label>
            <Input
              id="limit"
              type="number"
              min="0"
              step="0.01"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="Enter budget limit"
              className="bg-background border-border text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Color</Label>
            <div className="flex flex-wrap gap-2">
              {budgetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color ? 'border-foreground scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Create Budget
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}