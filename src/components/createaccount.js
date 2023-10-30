import React, { useContext, useState } from 'react';
import { UserContext, generateRandomAvatarURL } from './context';
import './CommonStyles.css';
import { useNavigate } from 'react-router-dom';
import AvatarModal from './AvatarModal';

/**
 * CreateAccount component - Allows users to create a new account.
 */
function CreateAccount() {
    // Hooks
    const navigate = useNavigate();
    const { addUser, doesEmailExist } = useContext(UserContext);
    
    // State for form fields, modal visibility, status messages, and loading state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState({message: '', subMessage: ''});
    const [loading, setLoading] = useState(false);

    // Helper function to validate a name
    const isRealName = (inputName) => /^[a-zA-Z ]+$/.test(inputName);
    
    // Helper function to validate an email address
    const isValidEmail = (inputEmail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

     // Helper function to validate Password
     const isValidPassword = (password) => {return password.length >= 8;
     };

    // Handler for the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validations
        if (!name || !email || !password) {
            setStatus({message: 'Error:', subMessage: 'Please fill out all fields.'});
            return;
        }
        if (!isRealName(name)) {
            setStatus({message: 'Error:', subMessage: 'Please enter a valid name. No numbers or symbols allowed.'});
            return;
        }
        if (!isValidEmail(email)) {
            setStatus({message: 'Error:', subMessage: 'Please enter a valid email address.'});
            return;
        }
        if (!isValidPassword(password)) {
            setStatus({message: 'Error:', subMessage: 'Password must be at least 8 characters long.'});
            return;    
        }
        if (doesEmailExist(email)) {
            setStatus({message: 'Error:', subMessage: 'Email already registered. Please choose another.'});
            return;
        }

        // Generate avatar and show confirmation modal
        setAvatarURL(generateRandomAvatarURL());
        setShowModal(true);
    };

    // Handler to confirm avatar choice and finalize the creation process
    const handleAvatarConfirmation = () => {
        addUser({
            name,
            email,
            password,
            avatarURL,
            balance: 0
        });

        // Display a confirmation message
        setStatus({message: `Congratulations ${name}!`, subMessage: "redirecting to the login page..."});
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate('/login');
        }, 1500);

        // Clear form fields for potential reuse
        setName('');
        setEmail('');
        setPassword('');
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">Create Account</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <InputField label="Name:" value={name} onChange={(e) => setName(e.target.value)} />
                        <InputField label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputField label="Password:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </form>
                    <StatusMessage loading={loading} status={status} />
                </div>
            </div>
            <AvatarModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                avatarURL={avatarURL} 
                setAvatarURL={setAvatarURL} 
                onConfirm={handleAvatarConfirmation} 
                userName={name.split(' ')[0]}  // Pass the user's first name to the modal
            />
        </div>
    );
}

/**
 * InputField component - A reusable input field component.
 */
const InputField = ({ label, type = 'text', value, onChange }) => (
    <div className="form-group">
        <label>{label}</label>
        <input 
            type={type}
            className="form-control"
            value={value}
            onChange={onChange}
        />
    </div>
);

/**
 * StatusMessage component - Displays status messages or a loading spinner.
 */
const StatusMessage = ({ loading, status }) => (
    <div className="mt-3">
        {loading ? (
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <br />
                <div>Account creation successful. Redirecting to the login page...</div>
            </div>
        ) : (
            <>
                {status.message}
                <br />
                {status.subMessage}
            </>
        )}
    </div>
);

export default CreateAccount;
