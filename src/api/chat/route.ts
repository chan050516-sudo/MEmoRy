/// <reference types="node" />

export async function POST(request: Request) {
  // 从 server 环境读取 key，不暴露给前端
  const key = process.env.GEMINI_KEY;

  if (!key) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  const body = await request.json();

  const res = await fetch("https://gemini-api-endpoint.com", { // 用你真正的 Gemini API URL
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
