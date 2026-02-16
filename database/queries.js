const pool = require("./pool")

async function getExpensesFromDB() {
    const { rows } = await pool.query('SELECT * FROM expenses');
    return rows;
}

async function getExpenseFromDB(expense_id) {
    const { rows } = await pool.query('SELECT * FROM expenses WHERE id = $1', [expense_id]);
    return rows;
}

async function addExpenseFromDB(title, amount, category, expenses_date) {
    await pool.query(
        'INSERT INTO expenses (title, amount, category, expenses_date) VALUES ($1, $2, $3, $4)', 
        [title, amount, category, expenses_date]);
} 

async function updateExpenseFromDB(id, title, amount, category, expenses_date) {
    await pool.query(
        'UPDATE expenses SET title=$1, amount=$2, category=$3, expenses_date=$4 WHERE id=$5', 
        [title, amount, category, expenses_date, id]);
}

async function deleteExpenseFromDB(expense_id) {
    await pool.query('DELETE FROM expenses WHERE id=$1', [expense_id]);
}

module.exports = {
    getExpensesFromDB,
    getExpenseFromDB,
    addExpenseFromDB,
    updateExpenseFromDB,
    deleteExpenseFromDB
};

