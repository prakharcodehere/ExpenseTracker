
import { useState, useEffect } from 'react';
import './App.css';
import ExpenseCard from './components/ExpenseCard/ExpenseCard';
import ExpenseHistory from './components/expenseHistory/ExpenseHistory';
import CustomPieChart from "./components/PieCharts"
import TransactionHistory from './components/transactionHistory/TransactionHistory';
import WalletCard from './components/WalletCard/WalletCard';
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {


const [balance, setBalance]= useState(5000)
const [expenses, setExpenses]= useState(() => {
  const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
  return savedExpenses || [];
})
const { enqueueSnackbar } = useSnackbar();





useEffect(() => {
  localStorage.setItem('balance',  balance.toString()); 
  localStorage.setItem('expenses', JSON.stringify(expenses));
}, [balance, expenses]);

const addExpense = (expense) => {
  if (expense.amount > balance) {
    enqueueSnackbar('Expense amount exceeds wallet balance!', { variant: 'warning' });
    return;
  }
  setExpenses([...expenses, expense]);
  setBalance(prevBalance => prevBalance - parseFloat(expense.amount)); 
};


const editExpense = (id, updatedExpense) => {
  const updatedExpenses = expenses.map(expense =>
    expense.id === id ? { ...expense, ...updatedExpense } : expense
  );
  setExpenses(updatedExpenses);
};

const deleteExpense = (id) => {
  setExpenses(prevExpenses => {
    const deletedExpenseIndex = prevExpenses.findIndex(expense => expense.id === id);
    if (deletedExpenseIndex !== -1) {
      const deletedExpense = prevExpenses[deletedExpenseIndex];
      const updatedExpenses = [...prevExpenses.slice(0, deletedExpenseIndex), ...prevExpenses.slice(deletedExpenseIndex + 1)];
      setBalance(prevBalance => prevBalance + parseFloat(deletedExpense.price));
      return updatedExpenses;
    }
    return prevExpenses;
  });
};





const totalExpense = expenses.reduce((total, expense) => {
 
  const amount = parseFloat(expense.price);

  return isNaN(amount) ? total : total + amount;
}, 0);

const currentBalance = balance - totalExpense;


console.log('balance:', typeof(balance), balance);
console.log('totalExpense:', typeof(totalExpense), totalExpense);
console.log('currentBalance:', typeof(currentBalance), currentBalance);
  return (
    <SnackbarProvider>
    <div className="App">
<div className='section card-container'>
<WalletCard className="card" balance={currentBalance} setBalance={setBalance} />
  <ExpenseCard className="card"  addExpense={addExpense} totalExpense={totalExpense}/>
  <CustomPieChart  expenses={expenses}/>
</div>
<div className='section history-container'>
  <TransactionHistory className="big-card" expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense}/>
  <ExpenseHistory className="big-card" expenses={expenses}/>
</div>

    </div>
    </SnackbarProvider>
  );
}

export default App;
