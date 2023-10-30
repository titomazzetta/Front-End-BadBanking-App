import React, { useContext, useState } from 'react';
import { UserContext } from './context';
import './CommonStyles.css'; // Shared styles for consistency across components.

/**
 * The Deposit component allows the logged-in user to deposit funds into their balance.
 * It updates the user's balance in the context and provides feedback on successful 
 * or unsuccessful deposit attempts.
 */
function Deposit() {
  // Destructure the necessary properties and methods from UserContext.
  const { loggedInUser, updateUserBalance } = useContext(UserContext);

  // Local state to manage the input amount and feedback/status message.
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(`${loggedInUser?.name}'s Balance: $${loggedInUser?.balance || 0}`);

  /**
   * handleDeposit is triggered when the user tries to deposit funds.
   * It checks if the entered amount is valid and updates the balance accordingly.
   * Feedback is provided to the user in each case.
   * 
   * @param {Object} e - The event object (from the form submission).
   */
  const handleDeposit = (e) => {
    e.preventDefault();

    if (amount > 0) {
      updateUserBalance(loggedInUser.email, amount); // Add amount for deposit.
      setStatus(`You deposited $${amount}. ${loggedInUser?.name}'s balance is $${loggedInUser.balance + amount}.`);
      setAmount(0); // Reset the input field.
    } else {
      setStatus('Please enter a valid amount.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Deposit</div>
        <div className="card-body">
          <form onSubmit={handleDeposit}>
            <div className="form-group">
              <label>Amount:</label>
              <input 
                type="number" 
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Deposit</button>
          </form>
          <div className="mt-3">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
