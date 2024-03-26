import React,{useState} from 'react'
import "./transaction.css"
import Modal from 'react-modal';

const TransactionHistory = ({ expenses, editExpense, deleteExpense }) => {
console.log(expenses)
const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedExpense, setSelectedExpense] = useState(null);
const [editedExpense, setEditedExpense] = useState(null);


const sortedExpenses = expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

const openEditModal = (expense) => {
  setSelectedExpense(expense);
  setEditedExpense({ ...expense });
  setEditModalOpen(true);
};

const closeEditModal = () => {
  setEditModalOpen(false);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedExpense({ ...editedExpense, [name]: value });
};

const handleSaveEditedExpense = () => {
  editExpense(editedExpense.id, editedExpense);
  closeEditModal();
};







  return (
    <div className='transaction-history'>
 <h2>Transaction History</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.price}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => openEditModal(expense)} className='action-btn' >Edit</button>
                <button onClick={() => deleteExpense(expense.id)} className='action-btn'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={editModalOpen} onRequestClose={closeEditModal} className="modal">
        <h2>Edit Transaction</h2>
        <label>Title</label>
        <input type="text" name="title" value={editedExpense?.title || ''} onChange={handleInputChange} />
        <label>Category</label>
        <select name="category" value={editedExpense?.category || ''} onChange={handleInputChange}>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transportation">Transportation</option>
        </select>
        <label>Price</label>
        <input type="number" name="price" value={editedExpense?.price || ''} onChange={handleInputChange} />
        <button onClick={handleSaveEditedExpense}>Save</button>
        <button onClick={closeEditModal}>Cancel</button>
      </Modal>

    </div>
  )
}

export default TransactionHistory