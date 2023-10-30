import React, { createContext, useState } from 'react';

// Initial state for the context
const initialState = {
  users: [],
  loggedInUser: null,
  addUser: () => {},
  findUser: () => {},
  updateUserBalance: () => {},
  setLoggedInUser: () => {},
  doesEmailExist: () => {}
};

// Create the context
export const UserContext = createContext(initialState);

/**
 * Generates a random avatar URL using the avataaars.io API.
 * @returns {string} The URL of the randomly generated avatar.
 */
export const generateRandomAvatarURL = () => {
    const options = {
      avatarStyle: ['Circle', 'Transparent'],
      topType: ['ShortHairTheCaesar', 'ShortHairShortRound', 'LongHairShavedSides', 'LongHair', 'NoHair', 'Hijab', 'Turban', 'LongHairFroBand', 'ShortHairShaggyMullet', 'LongHairMiaWallace'],
      accessoriesType: ['Prescription01', 'Prescription02', 'Sunglasses', 'Blank', 'Round', 'Kurt', 'Wayfarers'],
      hairColor: ['Blue', 'Black', 'Brown', 'Blonde', 'Platinum', 'Red', 'BlondeGolden', 'SilverGray'],
      facialHairType: ['Blank', 'BeardMedium', 'MoustacheFancy', 'BeardLight', 'MoustacheMagnum', 'BeardMajestic'],
      facialHairColor: ['BlondeGolden', 'Black', 'Red', 'BrownDark', 'Blonde'],
      clotheType: ['ShirtCrewNeck', 'BlazerShirt', 'Hoodie', 'CollarSweater', 'BlazerSweater'],
      clotheColor: ['PastelRed', 'PastelBlue', 'PastelGreen', 'PastelYellow', 'Blue02', 'Gray01', 'Blue03'],
      eyeType: ['Happy', 'Sad', 'Surprised', 'Default', 'EyeRoll', 'Cry', 'Wink', 'WinkWacky'],
      eyebrowType: ['UpDownNatural', 'Default', 'Angry', 'RaisedExcited', 'DefaultNatural'],
      mouthType: ['Default', 'Smile', 'Serious', 'Sad', 'Eating', 'Concerned', 'Tongue'],
      skinColor: ['Pale', 'Tanned', 'Dark', 'Light', 'Brown', 'Black', 'Yellow'],
      graphicType: ['Hola', 'Bear', 'SkullOutline', 'Diamond'],
      hatColor: ['Gray02', 'PastelOrange', 'PastelBlue']
    };

    let url = "https://avataaars.io/?";

    for (let key in options) {
        url += `${key}=${options[key][Math.floor(Math.random() * options[key].length)]}&`;
    }

    return url.slice(0, -1);  // Remove the trailing '&'
};

/**
 * The provider component for the User context.
 * This component manages and provides all user-related functionality to its children.
 */
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  /**
   * Adds a new user to the users state.
   * @param {object} user The user to be added.
   */
  const addUser = (user) => {
    user.email = user.email.toLowerCase();
    setUsers([...users, user]);
  };

  /**
   * Finds a user by their email.
   * @param {string} email The email of the user to be found.
   * @returns {object|null} The found user or null if not found.
   */
  const findUser = (email) => {
    return users.find(user => user.email === email.toLowerCase());
  };

  /**
   * Checks if a given email already exists among the users.
   * @param {string} email The email to check.
   * @returns {boolean} True if the email exists, otherwise false.
   */
  const doesEmailExist = (email) => {
    return users.some(user => user.email === email.toLowerCase());
  };

  /**
   * Updates the balance of a user with a given email.
   * @param {string} email The email of the user to be updated.
   * @param {number} amount The amount to add/subtract from the user's balance.
   */
  const updateUserBalance = (email, amount) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.email === email) {
          return { ...user, balance: user.balance + amount };
        }
        return user;
      });
      return updatedUsers;
    });

    if (loggedInUser && loggedInUser.email === email) {
      setLoggedInUser(prevUser => ({ ...prevUser, balance: prevUser.balance + amount }));
    }
  };

  // Prepare the context value
  const contextValue = {
    users,
    loggedInUser,
    addUser,
    findUser,
    updateUserBalance,
    setLoggedInUser,
    doesEmailExist,
  };

  // Return the provider component
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
