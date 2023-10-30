import React, { useContext, useState } from 'react';
import { UserContext } from './context';
import './CommonStyles.css'; // Shared styles for consistency across components.

/**
 * The Withdraw component allows the logged-in user to withdraw funds from their balance.
 * It updates the user's balance in the context and provides feedback on successful 
 * or unsuccessful withdrawal attempts.
 */
function Withdraw() {
  // Destructure the necessary properties and methods from UserContext.
  const { loggedInUser, updateUserBalance } = useContext(UserContext);

  // Local state to manage the input amount and feedback/status message.
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(`Current Balance: $${loggedInUser?.balance || 0}`);

  /**
   * handleWithdraw is triggered when the user tries to withdraw funds.
   * It checks if the entered amount is valid, if there are sufficient funds, and updates
   * the balance accordingly. Feedback is provided to the user in each case.
   * 
   * @param {Object} e - The event object (from the form submission).
   */
  const handleWithdraw = (e) => {
    e.preventDefault();

    if (amount > 0 && amount <= loggedInUser.balance) {
      updateUserBalance(loggedInUser.email, -amount); // Subtracting amount for withdrawal.
      setStatus(`${loggedInUser?.name} withdrew $${amount}. New balance is $${loggedInUser.balance - amount}.`);
      setAmount(0); // Reset the input field.
    } else if (amount > loggedInUser.balance) {
      // Show an alert for insufficient funds
      alert("Wohh there buddy, looks like you need to deposit more funds to make a withdrawal like that. You gotta save to make it rain!!");
      setStatus('Insufficient funds.');
    } else {
      setStatus('Please enter a valid amount.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Withdraw</div>
        <div className="card-body">
          <form onSubmit={handleWithdraw}>
            <div className="form-group">
              <label>Amount:</label>
              <input 
                type="number" 
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Withdraw</button>
          </form>
          <div className="mt-3">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
