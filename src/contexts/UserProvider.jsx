import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

function UserContextProvider({ children }) {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );
  const [login, setLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.title = currentUser
      ? `${currentUser}'s bibliotek`
      : 'Labb 1 React';
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const value = {
    users,
    setUsers,
    login,
    setLogin,
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
