export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Direct Native Fetch to Groq REST API Endpoint
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are the official AI Assistant of "BSP Continental", based in Bilaspur, Chhattisgarh. 
            You help clients with:
            1. Property Paper Verification (Zameen/Makaan ke kagaz check karna).
            2. Loan Rejection Consultation (Loan reject hone par sahi tarika batana).
            3. CIBIL Score Improvement Service (Low CIBIL score ko sudharna).
            Language Policy: Conversational Hinglish. Keep answers short, positive, and direct.`
          },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Groq Network Error');
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Sorry, no response generated.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Groq Native Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}