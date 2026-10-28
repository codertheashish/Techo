// Backend (Render) ka base URL. Vercel me VITE_API_URL env var se aata hai.
// Local dev me khaali rehta hai, to /api vite proxy ke through localhost:3000 jaata hai.
export const API_URL = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '');
