
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserPreferences {
  answers: string[];
  giverContext?: {
    occasion: string;
    budgetRange: string;
    relationship: string;
    recipientName: string;
  };
}

interface GiftItem {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  category: string;
  reasoning: string;
  searchQuery?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences }: { preferences: UserPreferences } = await req.json();

    const systemPrompt = `You are a gift curation expert. Based on the conversation responses, generate 8-10 thoughtful gift recommendations.

    Context: ${preferences.giverContext ? `${preferences.giverContext.occasion} gift, ${preferences.giverContext.budgetRange} budget, from ${preferences.giverContext.relationship}` : 'General gift suggestions'}

    User's conversation responses: ${preferences.answers.join('; ')}

    Return ONLY a JSON array of gift objects with this exact structure:
    [
      {
        "id": "unique-id",
        "title": "Gift Name",
        "description": "Detailed description (2-3 sentences)",
        "priceRange": "$XX-XX",
        "category": "Category Name",
        "reasoning": "Why this fits their preferences (2-3 sentences)",
        "searchQuery": "search terms for shopping"
      }
    ]

    Make each gift unique, thoughtful, and directly tied to their responses. Vary categories and price points within the budget.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate personalized gift recommendations based on the conversation.' }
        ],
        max_tokens: 2000,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    let gifts: GiftItem[];
    try {
      gifts = JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse gifts JSON:', error);
      throw new Error('Invalid response format from AI');
    }

    return new Response(JSON.stringify({ gifts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-gifts function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
