/**
 * Retrieve a fixed number of elements from an array, evenly distributed but
 * always including the first and last elements.
 * 
 * https://stackoverflow.com/questions/32439437/retrieve-an-evenly-distributed-number-of-elements-from-an-array
 *
 * @param   {Array} items - The array to operate on.
 * @param   {number} n - The number of elements to extract.
 * @returns {Array}
 */
export default function getDistributedSubarray(items, n) {
  var elements = [items[0]];
  var totalItems = items.length - 2;
  var interval = Math.floor(totalItems/(n - 2));
  for (var i = 1; i < n - 1; i++) {
      elements.push(items[i * interval]);
  }
  elements.push(items[items.length - 1]);
  return elements;
}