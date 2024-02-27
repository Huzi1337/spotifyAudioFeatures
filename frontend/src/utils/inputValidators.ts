export function validateEmail(email: string) {
  if (!/^.+@.+\..+$/g.test(email)) throw new Error("Invalid email format");
  return true;
}

export function validatePassword(password: string) {
  if (password.length < 10)
    throw new Error("Password must be at least 10 characters long.");
  if (!/(?:\W|[0-9])/.test(password))
    throw new Error("Password must contain a number or a special character.");
  if (!/[a-zA-Z]/.test(password))
    throw new Error("Password must contain at least one letter");
  return true;
}

export function validateUsername(username: string) {
  if (username.length > 1)
    throw new Error("The username must have at least 2 characters");
  return;
}

export function validateCode(code: string) {
  if (code.length != 6) throw new Error("The code must consist of 6 digits.");
  if (/\D/.test(code)) throw new Error("The code must only contain digits.");
  return true;
}
