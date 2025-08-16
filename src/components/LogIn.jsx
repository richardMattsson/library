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

function LogIn() {
  const [userName, setUserName] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const { setLogin, users, setCurrentUser } = useContext(UserContext);

  function handleLogIn() {
    // Denna delen skulle jag byta ut och jämföra med databasen istället
    const logInSuccess = users.some(
      (user) => user.user === userName && user.password === passwordValue
    );
    // -------------------------------------------------------------------

    if (logInSuccess) {
      setCurrentUser(userName);
      setUserName('');
      setPasswordValue('');
    } else {
      alert('Något verkar fel med ditt användarnamn eller lösenord.');
    }
  }

  return (
    <DivContainer>
      <FormContainer onSubmit={handleLogIn}>
        <h2 className="login-header">Logga in</h2>
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

        <button disabled={!userName || !passwordValue}>Logga in</button>
      </FormContainer>

      <ToggleLoginButton
        onClick={() => setLogin(false)}
        $paddingL={45}
        $paddingR={45}
      >
        Skapa nytt konto
      </ToggleLoginButton>
    </DivContainer>
  );
}

export default LogIn;
