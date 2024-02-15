export function validateEmail(email: string) {
  return /^.+@.+\..+$/g.test(email);
}

export function validatePassword(password: string) {
  return (
    password.length >= 10 &&
    /(?:\W|[0-9])/.test(password) &&
    /[a-zA-Z]/.test(password)
  );
}

export function validateUsername(username: string) {
  return username.length > 1;
}

export function validateCode(code: string) {
  return code.length === 6 && !/\D/.test(code);
}
