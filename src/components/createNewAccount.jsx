import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';

const DivContainer = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: 300px;
  height: 400px;
  padding: 30px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
`;

const ToggleLoginButton = styled.button`
  padding: 10px;
  padding-left: ${(props) => props.$paddingL}px;
  padding-right: ${(props) => props.$paddingR}px;
`;

function CreateNewAccount() {
  const [userName, setUserName] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [comparePasswordValue, setComparePasswordValue] = useState('');

  const { setLogin, users, setUsers } = useContext(UserContext);

  function handleCreateAccount() {
    // Denna delen jämföra med databasen istället.
    if (users.length > 0) {
      if (users.some((user) => user.user === userName)) {
        return alert('Ditt användarnamn måste vara unikt');
      }
    }
    // ---------------------------------------------
    if (passwordValue !== comparePasswordValue) {
      alert('Ditt lösenord matchar inte');
    } else {
      alert(`Du har skapat ett konto`);
      // Denna delen med ...
      if (users.length > 0) {
        setUsers([
          ...users,
          { user: userName, password: passwordValue, favoriteBooks: [] },
        ]);
      } else {
        setUsers([
          { user: userName, password: passwordValue, favoriteBooks: [] },
        ]);
      }
      // -----------------------------------------
      setUserName('');
      setPasswordValue('');
      setComparePasswordValue('');
      setLogin(true);
    }
  }

  return (
    <DivContainer>
      {/* Här skulle jag behöva en action och method på formelementet */}
      <FormContainer onSubmit={handleCreateAccount}>
        <h2 className="login-header">Skapa konto</h2>
        {/* Behöver sätta attributet name på inputfälten */}
        <input
          type="text"
          placeholder="Användarnamn"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Lösenord"
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Upprepa lösenord"
          onChange={(e) => setComparePasswordValue(e.target.value)}
          value={comparePasswordValue}
          className="login-input"
        />

        <button disabled={!userName || !passwordValue || !comparePasswordValue}>
          Skapa konto
        </button>
      </FormContainer>

      <ToggleLoginButton
        onClick={() => setLogin(true)}
        $paddingL={75}
        $paddingR={75}
      >
        Logga in
      </ToggleLoginButton>
    </DivContainer>
  );
}

export default CreateNewAccount;
