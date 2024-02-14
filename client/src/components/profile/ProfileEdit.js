import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import img from '../../assets/truck.jpg'
import styled from 'styled-components';
import { UserContext } from '../users/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

const ProfileEdit = () => {

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  const [currentProfile, setCurrentProfile] = useState(''); // Allow to store the profile of the user.
  // const [message, setMessage] = useState('');

  // This useEffect allows to retrieve the profile based on the userId and store it with the setCurrentProfile.
  useEffect(() => {
    fetch(`/user/profile/${currentUser._id}`)
      .then(res => res.json())
      .then((jsonData) => {
        if (jsonData.status === 200) {
          setCurrentProfile(jsonData.data);
        } else {
          // setCurrentProfile(null);
          alert(jsonData.message);
          navigate(`/${currentUser.type.toLowerCase()}`);
        }
        // setMessage(jsonData.message);
      })
  }, [currentUser._id, currentUser.type, navigate]);

  /* useEffect(() => {
  }, [currentProfile]) */

  // Allows to send the profile updated. This is handled by the handler updateProfile.js in the backend.
  // The values of the modified fields are passed into patchProfile due to the handleProfileSubmit calling it.
  const patchProfile = () => {

    fetch('/carrier/profile', {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentProfile)
    })
      .then(res => res.json())
      .then((jsonData) => {
        console.log(`jsonData: ${JSON.stringify(jsonData)}`);
        alert(jsonData.message);
        if (jsonData.status === 200) {
          navigate(`/${currentUser.type}`);
        }
      })
  }

  // Allows to first retrieve the information of the profile that was first fetched, and then to update the fields modified with the new values.
  // The profile that was first stored with the useEffect is now updated with the values that the user modified.
  const handleChange = (e) => {
    setCurrentProfile({ ...currentProfile, [e.target.name]: e.target.value });
  };

  // Allows to pass all the values in the fields to patchProfile(). 
  const handleProfileSubmit = (ev) => {
    console.log(`ev=`, ev);
    ev.preventDefault();
    patchProfile();
  }

  const navigateMenu = (() => {
    navigate(`/${currentUser.type.toLowerCase()}`);
  })

  return (
    <PageDiv>
      <SectionDiv>
        <TitleDiv>
          <H1><FontAwesomeIcon icon={faWrench} /> Modify your Profile</H1>
        </TitleDiv>
        {currentProfile && (
          <>
            <ClientInstructions>
              <PRED>Update the fields you wish to update and submit your changes</PRED>
            </ClientInstructions>

            <div>
              <form onSubmit={handleProfileSubmit}>
                <ClientCriteria>
                  <Label htmlFor='Company'>Company Name:</Label>
                  <Input id='Company' name='Company' type='text' placeholder='enter your company name...'
                    value={currentProfile.Company} onChange={handleChange} />
                </ClientCriteria>
                <ClientCriteria>
                  <Label htmlFor='Name'>Contact Name:</Label>
                  <Input id='name' name='name' type='text' placeholder='enter your contact name...'
                    value={currentProfile.name} onChange={handleChange} />
                </ClientCriteria>
                <ClientCriteria>
                  <Label htmlFor='Tel'>Contact Phone:</Label>
                  <Input id='Tel' name='Tel' type='tel' placeholder='enter your phone number...'
                    value={currentProfile.Tel} onChange={handleChange} />
                </ClientCriteria>
                <ClientCriteria>
                  <Label htmlFor='Email'>Contact Email:</Label>
                  <Input id='Email' name='Email' type='email' placeholder='enter your company email...'
                    value={currentProfile.Email} onChange={handleChange} />
                </ClientCriteria>

                <ClientCriteria>
                  <div>
                    <div>
                      <H3>Company Address:</H3>
                    </div>
                    <ClientAddressCriteria>
                      <Label htmlFor='Number'>Number:</Label>
                      <InputAddress id='Number' name='Number' type='number' min='1' placeholder='enter your street/Ave number...'
                        value={currentProfile.Number} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='Street1'>Street/Ave Name 1:</Label>
                      <InputAddress id='Street1' name='Street1' type='text' placeholder='enter your street/Ave name...'
                        value={currentProfile.Street1} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='Street2'>Street/Ave Name 2:</Label>
                      <InputAddress id='Street2' name='Street2' type='text' placeholder='enter your street/Ave name...'
                        value={currentProfile.Street2} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='SteNum'>Suite Number:</Label>
                      <InputAddress id='SteNum' name='SteNum' type='number' min='1' placeholder='enter your suite number...'
                        value={currentProfile.SteNum} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='City'>City:</Label>
                      <InputAddress id='City' name='City' type='text' placeholder='enter your city...'
                        value={currentProfile.City} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='State'>Province/State:</Label>
                      <InputAddress id='State' name='State' type='text' placeholder='enter your province/state...'
                        value={currentProfile.State} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='Zip'>Postal Code/Zip Code:</Label>
                      <InputAddress id='Zip' name='Zip' type='text' placeholder='enter your postal/zip code...'
                        value={currentProfile.Zip} onChange={handleChange} />
                    </ClientAddressCriteria>

                    <ClientAddressCriteria>
                      <Label htmlFor='Country'>Country:</Label>
                      <InputAddress id='Country' name='Country' type='text' placeholder='enter your country...'
                        value={currentProfile.Country} onChange={handleChange} />
                    </ClientAddressCriteria>
                  </div>
                </ClientCriteria>

                <ClientCriteria>
                  <Label htmlFor='yearInService'>Year in service:</Label>
                  <InputSmall id='yearInService' name='yearInService' type='number' min='1900' max='2024' placeholder='enter year in service'
                    value={currentProfile.yearInService} onChange={handleChange} />
                </ClientCriteria>

                <ClientCriteria>
                  <Label htmlFor='status'>Status:</Label>
                  <Select id='status' name='status' value={currentProfile.status} onChange={handleChange}><option>Select</option><option>Active</option><option>Not active</option></Select>
                </ClientCriteria>

                <ClientCriteria>
                  <Btn id='btnPost'>Update Profile</Btn>
                  <Btn onClick={navigateMenu}>Back to Menu</Btn>
                </ClientCriteria>
              </form>
            </div>
          </>
        )}
      </SectionDiv>
    </PageDiv>
  )
}

export default ProfileEdit

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
border: solid black 1px;
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
width: 30vw;
height: auto;
padding: 1vh 1vw 1vh 1vw;
border-radius: 30px;
margin: 2vh 1vw 2vh 1vw;
`

const Select = styled.select`
width: 6vw;
border-radius: 8px;
border: solid black 1px;
`

const PRED = styled.p`
color: #ED213A;
`

const ClientCriteria = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: space-between;
align-items: center;
font-weight: bold;
width: 30vw;
height: auto;
border: solid black 1px;
padding: 1vh 1vw 1vh 1vw;
border-radius: 8px;
margin: 1vh 0 1vh 0;
`

const ClientInstructions = styled.div`
background-color: #414345;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
width: 30vw;
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
justify-content: center;
font-weight: bold;
width: 28vw;
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

const InputSmall = styled.input`
width: 6vw;
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