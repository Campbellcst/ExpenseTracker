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
    if (expenses.length == 0) {
      return res.status(404).json({ error: "expense not found" });
    }

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

    const expenses = await db.addExpenseFromDB(title, amount, category, expenses_date);

    res.json(expenses);
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

    const expenses = await db.updateExpenseFromDB(id, title, amount, category, expenses_date);

    if (expenses.length == 0) {
      return res.status(404).json({ error: "expense not found" });
    }

    res.json(expenses);
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
}



//delete expense
async function deleteExpense(req, res) {
  const id = req.params.id;

  try {
    const expenses = await db.deleteExpenseFromDB(id);

    if (expenses.length === 0) {
      return res.status(404).json({ error: `Expense ${id} not found` });
    }

    res.json(expenses);

  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: `Failed to delete expense ${id}` });
  }
}

module.exports = {
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
};
