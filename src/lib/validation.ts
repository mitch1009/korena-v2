// Utility functions for validation (not server actions)

// Utility to sanitize and validate email domains
export function isValidEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  
  // Block obviously fake domains
  const blockedDomains = [
    "test.com",
    "example.com", 
    "fake.com",
    "invalid.com",
    "tempmail.com",
  ];
  
  return domain && !blockedDomains.includes(domain);
}

// Honeypot validation (client should never fill this)
export function validateHoneypot(honeypotValue: string): boolean {
  return honeypotValue === "" || honeypotValue === undefined;
}