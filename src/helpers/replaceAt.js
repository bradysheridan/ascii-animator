export default function replaceAt(str, i, replacement, secondHalfOffset) {
  if (!secondHalfOffset) secondHalfOffset = 0;
  return str.substring(0, i) + replacement + str.substring(i + secondHalfOffset + replacement.length);
}