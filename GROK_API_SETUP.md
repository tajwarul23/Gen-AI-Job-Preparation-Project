# Grok Cloud API Migration Guide

## Summary of Changes

The AI service has been migrated from **Google Gemini API** to **Grok Cloud API (xAI)** with support for:
- **Llama 3.3 70B** (default)
- **GPT-OSS 120B** (or other models as available)

## Changes Made

### 1. **Backend Dependencies** (`Backend/package.json`)
- ❌ Removed: `@google/genai` 
- ✅ Added: `openai` (v4.52.0)

The OpenAI SDK is used as it's compatible with Grok's API endpoint which follows OpenAI API standards.

### 2. **AI Service** (`Backend/src/services/ai.service.js`)
- Updated `generateInterviewReport()` function to use OpenAI SDK
- Updated `generateResume()` function to use OpenAI SDK
- Both functions now use JSON response format instead of Gemini's schema format

### 3. **Environment Variables** (`Backend/.env`)

Replace/Add the following:

```env
# OLD (Remove this)
GOOGLE_GENAI_API_KEY=AIzaSyAr-3vy_ty7FXIvOUpF9kHSC3_qykkaKvo

# NEW (Add these)
GROK_API_KEY=YOUR_GROK_API_KEY_HERE
GROK_API_BASE_URL=https://api.x.ai/v1
GROK_MODEL=llama-3.3-70b
```

## Setup Instructions

### Step 1: Get Grok API Key
1. Visit [xAI Console](https://console.x.ai)
2. Sign up or log in with your xAI account
3. Navigate to API Keys section
4. Generate a new API key

### Step 2: Update Environment Variables

Edit your `.env` file and add:

```env
GROK_API_KEY=xai_xxxxxxxxxxxxxxxxxxxx  # Your actual Grok API key
GROK_API_BASE_URL=https://api.x.ai/v1  # xAI endpoint
GROK_MODEL=llama-3.3-70b               # or "gpt-oss-120b" if available
```

### Step 3: Install Dependencies

```bash
cd Backend
npm install
```

This will install the `openai` package to replace `@google/genai`.

### Step 4: Test the Integration

```bash
npm run dev
```

The service will now use Grok Cloud API for generating interview reports and resume analysis.

## Available Models

- `llama-3.3-70b` (default) - Llama 3.3 70B model
- `gpt-oss-120b` - GPT-OSS 120B model (if available)
- `grok-2` - Grok 2 model
- `grok-beta` - Grok Beta model

You can switch models by changing the `GROK_MODEL` environment variable.

## Configuration

The OpenAI client is configured with:
```javascript
const ai = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: process.env.GROK_API_BASE_URL || "https://api.x.ai/v1",
});
```

Both functions use:
- `response_format: { type: "json_object" }` for structured JSON output
- `temperature: 0.7` for balanced creativity and consistency
- Appropriate `max_tokens` for each operation

## Troubleshooting

### Issue: "Unauthorized" or "Invalid API Key"
- Verify your `GROK_API_KEY` is correctly set in `.env`
- Check that the key is from [xAI Console](https://console.x.ai)
- Ensure there are no trailing spaces

### Issue: Model not found
- Verify the model name in `GROK_MODEL` is correct
- Check available models at xAI documentation
- Ensure your API key has access to the selected model

### Issue: Rate limiting
- Implement exponential backoff in your error handling
- Check your API quota at xAI Console
- Upgrade your plan if needed

## Rollback (if needed)

To revert to Gemini API:

```bash
npm uninstall openai
npm install @google/genai
```

Then restore the original `ai.service.js` and `.env` files.

## API Cost Comparison

Compare pricing at:
- [xAI Pricing](https://x.ai/api)
- [Google Gemini API Pricing](https://ai.google.dev/pricing)

## References

- [xAI API Documentation](https://docs.x.ai)
- [OpenAI SDK Documentation](https://github.com/openai/node-sdk)
- [Grok Models Documentation](https://docs.x.ai/models)
