export function normalizeWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

export function createWhatsAppUrl(value: string, message: string) {
  const number = normalizeWhatsAppNumber(value);
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function isWhatsAppRequest(value: string) {
  return /\b(whats\s*app|message|text)\b.*\b(family|carer|caregiver|contact)\b|\b(family|carer|caregiver|contact)\b.*\b(whats\s*app|message|text)\b/i.test(value);
}