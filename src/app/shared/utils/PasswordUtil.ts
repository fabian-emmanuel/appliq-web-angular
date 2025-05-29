
// Password strength checker
export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (!password) {
    return score;
  }

  // Length check
  if (password.length > 5) score += 20;
  if (password.length > 8) score += 10;

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 20; // Has uppercase
  if (/[a-z]/.test(password)) score += 15; // Has lowercase
  if (/[0-9]/.test(password)) score += 20; // Has number
  if (/[^A-Za-z0-9]/.test(password)) score += 15; // Has special char

  return Math.min(100, score);
};


export const getPasswordStrengthLabel = (password: string) => {
  const passwordStrength = getPasswordStrength(password);
  if (passwordStrength === 0) return "";
  if (passwordStrength < 40) return "Weak";
  if (passwordStrength < 70) return "Fair";
  if (passwordStrength < 90) return "Good";
  return "Strong";
};

export const getPasswordStrengthTextClass = (strength: any)  => {
  if (strength < 40) return 'text-danger';
  if (strength < 70) return 'text-warning';
  if (strength < 90) return 'text-info';
  return 'text-success';
}

export const getPasswordStrengthBarClass = (strength: any) => {
  if (strength < 40) return 'bg-danger';
  if (strength < 70) return 'bg-warning';
  if (strength < 90) return 'bg-info';
  return 'bg-success';
}


export const passwordRequirements = [
  {
    test: (password: string) => password.length >= 8,
    text: "At least 8 characters"
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    text: "Contains uppercase letter"
  },
  {
    test: (password: string) => /[0-9]/.test(password),
    text: "Contains number"
  },
  {
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
    text: "Contains special character"
  }
];
