/**
 * Sanitize user input to prevent XSS and injection attacks
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/<script.*?>.*?<\/script>/gi, "") // remove script tags
    .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
    .replace(/&/g, "&amp;") // escape &
    .replace(/</g, "&lt;") // escape <
    .replace(/>/g, "&gt;") // escape >
    .replace(/"/g, "&quot;") // escape "
    .replace(/'/g, "&#x27;"); // escape '
};

/**
 * Sanitize an object recursively
 * @param {object} obj - Object containing user input
 * @returns {object} Sanitized object
 */
export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  const sanitized = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      sanitized[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === "object") {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};
