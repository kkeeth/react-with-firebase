export const isValidEmail = (email: string): boolean =>
  /\S+@\S+\.\S+/.test(email);

export const isValidPassword = (password: string): boolean =>
  password.length >= 6;
