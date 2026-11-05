// Limits that keep the AI Advisor's costs down. The chat UI shows them, and
// app/api/advisor/route.ts enforces them, so they can't be bypassed from a browser.

/** Longest message a visitor can send, in characters. */
export const MAX_MESSAGE_CHARS = 800;
/** Most questions in one conversation. */
export const MAX_USER_MESSAGES = 10;
/** Longest reply the model can write, including its reasoning. */
export const MAX_OUTPUT_TOKENS = 1500;
/** Longest earlier reply accepted back from the browser, in characters. */
export const MAX_ASSISTANT_CHARS = 8000;
/** Requests allowed from one visitor in the window below. */
export const RATE_LIMIT_REQUESTS = 20;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
