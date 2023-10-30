import React, { useState } from 'react';
import { Card } from 'react-bootstrap';


function BankForm({ bgcolor, label, handle, hideAmount, successButton }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function onSubmit() {
    if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;
    const success = handle({name, email, password});
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <Card 
      bgcolor={bgcolor}
      header={label}
      status={status}
      body={
        <>
          Name<br/>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
          {!hideAmount && (
            <>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            </>
          )}
          <button type="submit" className="btn btn-light" onClick={onSubmit}>Submit</button>
          {successButton && <button className="btn btn-light" onClick={() => {setName(''); setEmail(''); setPassword('');}}>{successButton}</button>}
        </>
      }
    />
  );
}

export default BankForm;
