import OpenAI from "openai";

// On page load, retrieve the API key from localStorage and populate the input field
document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('openAIKey');
  const storedApiKey = localStorage.getItem('openAIKey');
  if (storedApiKey) {
    apiKeyInput.value = storedApiKey;
  }
});

document.getElementById('generate').addEventListener('click', async () => {
  const apiKeyInput = document.getElementById('openAIKey');
  const apiKey = apiKeyInput.value;
  const prompt = document.getElementById('prompt').value;

  // Store the API key in localStorage
  localStorage.setItem('openAIKey', apiKey);

  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Generating...';

  try {
    const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Update to the model you have access to
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const response = completion.choices[0].message.content;
    resultDiv.textContent = response;
  } catch (error) {
    console.error('Error:', error);
    resultDiv.textContent = 'Error: ' + error.message;
  }
});
