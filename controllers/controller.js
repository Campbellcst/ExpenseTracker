const uuid = require("uuid");

let expenses = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 55.20,
    category: "Food",
    date: "12-12-2025"
  },
  {
    id: 2,
    title: "Monthly Rent",
    amount: 1200,
    category: "Housing",
    date: "1-20-2026"
  },
  {
    id: 3,
    title: "Gas Station",
    amount: 45.00,
    category: "Transportation",
    date: "1-25-2026"
  }
];

//view all expenses
function getExpenses(req, res) {
    res.json(expenses);
}

//view one expense
function getExpense(req, res) {
    let expense = expenses.find(item => item.id == req.params.id);
    res.json(expense);
}

//add expense
function addExpense(req, res) {
    let body = req.body;
    expenses.push({
        id: uuid.v4(),
        title: body.title,
        amount: body.amount,
        category: body.category,
        date: body.date
    });
    // or expenses.push({ id: uuid.v4(), ...body });
    res.json(expenses);
}

//update expense 
function updateExpense(req, res) {
    let expense = expenses.find(item => item.id == req.params.id);
    if (expense) {
        expense.title = req.body.title;
        expense.amount = req.body.amount;
        expense.category = req.body.category;
        expense.date = req.body.date;

        res.json(expenses);
    } else {
        res.send("ID doesn't exist");
    }
}

//delete expense
function deleteExpense(req, res) {
    let index = expenses.findIndex(item => item.id == req.params.id);
    expenses.splice(index, 1);
    res.json(expenses);
}

module.exports = {
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
};

/*
id: 1,
    title: "Grocery Shopping",
    amount: 55.20,
    category: "Food",
    date: "12-12-2025"

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    title TEXT,
    amount NUMERIC(10,2), 10 is max digits, 2 is max digits after the decimal
    category VARCHAR(50),
    expenses_date DATE
);
*/