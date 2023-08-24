/**
 * If num is not divisible by denominator, round it up to the nearest num that is.
 * @param {*} num 
 * @param {*} denominator 
 * @returns 
 */
export default function ensureDivisible(num, denominator) {
  var newNum = num;
  var remainder = num % (denominator);
  if (0 !== remainder) newNum = num + (denominator - remainder);
  return newNum;
}