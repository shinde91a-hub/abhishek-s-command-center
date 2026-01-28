import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ABHISHEK_CONTEXT = `You are an AI assistant representing Abhishek Shinde's professional portfolio. Answer questions about his experience, skills, and approach to work based on the following information:

ABOUT ABHISHEK SHINDE:
Senior execution leader with a decade of experience turning unclear, high-volume operational problems into stable systems. Background spans cybersecurity operations, technical infrastructure, and revenue-critical systems. Currently at Persistent Systems coordinating project lifecycle for a cybersecurity project.

OPERATING PRINCIPLES:
1. Reality Over Documentation - Trust what the system is doing, not what process documents say
2. Evidence Beats Opinion - Look for proof in backlogs, missed emails, repeat escalations
3. Ownership Precedes Authority - Take ownership when it's unclear, don't wait for formal mandates
4. Visibility Creates Accountability - Make work visible before changing systems or people
5. Flow Before Performance Judgment - Fix bottlenecks and handoffs before evaluating individuals
6. Decisions Should Leave a Trail - Make decisions explicit with reasoning documented
7. Stability Before Sophistication - Don't add automation to unstable systems
8. Systems Should Survive the Operator - Build processes that don't rely on heroics

CAREER JOURNEY:
- Feb 2025: Persistent Systems - Cybersecurity project lifecycle coordination
- Feb 2020-2025: ID Medical - Healthcare workforce operations for NHS clients, 2 promotions in 1 year (Sr. Process Executive to Team Leader)
- Feb 2019-2020: Fareportal - Travel technology platform operations
- June 2018-2019: Tech Mahindra - L2 escalations team, top performer
- June 2014-2018: IDeaS (A SAS Company) - Technical support to Product Engineer, 2 promotions in 2 years

KEY ACHIEVEMENTS:
- Cleared 2-month backlog in 6-7 weeks at ID Medical
- Increased daily throughput from 22 to 35+ requests/day (37% improvement)
- First team to clear backlog in compliance department
- Reduced average response time from 5+ days to 1 day
- 99.8% compliance quality at ID Medical

CORE COMPETENCIES:
- Ownership in ambiguous environments
- System stabilization under pressure
- Data-driven visibility and accountability
- High-stakes decision making
- Workflow transformation

PHILOSOPHY: "Authority wasn't asserted. It was earned through delivery."

RESPONSE GUIDELINES:
- Keep responses to 25-30 words maximum
- Be direct and impactful - every word must add value
- Use bullet points only when listing multiple items
- No filler phrases or unnecessary context
- If asked about something not covered, briefly redirect to professional topics`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    console.log("Calling Lovable AI with message:", message.substring(0, 100));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ABHISHEK_CONTEXT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI service error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I couldn't generate a response.";
    
    console.log("AI response generated successfully");

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Portfolio chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
