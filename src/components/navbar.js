import React, { useContext } from 'react';
import { Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from './context';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handler for logout functionality
  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="sm">
      {/* Logo/Home link */}
      <HomeLink loggedInUser={loggedInUser} />

      {/* Show user account details if user is logged in */}
      {loggedInUser && <AccountDetailsLink user={loggedInUser} />}

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {/* Show deposit and withdraw options for authenticated users */}
        {loggedInUser ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
        
        {/* Always visible links */}
        <Nav className="ml-auto">
          {/* Link to view detailed data of all accounts */}
          <TooltipLink to="/alldata" tooltip="View detailed information about all accounts and the currently logged-in user">
            AllData
          </TooltipLink>
          
          {/* Logout button for authenticated users */}
          {loggedInUser && <LogoutButton onLogout={handleLogout} />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Component for the home link, changes based on authentication state
const HomeLink = ({ loggedInUser }) => (
  <TooltipLink to="/" tooltip="Go to Home">
    {loggedInUser ? (
      <img
        src="/bank.png"
        alt="Bank Logo"
        style={{ width: '30px', height: 'auto', marginLeft: '20px' }}
      />
    ) : (
      'BadBank'
    )}
  </TooltipLink>
);

// Component to display user details if logged in
const AccountDetailsLink = ({ user }) => (
  <TooltipLink to="/" tooltip="View Account Details">
    <Nav className="ml-5 mr-5 d-flex align-items-center">
      <img
        src={user.avatarURL}
        alt="User Avatar"
        style={{ height: '35px', marginRight: '30px', borderRadius: '50%' }}
      />
      <span>  {user.name}'s   balance: ${user.balance.toFixed(2)}</span>
    </Nav>
  </TooltipLink>
);

// Navigation links visible when user is authenticated
const AuthenticatedLinks = () => (
  <Nav className="justify-content-center w-50">
    <TooltipLink to="/deposit" tooltip="Deposit money to your account">Deposit</TooltipLink>
    <TooltipLink to="/withdraw" tooltip="Withdraw money from your account">Withdraw</TooltipLink>
  </Nav>
);

// Navigation links visible when user is not authenticated
const UnauthenticatedLinks = () => (
  <Nav className="d-flex justify-content-center w-100">
    <TooltipLink to="/createaccount" tooltip="Create a new account">Create Account</TooltipLink>
    <TooltipLink to="/login" tooltip="Login to your account">Login</TooltipLink>
  </Nav>
);

// Component for links with tooltips
const TooltipLink = ({ to, tooltip, children }) => (
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip>{tooltip}</Tooltip>}
  >
    <LinkContainer to={to}>
      <Nav.Link>{children}</Nav.Link>
    </LinkContainer>
  </OverlayTrigger>
);

// Component for the logout button
const LogoutButton = ({ onLogout }) => (
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip>Logout from your account</Tooltip>}
  >
    <Nav.Link onClick={onLogout}>Logout</Nav.Link>
  </OverlayTrigger>
);

export default NavBar;
