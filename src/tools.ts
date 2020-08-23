export function allEntriesUniques(arr: any[]) {
  const set = new Set(arr);
  return set.size === arr.length;
}
