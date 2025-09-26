import { useState } from 'react';
import { X, FileText, Calendar, DollarSign, Palette, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCurrency } from '@/contexts/CurrencyContext';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoiceData: any) => void;
}

const invoiceTemplates = [
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    description: 'Clean and corporate design for business use',
    preview: 'Modern layout with company branding space'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Palette,
    description: 'Colorful and modern design for creative services',
    preview: 'Vibrant design with artistic elements'
  }
];

export function InvoiceModal({ isOpen, onClose, onSave }: InvoiceModalProps) {
  const { selectedCurrency } = useCurrency();
  const [step, setStep] = useState(1); // 1: Template Selection, 2: Invoice Details
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    clientEmail: '',
    description: '',
    amount: '',
    dueDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...invoiceData, template: selectedTemplate });
    setStep(1);
    setSelectedTemplate('');
    setInvoiceData({ clientName: '', clientEmail: '', description: '', amount: '', dueDate: '' });
    onClose();
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {step === 1 ? 'Choose Invoice Template' : 'Create New Invoice'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {step === 1 ? (
          <div className="p-6 space-y-4">
            <p className="text-muted-foreground mb-4">Choose a template for your invoice</p>
            <div className="space-y-3">
              {invoiceTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="border border-border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{template.preview}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-lg">
              <div className="p-1 rounded bg-primary/10">
                {selectedTemplate === 'professional' ? (
                  <Briefcase className="w-4 h-4 text-primary" />
                ) : (
                  <Palette className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-sm font-medium text-foreground">
                {invoiceTemplates.find(t => t.id === selectedTemplate)?.name} Template
              </span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="ml-auto text-xs"
              >
                Change Template
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-foreground font-medium">Client Name</Label>
              <Input
                id="clientName"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
                placeholder="Enter client name"
                className="bg-background border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail" className="text-foreground font-medium">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoiceData.clientEmail}
                onChange={(e) => setInvoiceData({...invoiceData, clientEmail: e.target.value})}
                placeholder="Enter client email"
                className="bg-background border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground font-medium">Description</Label>
              <Textarea
                id="description"
                value={invoiceData.description}
                onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
                placeholder="Enter service description"
                className="bg-background border-border text-foreground"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground font-medium">
                Amount ({selectedCurrency.symbol})
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={invoiceData.amount}
                onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                placeholder="Enter invoice amount"
                className="bg-background border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-foreground font-medium">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                className="bg-background border-border text-foreground"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Invoice
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}