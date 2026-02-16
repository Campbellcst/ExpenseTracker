const pool = require("./pool")

async function getExpensesFromDB() {
  try {
    const { rows } = await pool.query("SELECT * FROM expenses");
    console.log("Fetched rows:", rows);
    return rows;
  } catch (err) {
    console.error("Error in getExpensesFromDB:", err); // <- detailed log
    throw err; // re-throw so your controller still catches it
  }
}

async function getExpenseFromDB(expense_id) {
    const { rows } = await pool.query('SELECT * FROM expenses WHERE id = $1', [expense_id]);
    return rows;
}

async function addExpenseFromDB(title, amount, category, expenses_date) {
    const { rows } = await pool.query(
        'INSERT INTO expenses (title, amount, category, expenses_date) VALUES ($1, $2, $3, $4) RETURNING *', 
        [title, amount, category, expenses_date]);
    return rows;
} 

async function updateExpenseFromDB(id, title, amount, category, expenses_date) {
    const { rows } = await pool.query(
        'UPDATE expenses SET title=$1, amount=$2, category=$3, expenses_date=$4 WHERE id=$5 RETURNING *', 
        [title, amount, category, expenses_date, id]);
    return rows;
}

async function deleteExpenseFromDB(expense_id) {
    const { rows } = await pool.query('DELETE FROM expenses WHERE id=$1 RETURNING *', [expense_id]);
    return rows;
}

module.exports = {
    getExpensesFromDB,
    getExpenseFromDB,
    addExpenseFromDB,
    updateExpenseFromDB,
    deleteExpenseFromDB
};

