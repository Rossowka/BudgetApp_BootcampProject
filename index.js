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

//CHECK FOR DATA IN LOCAL STORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem('entry_list')) || [];
updateUI();

//EVENT LISTENERS
addIncomeBtn.addEventListener('click', function(){
    if(!incomeName.value || !incomeAmount.value) return;
     let income = {
         type: 'income',
         name: incomeName.value,
         amount: parseFloat(incomeAmount.value),
     }
     ENTRY_LIST.push(income)
     updateUI();
     clearInput([incomeName, incomeAmount]);
 });
 
addExpenseBtn.addEventListener('click', function(){
    if(!expenseName.value || !expenseAmount.value) return;
    let expense = {
        type: 'expense',
        name: expenseName.value,
        amount: Number(expenseAmount.value),
    }
    ENTRY_LIST.push(expense)
    updateUI();
    clearInput([expenseName, expenseAmount]);
});

incomeTable.addEventListener('click', targetRow);
expenseTable.addEventListener('click', targetRow);


//FUNCTIONALITY
function updateUI() {
    income = calculateTotal('income', ENTRY_LIST);
    expense = calculateTotal('expense', ENTRY_LIST);
    balance = Number(income - expense);
    updateBalanceStatement(balance);

    totalIncomeEl.innerHTML = income;
    totalExpenseEl.innerHTML = expense;

    clearElement([incomeTable, expenseTable])

    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == 'income') {
            addRow(incomeTable, 'teal-text text-lighten-2', entry.name, entry.amount, index);
        } else if (entry.type == 'expense') {
            addRow(expenseTable, 'deep-orange-text text-lighten-2', entry.name, entry.amount, index);
        };
    });

    localStorage.setItem('entry_list', JSON.stringify(ENTRY_LIST));
}

function updateBalanceStatement(balance) {
    if (balance < 0) {
        balanceStatement.innerHTML = `Ooops! You are <span class="deep-orange-text text-lighten-2">${Math.abs(balance)}</span> PLN under the budget..`
    } else if (balance > 0){
        balanceStatement.innerHTML = `You can still spend <span class="teal-text text-lighten-2">${balance}</span> PLN`
    } else if (balance == 0){
        balanceStatement.innerHTML = `You have achieved a perfect balance! 🥳`
    };
}

function clearInput(inputsArray) {
    inputsArray.forEach(input => {
        input.value = '';
    });
}

function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = '';
    })
}

function calculateTotal(type, ENTRY_LIST) {
    let sum = 0;
    ENTRY_LIST.forEach(entry => {
        if (entry.type == type) {
            sum += entry.amount;
        }
    });
    return sum;
}

function addRow(table, color, name, amount, id) {
    const entry = ` 
    <tr id="${id}"> 
        <td class="editable">${name}</td>
        <td class="editable ${color}">${amount}</td>
        <td>
            <i class="material-icons" id="edit-row">edit</i>
            <i class="material-icons hide" id="save-row">save</i>
            <i class="material-icons" id="delete-row">cancel</i>
        </td>
    </tr>
    `;

    const position = 'afterbegin';
    table.insertAdjacentHTML(position, entry);
}

function deleteRow(entry){
    ENTRY_LIST.splice(entry.id, 1);
    updateUI();
}

function editRow(editableInput, btns){
    editableInput.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.classList.remove('deep-orange-text', 'teal-text', 'text-lighten-2')
        element.classList.add('amber-text');
    });

    toggleBtnsVisibility(btns);
}

function toggleBtnsVisibility(btns){
    btns.forEach(element => {
        element.classList.toggle('hide');
    });
}

function saveRow(editableInput, btns, entry){
    const newName = editableInput[0].innerHTML;
    const newAmount = parseFloat(editableInput[1].innerHTML);

    if (Number.isNaN(newAmount)) {
        ENTRY_LIST[entry.id].amount = 0;
    } else {
        ENTRY_LIST[entry.id].amount = newAmount;
    }

    ENTRY_LIST[entry.id].name = newName;

    toggleBtnsVisibility(btns);
    updateUI();
}

function targetRow(event) {
    const targetBtn = event.target;
    const btnsCell = targetBtn.parentNode;
    const entry = btnsCell.parentNode;
    const btns = btnsCell.querySelectorAll('i');
    const editableInput = entry.querySelectorAll('td.editable');

    if(targetBtn.id == 'delete-row'){
        deleteRow(entry);
    } else if (targetBtn.id == 'edit-row'){
        editRow(editableInput, btns);
    } else if (targetBtn.id == 'save-row'){
        saveRow(editableInput, btns, entry);
    }
}