// data.js
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities'];
const wait = ms => new Promise(res => setTimeout(res, ms));
export async function fetchCategories() {
    await wait(300);
    return [...CATEGORIES];
}
export async function fetchInitialExpenses() {
    await wait(500);
    if (Math.random() < 0.25) throw new Error('NETWORK_ERROR');
    return [
        {
            id: 'e1', description: 'Grocery run', amount: 85.50, category: 'Food', date:
                '2026-07-01'
        },
        {
            id: 'e2', description: 'Bus pass', amount: 30, category: 'Transport',
            date: '2026-07-03'
        },
        {
            id: 'e3', description: 'Cinema tickets', amount: 45, category: 'Entertainment',
            date: '2026-07-05'
        },
        {
            id: 'e4', description: 'Electricity', amount: 120, category: 'Utilities',
            date: '2026-07-10'
        },
        {
            id: 'e5', description: 'New headphones', amount: 200, category: 'Shopping',
            date: '2026-07-12'
        },
    ];
}
