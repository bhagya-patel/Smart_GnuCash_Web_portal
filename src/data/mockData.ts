export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  account: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
}

export interface Budget {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Salary - Tech Corp',
    category: 'Salary',
    amount: 5000,
    type: 'income',
    account: 'Checking'
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Grocery Store',
    category: 'Food & Drink',
    amount: -150,
    type: 'expense',
    account: 'Checking'
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Starbucks Coffee',
    category: 'Food & Drink',
    amount: -12.50,
    type: 'expense',
    account: 'Credit Card'
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Electric Bill',
    category: 'Utilities',
    amount: -120,
    type: 'expense',
    account: 'Checking'
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Amazon Purchase',
    category: 'Shopping',
    amount: -89.99,
    type: 'expense',
    account: 'Credit Card'
  },
];

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 8500,
    currency: 'USD'
  },
  {
    id: '2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 25000,
    currency: 'USD'
  },
  {
    id: '3',
    name: 'Visa Credit Card',
    type: 'credit',
    balance: -1250,
    currency: 'USD'
  },
  {
    id: '4',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 45000,
    currency: 'USD'
  }
];

export const monthlyData = [
  { month: 'Aug', income: 4800, expense: 2200 },
  { month: 'Sep', income: 5100, expense: 2800 },
  { month: 'Oct', income: 4900, expense: 2400 },
  { month: 'Nov', income: 5200, expense: 2600 },
  { month: 'Dec', income: 5500, expense: 3200 },
  { month: 'Jan', income: 5000, expense: 2900 },
];

export const expenseByCategory = [
  { name: 'Food & Drink', value: 850, color: '#8884d8' },
  { name: 'Transportation', value: 320, color: '#82ca9d' },
  { name: 'Shopping', value: 290, color: '#ffc658' },
  { name: 'Utilities', value: 420, color: '#ff7300' },
  { name: 'Entertainment', value: 180, color: '#00ff88' },
  { name: 'Healthcare', value: 240, color: '#ff0088' },
];

export const mockBudgets: Budget[] = [
  { category: 'Food & Drink', budgeted: 800, spent: 650, remaining: 150 },
  { category: 'Transportation', budgeted: 400, spent: 320, remaining: 80 },
  { category: 'Shopping', budgeted: 300, spent: 350, remaining: -50 },
  { category: 'Utilities', budgeted: 500, spent: 420, remaining: 80 },
  { category: 'Entertainment', budgeted: 200, spent: 180, remaining: 20 },
];

// AI Features Mock Data
export const categoryMappings: Record<string, string> = {
  'starbucks': 'Food & Drink',
  'coffee': 'Food & Drink',
  'grocery': 'Food & Drink',
  'gas': 'Transportation',
  'uber': 'Transportation',
  'amazon': 'Shopping',
  'target': 'Shopping',
  'netflix': 'Entertainment',
  'spotify': 'Entertainment',
  'electric': 'Utilities',
  'water': 'Utilities',
};

export const aiInsights = {
  budgetForecast: "Based on your current spending, you are projected to be $50 over your 'Shopping' budget this month.",
  anomaly: {
    message: "Unusual Activity Alert: A transaction of $1,200 at 'Best Buy' is higher than your typical spending.",
    amount: 1200,
    merchant: "Best Buy",
    date: "2024-01-10"
  }
};