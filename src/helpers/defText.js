export default function declOfNum(n, textForms) {
  const newN = Math.abs(n) % 100;
  const n1 = newN % 10;

  if (newN > 10 && newN < 20) {
    return textForms[2];
  }

  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }

  if (n1 === 1) {
    return textForms[0];
  }

  return textForms[2];
}
