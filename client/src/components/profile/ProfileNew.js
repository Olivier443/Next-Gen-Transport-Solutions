import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../users/UserContext';
import styled from 'styled-components';
import img from '../../assets/truck.jpg';

// This is the component that allows the user to create his profile.

const ProfileNew = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // This useEffect verifies if the profile already exists in the collection Profile.
  // So, if it returns a status code of 200, this means that the profile was found, and so, there is no need to create it again.
  // It will use the handler getProfileFromUserId in the ProfileApi in the back end to verify.
  useEffect(() => {
    fetch(`/user/profile/${currentUser._id}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          alert("Your profile exists! Do not create it!");
          navigate(`/${currentUser.type}`);
        }
      })
  }, [currentUser._id]);

  // Function that allows to add the profile into the collection Profile.
  const postClientNewProfile = (Company, Name, Tel, Email, Number, Street1, Street2, SteNum, City, State, Zip, Country,
    yearInService, status) => {
    fetch('/client/profile', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User: currentUser, Company: Company, name: Name, type: 'client', Tel: Tel, Email: Email,
        Number: Number, Street1: Street1, Street2: Street2, SteNum: SteNum, City: City, State: State, Zip: Zip, Country: Country,
        yearInService: yearInService, status: status
      })
    })
      .then(res => res.json())
      .then((jsonData) => {
        alert(jsonData.message);
        if (jsonData.status === 201) {
          navigate(`/${currentUser.type}`);
        }
      })
  }

  // This handler gets the values that the user typed and pass them into the funciton postClientNewProfile().
  const handleProfileSubmit = (ev) => {
    ev.preventDefault();
    const Company = document.getElementById('Company').value.toUpperCase();
    const Name = document.getElementById('Name').value.toUpperCase();
    const Tel = document.getElementById('Tel').value.toUpperCase();
    const Email = document.getElementById('Email').value.toUpperCase();
    const Number = document.getElementById('Number').value.toUpperCase();
    const Street1 = document.getElementById('Street1').value.toUpperCase();
    const Street2 = document.getElementById('Street2').value.toUpperCase();
    const SteNum = document.getElementById('SteNum').value.toUpperCase();
    const City = document.getElementById('City').value.toUpperCase();
    const State = document.getElementById('State').value.toUpperCase();
    const Zip = document.getElementById('Zip').value.toUpperCase();
    const Country = document.getElementById('Country').value.toUpperCase();
    const yearInService = document.getElementById('yearInService').value.toUpperCase();
    const status = document.getElementById('status').value.toUpperCase();

    postClientNewProfile(Company, Name, Tel, Email, Number, Street1, Street2, SteNum, City, State, Zip, Country, yearInService, status);
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv>
          <H1>{currentUser.type} Profile</H1>
        </TitleDiv>

        <div>
          <form onSubmit={handleProfileSubmit}>
            <ClientCriteria>
              <div>
                <div>
                  <H3>Company Address:</H3>
                </div>
                <ClientAddressCriteria>
                  <Label htmlFor='Company'>Company Name:</Label>
                  <Input id='Company' name='Company' type='text' placeholder='enter your company name...' />
                </ClientAddressCriteria>
                <ClientAddressCriteria>
                  <Label htmlFor='Name'>Contact Name:</Label>
                  <Input id='Name' name='Name' type='text' placeholder='enter your contact name...' />
                </ClientAddressCriteria>
                <ClientAddressCriteria>
                  <Label htmlFor='Tel'>Phone:</Label>
                  <Input id='Tel' name='Tel' type='tel' placeholder='enter your phone number...' />
                </ClientAddressCriteria>
                <ClientAddressCriteria>
                  <Label htmlFor='Email'>Email:</Label>
                  <Input id='Email' name='Email' type='email' placeholder='enter your company email...' />
                </ClientAddressCriteria>
              </div>
            </ClientCriteria>

            <ClientCriteria>

              <div>
                <div>
                  <H3>Company Address:</H3>
                </div>
                <ClientAddressCriteria>
                  <Label htmlFor='Number'>Number:</Label>
                  <InputAddress id='Number' name='Number' type='number' min='1' placeholder='enter your street/Ave number...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='Street1'>Street/Ave Name 1:</Label>
                  <InputAddress id='Street1' name='Street1' type='text' placeholder='enter your street/Ave name...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='Street2'>Street/Ave Name 2:</Label>
                  <InputAddress id='Street2' name='Street2' type='text' placeholder='enter your street/Ave name...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='SteNum'>Suite Number:</Label>
                  <InputAddress id='SteNum' name='SteNum' type='number' min='1' placeholder='enter your suite number...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='City'>City:</Label>
                  <InputAddress id='City' name='City' type='text' placeholder='enter your city...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='State'>Province/State:</Label>
                  <InputAddress id='State' name='State' type='text' placeholder='enter your province/state...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='Zip'>Postal Code/Zip Code:</Label>
                  <InputAddress id='Zip' name='Zip' type='text' placeholder='enter your postal/zip code...' />
                </ClientAddressCriteria>

                <ClientAddressCriteria>
                  <Label htmlFor='Country'>Country:</Label>
                  <InputAddress id='Country' name='Country' type='text' placeholder='enter your country...' />
                </ClientAddressCriteria>
              </div>

            </ClientCriteria>

            <ClientCriteria>
              <Label htmlFor='yearInService'>Year in service:</Label>
              <InputAddress id='yearInService' name='yearInService' type='number' min='1900' max='2024' placeholder='enter year in service' />
            </ClientCriteria>

            <ClientCriteria>
              <Label htmlFor='status'>Status:</Label>
              <select id='status' name='status'><option>Select</option><option>Active</option><option>Not active</option></select>
            </ClientCriteria>

            <ClientCriteria>
              <Btn id='btnPost'>Create Profile</Btn>
              <Btn onClick={navigateMenu}>Back to Menu</Btn>
            </ClientCriteria>
          </form>
        </div>
      </SectionDiv>
    </PageDiv>
  )
}

export default ProfileNew

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 82vh;
margin: 6vh 0 0 0;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
width: 34vw;
height: 80vh;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 0 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
overflow: scroll;
`

const TitleDiv = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
width: 28vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 1vh 1vw 1vh 1vw;
border: solid black 1px;
`

const ClientCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 26vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const ClientAddressCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
font-weight: bold;
width: 24vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const H1 = styled.h1`
color: #fff;
`

const H3 = styled.h3`
color: #fff;
`

const Label = styled.label`
color: #fff;
font-weight: bold;
width: 14vw;
`

const Input = styled.input`
width: 10vw;
border-radius: 8px;
border: solid black 1px;
`

const InputAddress = styled.input`
width: 18vw;
border-radius: 8px;
border: solid black 1px;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 6vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`