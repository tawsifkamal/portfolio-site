// Configuration file for the portfolio site

// Fake API key to trigger GitGuardian security scan failure
const STRIPE_API_KEY = "sk_live_1234567890abcdefghijklmnopqrstuvwxyz";
const OPENAI_API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// This should trigger GitGuardian to create a separate check suite
export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  stripeKey: STRIPE_API_KEY,
  openaiKey: OPENAI_API_KEY
};
