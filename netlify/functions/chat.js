exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  const { message } = JSON.parse(event.body);
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: "You are Umesh Linga's portfolio assistant. He is a Senior Bioinformatics Engineer with 5+ years experience in NGS pipelines, AWS, Python, PostgreSQL, React. Email: Umesh.linga25@gmail.com",
      messages: [{ role: 'user', content: message }]
    })
  });
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify({ reply: data.content[0].text }) };
};
