// SELECT ELEMENTS & BUTTONS
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceStatement = document.getElementById('budget-summary');
const incomeTable = document.getElementById('income-table');
const expenseTable = document.getElementById('expense-table');
const addIncomeBtn = document.getElementById('add-income');
const addExpenseBtn = document.getElementById('add-expense');

//INPUT
const incomeName = document.getElementById('income-name');
const incomeAmount = document.getElementById('income-amount');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');

//VARIABLES
let balance = 0, income = 0, expense = 0;
let ENTRY_LIST;

function updateBalanceStatement(balance) {
    if (balance < 0) {
        balanceStatement.innerHTML = `Ooops! You are <span class="deep-orange-text text-lighten-2">${Math.abs(balance)}</span> PLN under the budget..`
    } else if (balance > 0){
        balanceStatement.innerHTML = `You can still spend <span class="teal-text text-lighten-2">${balance}</span> PLN`
    } else if (balance == 0){
        balanceStatement.innerHTML = `You have achieved a perfect balance! 🥳`
    };
}
