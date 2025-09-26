# Smart GnuCash Web Portal

A modern personal finance dashboard with AI-powered insights built with React, TypeScript, and Supabase.

## Features

- **Dashboard**: Overview of your financial status with charts and insights
- **Accounts**: Manage multiple financial accounts (checking, savings, credit, investment)
- **Transactions**: Track and categorize your income and expenses
- **Invoices**: Create and manage professional invoices with templates
- **Reports**: Generate financial reports (Balance Sheet, P&L, Cash Flow)
- **Budget**: Set and monitor budget goals with AI insights
- **AI Assistant**: Chat with Bhagya Patel, your personal finance expert

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Charts**: Recharts
- **State Management**: React Context API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd smart-gnucash
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # Supabase integration
├── data/              # Mock data and types
└── lib/               # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Authentication
- Email/password authentication
- Google OAuth integration
- User profile management

### Financial Management
- Multi-currency support (USD, EUR, INR)
- Real-time transaction tracking
- Automated expense categorization
- Budget monitoring with alerts

### AI Integration
- Intelligent expense categorization
- Budget forecasting
- Anomaly detection
- Financial advice chatbot

### Reporting
- Balance Sheet generation
- Profit & Loss statements
- Cash Flow reports
- Export capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.