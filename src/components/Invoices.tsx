import { useState } from 'react';
import { Plus, FileText, Calendar, DollarSign, Eye, Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InvoiceModal } from './InvoiceModal';
import { useInvoices } from '@/contexts/InvoiceContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export function Invoices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { invoices, addInvoice, updateInvoiceStatus } = useInvoices();
  const { selectedCurrency } = useCurrency();

  const handleCreateInvoice = (invoiceData: any) => {
    addInvoice({
      ...invoiceData,
      amount: parseFloat(invoiceData.amount),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-700 border-green-200';
      case 'sent':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Invoice management system with template selection
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-gradient-primary hover:bg-primary-hover"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Invoices List */}
      {invoices.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No invoices yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Create your first invoice to get started with billing your clients
            </p>
            <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground mb-1">
                      {invoice.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-foreground">
                      {selectedCurrency.symbol}{invoice.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {invoice.clientEmail}
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {invoice.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    {invoice.status === 'draft' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => updateInvoiceStatus(invoice.id, 'sent')}
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Send
                      </Button>
                    )}
                    {invoice.status === 'sent' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateInvoice}
      />
    </div>
  );
}