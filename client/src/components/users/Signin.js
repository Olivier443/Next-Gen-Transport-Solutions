import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import { useNavigate } from "react-router-dom";
import img from '../../assets/truck.jpg'
import styled from 'styled-components';

const Signin = () => {

  const navigate = useNavigate();

  const signTypeIndex = window.location.href.indexOf('sign');
  const signType = window.location.href.slice(signTypeIndex);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [type, setType] = useState(null);

  const [errorMessage, setErrorMessage] = useState(() => {
    if (currentUser && window.location.href.indexOf('signin') >= 0) {
      return `You are already logged in, ${currentUser.fullName}`;
    } else {
      return '';
    }
  });

  const [nextMessage, setNextMessage] = useState(() => {
    if (currentUser && window.location.href.indexOf('signout') >= 0) {
      sessionStorage.removeItem('loginUser');
      setCurrentUser(null);
      return `You are logged out`;
    } else {
      return '';
    }
  });

  useEffect(() => {
    if (nextMessage === 'You are logged out') {
      navigate('/');
    }
  }, [errorMessage, nextMessage]);

  const getUserAndNavigate = (action, ident, passwd, type = null, fullName = '') => {

    fetch('/users', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: action, _id: ident, passwd: passwd, type: type, fullName: fullName }) // req.body should be a string. So, we stringify the object user
    })
      .then(res => res.json())
      .then((jsonData) => {
        switch (jsonData.status) {
          case 200:
            setCurrentUser(jsonData.data);
            sessionStorage.setItem('loginUser', JSON.stringify(jsonData.data)); // To maintain the session must have a chain of characters. So, we stringify (we cannot put an object in the sessionStorage)
            setNextMessage('');
            setErrorMessage('');

            switch (jsonData.data.type) {
              case 'Carrier':
              case 'Client':
              case 'Admin':
              case 'Support':
                navigate(`/`);
                break;

              default:
                break;
            }

            break;

          case 201:
            setNextMessage(`${jsonData.message} - You may sign in`);
            setErrorMessage('');
            document.getElementById('ident').value = '';
            document.getElementById('passwd').value = '';
            document.getElementById('fullname').value = '';
            break;

          case 404:
            setErrorMessage(`${jsonData.message}`);
            setNextMessage(``);
            break;

          default:
            setErrorMessage(`ERROR returned status = ${jsonData.status}. Wrong ID and/or Password.`);
            setNextMessage(``);
            break;
        }
      })
      .catch(err => {
        setErrorMessage(`${err}`);
      })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const ident = document.getElementById('ident').value;
    const passwd = document.getElementById('passwd').value;
    let type = '';
    let fullName = '';
    if (signType === 'signup') {
      type = document.getElementById('type').value;
      fullName = document.getElementById('fullname').value;
    }
    let action = "";

    switch (ev.target.id) { // The ev.target.id returns either buttonSign or buttonCreate. If this is something else, we fall in the default (e.g., ident)

      case "buttonSign":
        action = "get";
        getUserAndNavigate(action, ident, passwd);
        break;

      case "buttonCreate":
        action = "create";
        getUserAndNavigate(action, ident, passwd, type, fullName);
        break;

      default:
        break;
    }
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <PageDiv>
      {currentUser === null ? (
        <form onClick={handleSubmit}>
          <DivForm>
            <TitleButtonDiv>
              {signType === 'signin' && (<H2>Sign In</H2>)}
              {signType === 'signup' && (<H2>Sign Up - New User</H2>)}
            </TitleButtonDiv>
            <Error>{errorMessage}</Error>
            <NextMessage>{nextMessage}</NextMessage>

            <UL>
              <LI><Label><strong>Ident:</strong></Label><Input id='ident' placeholder='Your identifiant' name="ident" autoComplete="current-user" required /></LI>
              <LI><Label><strong>Password:</strong></Label><Input autoComplete="current-password" type='password' id='passwd' placeholder='Your password' name="passwd" required /></LI>
              {signType === 'signup' && (
                <>
                  <LI><Label><strong>Type:</strong></Label><Select id='type' name='type' value={type || ''} onChange={handleTypeChange}><option>Select your type</option><option>Client</option><option>Carrier</option></Select></LI>
                  <LI><Label><strong>Full Name:</strong></Label><Input id='fullname' placeholder='Your full name' name="fullname" required /></LI>
                </>
              )}
            </UL>

            {(signType === 'signin') && (<Button id='buttonSign' type='submit' name="signin" value="Sign in" />)}
            {(signType === 'signup') && (<Button id='buttonCreate' type='submit' name="createacct" value="Create account" />)}

          </DivForm>
        </form>
      ) : (
        <>
          <Error>{errorMessage}</Error>
          <NextMessage>{nextMessage}</NextMessage>
        </>
      )}
    </PageDiv>
  )
}

export default Signin;

const PageDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 82vh;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const DivForm = styled.div`
width: 80vw;
height: 70vh;
background-color: rgba(204, 85, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const TitleButtonDiv = styled.div`
background-color: #414345;
display: flex;
width: auto;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 0 1vw 2vh 1vw;
`

const LI = styled.li`
color: #fff;
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 36vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 1vw 1vh 1vw;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
`

const Input = styled.input`
width: 14vw;
border-radius: 4px;
border: solid black 1px;
`

const Select = styled.select`
border-radius: 4px;
border: solid black 1px;
`

const Button = styled(Input)`
width: 38vw;
height: 4vh;
color: #fff;
  font-weight: bold;
background-color: #480048;
  border-radius: 30px;

  &:hover {
    background-color: #E4E5E6;
    color: #00416A;
  }
`

const NextMessage = styled.h2`
color: #00571d;
`
const Error = styled(NextMessage)`
color: #ED213A;
`

const H2 = styled.h2`
font-size: 30px;
color: #fff;
`

const UL = styled.ul`
border: solid black 1px;
border-radius: 8px;
padding: 1vh 0 1vh 0;
margin: 4vh 0 4vh 0;
width: 38vw;
display: flex;
flex-direction: column;
align-items: center;
`
