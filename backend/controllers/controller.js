const db = require("../../database/queries.js")

//view all expenses
async function getExpenses(req, res) {
  try {
    const expenses = await db.getExpensesFromDB();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
}

//view one expense
async function getExpense(req, res) {
  try {
    const id = req.params.id; 
    const expenses = await db.getExpenseFromDB(id);
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
}

//add expense
async function addExpense(req, res) {
  try {
    const { title, amount, category, expenses_date } = req.body;

    if (!title || !amount || !category || !expenses_date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.addExpenseFromDB(title, amount, category, expenses_date);

    // No returned row, so just send a success message
    res.status(201).json({ message: "Expense added successfully" });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ error: "Failed to add expense" });
  }
}

//update expense 
async function updateExpense(req, res) {
  try {
    const id = req.params.id;
    const { title, amount, category, expenses_date } = req.body;

    if (!title || !amount || !category || !expenses_date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.updateExpenseFromDB(id, title, amount, category, expenses_date);

    res.json({ message: "Expense updated successfully" });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
}



//delete expense
async function deleteExpense(req, res) {
  try {
    const id = req.params.id;

    await db.deleteExpenseFromDB(id);

    // No returned row, just send a success message
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
}

module.exports = {
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
};
