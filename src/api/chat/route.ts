/// <reference types="node" />

export async function POST(request: Request) {

  const key = process.env.API_KEY;

  if (!key) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  const body = await request.json();

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", { 
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
