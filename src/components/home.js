import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './context';

function Home() {
    const { loggedInUser } = useContext(UserContext);
    const firstName = loggedInUser?.name.split(' ')[0];

    useEffect(() => {
        if (loggedInUser && loggedInUser.balance === 0) {
            setTimeout(() => {
                alert("Psst, looks like you need some funds, deposit some cash to build your empire.");
            }, 1500);  // Delaying the alert by 1 second
        }
    }, [loggedInUser]);


    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    {loggedInUser ? `Welcome ${firstName}!` : 'Welcome to BadBank'}
                </div>
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    {loggedInUser ? (
                        <>
                            <p className="card-text">
                                Look who's back! We've been waiting for you... Not in a creepy way, 
                                but more in a "we missed our favorite customer" kind of way.
                                For all your banking shenanigans, just head to the 
                                <Link to="/deposit"> deposit </Link> or 
                                <Link to="/withdraw"> withdraw </Link> 
                                page from the menu above.
                                Planning to invest? Do it responsibly, because guess what? 
                                Those little green bills won't grow on trees!
                                Oh, and a tiny tip if you're Vegas-bound: stash a little extra 
                                for those tempting slots and blackjack. Who knows, you might hit the jackpot!
                                Play safe, spend wisely, and always remember to have a blast!
                            </p>
                            <img src="/bank.png" alt="Bank Logo" className="img-fluid" style={{ width: "20%" }} />
                        </>
                    ) : (
                        <>
                            <h5 className="card-title">Your One-Stop Banking Solution</h5>
                            <p className="card-text">
                                🌟 Greetings from the universally acclaimed Bad Bank App! 🌟
                                Looking to dive into the world of banking? Well, you've hit the jackpot! 
                                From creating an account, to making it rain with deposits, or just giving 
                                that balance a little peek - we've got the magic wand for all your banking desires.
                                Got an account? Roll out the red carpet and <Link to="/login">log in</Link>. 
                                If not, fear not! <Link to="/createaccount">Create</Link> one using the glitzy 
                                navbar above, and join our extravagant banking party.
                                Once inside, let your financial dreams take flight. Deposit your treasures, 
                                withdraw some glittering cash, or simply gaze upon your ever-growing empire of wealth. 💰✨
                            </p>
                            <img src="/bank.png" alt="Bank Logo" className="img-fluid" style={{ width: "20%" }} />
                        </>
                    )}
                </div>
                {loggedInUser && (
                    <div className="card-header" style={{ fontWeight: 'normal', backgroundColor: '#f5f5f5' }}>
                        Account Balance: ${loggedInUser.balance.toFixed(2)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
