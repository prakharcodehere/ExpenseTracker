import React, { useState } from 'react';
import Modal from 'react-modal'; 
import "./walletCard.css"

const WalletCard = ({className,balance, setBalance}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [newBalance, setNewBalance] = useState('');



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };




  const handleAddBalance =() => {
    const parsedBalance = parseFloat(newBalance);
    if (isNaN(parsedBalance)) {
      alert('Please enter a valid amount');
      return;
    }
    setBalance(prevBalance => prevBalance + parsedBalance);
    console.log(balance)
    setNewBalance('');
    closeModal();
  }







  return (
    <div  className={`${className} wallet-card`}>
    <div className='wallet-heading'>
        <span>Wallet balance: </span>
        <span className='amount-text'>{balance}</span>
    </div>
    <button className='btn' onClick={openModal}>Add Balance</button>
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>Add Balance</h2>
        <input
          type="number"
          placeholder="Enter Amount"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
        />
        <span><button onClick={handleAddBalance}>Add Balance</button>
        <button onClick={closeModal}>Cancel</button></span>
        
      </Modal>
        </div>
  )
}

export default WalletCard