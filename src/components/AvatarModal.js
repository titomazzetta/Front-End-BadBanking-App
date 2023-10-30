import React from 'react'; // Removed the unused useEffect import.
import { generateRandomAvatarURL } from './context';

/**
 * AvatarModal provides an interface for the user to choose a randomly generated avatar.
 * It displays the avatar and gives the user the option to regenerate it or accept it.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.show - Whether the modal should be visible.
 * @param {Function} props.onHide - The function to hide the modal.
 * @param {string} props.avatarURL - The current avatar URL.
 * @param {Function} props.setAvatarURL - The setter function for the avatar URL.
 * @param {Function} props.onConfirm - The function called when an avatar is confirmed.
 * @param {string} props.userName - The user's name.
 */
function AvatarModal({ show, onHide, avatarURL, setAvatarURL, onConfirm, userName }) {

    /**
     * Regenerate the avatar by fetching a new URL.
     */
    const regenerateAvatar = () => {
        setAvatarURL(generateRandomAvatarURL());
    };

    /**
     * Handle the confirmation of the avatar by the user.
     * It calls the onConfirm function passed from the parent and hides the modal.
     */
    const handleAccept = () => {
        onConfirm();
        onHide();
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog d-flex justify-content-center align-items-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Congratulations {userName}!</h5>
                        <button type="button" className="close" onClick={onHide}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center">
                        <p>Choose your randomly generated avatar:</p>
                        <img src={avatarURL} alt="Random Avatar" className="img-fluid" />
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={regenerateAvatar}>
                            Regenerate Avatar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleAccept}>
                            Accept Avatar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvatarModal;
