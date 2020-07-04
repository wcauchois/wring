
let uniqueIdNonce = 1;

export function uniqueId(prefix = 'id-') {
  return `${prefix}${uniqueIdNonce++}`;
}
