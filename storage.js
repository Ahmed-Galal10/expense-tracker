const KEY = 'expenses_data';

export function saveExpenses(expenses) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}

export function loadExpenses() {
  const item = localStorage.getItem(KEY);
  if (!item) return [];

  try {
    return JSON.parse(item);
  } catch (e) {
    return [];
  }
}