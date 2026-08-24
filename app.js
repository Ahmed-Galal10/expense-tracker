import { fetchCategories, fetchInitialExpenses } from './data.js';
import { loadExpenses, saveExpenses } from './storage.js';

let currentCategory = 'All';
let expenses = [];
let categories = [];
let userExpenses = [];

const listElement = document.getElementById('list');
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EGP'
});

const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const formElement = document.getElementById('expense-form');
const descError = document.getElementById('desc-error');
const amountError = document.getElementById('amount-error');

const filtersContainer = document.getElementById('filters');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const appElement = document.getElementById('app');
const retryBtn = document.getElementById('retry-btn');

function render() {
  let listToRender = expenses;
  if (currentCategory !== 'All') {
    listToRender = expenses.filter(exp => exp.category === currentCategory);
  }

  const total = listToRender.reduce((sum, curr) => sum + curr.amount, 0);

  countElement.textContent = listToRender.length;
  totalElement.textContent = formatter.format(total);

  listElement.innerHTML = '';
  listToRender.forEach(exp => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${exp.description} - <strong>${formatter.format(exp.amount)}</strong> [${exp.category}] (${exp.date})</span>
      <button data-id="${exp.id}" class="delete-btn">Delete</button>
    `;
    listElement.appendChild(li);
  });
}

listElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    expenses = expenses.filter(item => item.id !== id);
    userExpenses = userExpenses.filter(item => item.id !== id);
    saveExpenses(userExpenses);
    render();
  }
});

filtersContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    currentCategory = e.target.getAttribute('data-category');
    render();
  }
});

async function startApp() {
  loadingElement.style.display = 'block';
  errorElement.style.display = 'none';
  appElement.style.display = 'none';

  try {
    const results = await Promise.all([
      fetchCategories(),
      fetchInitialExpenses()
    ]);

    categories = results[0];
    const initialExp = results[1];

    userExpenses = loadExpenses();
    expenses = [...userExpenses, ...initialExp];

    populateCategories();
    render();

    loadingElement.style.display = 'none';
    appElement.style.display = 'block';
  } catch (err) {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
  }
}

function populateCategories() {
  categorySelect.innerHTML = '';
  for (let cat of categories) {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  }

  filtersContainer.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.setAttribute('data-category', 'All');
  filtersContainer.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.setAttribute('data-category', cat);
    filtersContainer.appendChild(btn);
  });
}

formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amt = Number(amountInput.value);
  const cat = categorySelect.value;

  let valid = true;

  if (!desc) {
    descError.style.display = 'inline';
    valid = false;
  } else {
    descError.style.display = 'none';
  }

  if (!amt || amt <= 0) {
    amountError.style.display = 'inline';
    valid = false;
  } else {
    amountError.style.display = 'none';
  }

  if (!valid) return;

  const item = {
    id: 'exp_' + Date.now(),
    description: desc,
    amount: amt,
    category: cat,
    date: new Date().toISOString().split('T')[0]
  };

  userExpenses.unshift(item);
  saveExpenses(userExpenses);

  expenses.unshift(item);
  render();

  formElement.reset();
});

retryBtn.addEventListener('click', () => {
  startApp();
});

startApp();
