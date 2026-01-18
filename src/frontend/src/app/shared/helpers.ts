export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromLocalDateString(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export const sortByField = <T, K extends {[P in keyof T]: T[P] extends string ? P : never}[keyof T]>(
  field: K,
  direction: 'asc' | 'desc' = 'asc'
): (a: T, b: T) => number => {
  return (a: T, b: T): number => {
    return direction === 'asc'
      ? a[field] < b[field] ? -1 : (a[field] > b[field] ? 1 : 0)
      : a[field] < b[field] ? 1 : (a[field] > b[field] ? -1 : 0);
  };
};
