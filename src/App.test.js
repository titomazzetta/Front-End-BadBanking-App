import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProvider } from './components/context'; 
import Deposit from './components/deposit';          

describe('Deposit Component', () => {

    beforeEach(() => {
        render(
            <UserProvider>
                <Deposit />
            </UserProvider>
        );
    });

    it('should display a deposit form', () => {
        expect(screen.getByPlaceholderText('Enter deposit amount')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('should input $100 into the deposit field', () => {
      const depositInput = screen.getByPlaceholderText('Enter deposit amount');
      fireEvent.change(depositInput, { target: { value: '100' } });
      expect(depositInput.value).toBe('100');
  });

  it('should click the submit button', () => {
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
});

it('should input $100 into the deposit field', () => {
  const depositInput = screen.getByPlaceholderText('Enter deposit amount');
  fireEvent.change(depositInput, { target: { value: '100' } });
  expect(depositInput.value).toBe('100');

  
  
});

// Add more tests here

});
