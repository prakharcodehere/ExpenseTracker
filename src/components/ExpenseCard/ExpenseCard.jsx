import React, { useState } from 'react';
import Modal from 'react-modal';
import "./expenseCard.css"
import { useSnackbar } from 'notistack';

const ExpenseCard = ({className, expenseAmount, addExpense, totalExpense}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleAddExpense = () => {
    
    if (!title || !price || !category || !date) {
      enqueueSnackbar('Please fill all your fields', { variant: 'warning' });
      return;
    }

 
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert('Please enter a valid price');
      return;
    }

   
    addExpense({ title, price: parsedPrice, category, date });


    setTitle('');
    setPrice('');
    setCategory('');
    setDate('');

  
    closeModal();
  };

  return (
    <div  className={`${className} expense-card`}>
<div className='expense-heading'>
    <span>Expense: {totalExpense}</span>
    <span>{expenseAmount}</span>
</div>
<button className='expenseBtn' onClick={openModal}>Add Expense</button>

<Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>Add Expense</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Transportation">Transportation</option>
          
         
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <span>
        <button className='add-btn' onClick={handleAddExpense}>Add Expense</button>
        <button onClick={closeModal}>Cancel</button>
        </span>
       
      </Modal>






    </div>
  )
}

export default ExpenseCard