const { Router } = require("express");
const router = Router(); 

const {
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
} = require("../controllers/controller");

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
