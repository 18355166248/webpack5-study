// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(cn: unknown): cn is Function {
  return typeof cn === "function";
}
