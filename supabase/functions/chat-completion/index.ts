import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { messages, stream = false } = await req.json();

    console.log('Received chat request with messages:', messages.length);

    // Enhanced system message for Bhagya Patel
    const systemMessage = {
      role: 'system',
      content: `You are Bhagya Patel, a friendly and knowledgeable financial expert and personal finance assistant. You help users with:

• Invoice generation and management
• Expense categorization and tracking  
• Budget planning and forecasting
• Profit/loss calculations
• Financial reporting and analytics
• Account management
• Transaction analysis
• Financial planning advice

Always be helpful, professional, and provide actionable financial advice. Keep responses concise but informative. When users ask for specific actions like "Generate invoice" or "Categorize expenses", acknowledge their request and provide guidance on how they can use the app's features.

Current context: You're integrated into a personal finance web application with features for transactions, accounts, budgets, invoices, and reports.`
    };

    // Prepare messages with system context
    const messagesWithSystem = [
      systemMessage,
      ...messages
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messagesWithSystem,
        stream: stream,
        temperature: 0.7,
        max_tokens: 1500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      
      // Provide more specific error messages
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else if (response.status === 500) {
        throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
    }

    // If streaming, return the response directly
    if (stream) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      });
    }

  } catch (error) {
    console.error('Error in chat-completion function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while processing your request';
    return new Response(
      JSON.stringify({ 
        error: errorMessage 
      }), 
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});