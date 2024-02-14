import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from '../components/users/UserContext';
import img from '../assets/truck.jpg'
import styled from 'styled-components';

const Homepage = () => {

  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <PageDiv>
        <H2>Next-Gen Transport Solutions is the ultimate app allowing you to find any available carrier 365/24/7 to haul your load in North America!</H2>
        <H3>Clients have transportation needs.</H3>
        <H4>Carriers advertise their routes, trucks, services, availability, and pricing in real time.</H4>
        <H4>The list of available carriers for your transportation needs will then be displayed after you provide simple information such as pickup site, truck type, service required...</H4>
        <H4>You can then contact the carrier, and make the transportation arrangements.</H4>
        <H4>Next-Gen Transport Solutions offer you also the possibility to define your own transportation needs and to provide them directly to the carriers around the pick-up site. So, they can recontact you.</H4>
        <H3>Carriers are offering transportation solutions</H3>
        <H4>Carriers have the capacity to create, update, and delete routes, assign trucks, and services to their routes, and display their pricing.</H4>
        <H4>All of that in real time.</H4>

        {/* // Allows to have the users access to the part of the website they are allowed to visit by using the type that they selected at the time they signed up.
        // The buttons will appear after they sign in. */}
        <DivMain>
          <SectionDiv>
            <H2W>For carriers</H2W>
            <H3W>Create, Update, Delete routes</H3W>
            {(currentUser && ((currentUser.type === 'Carrier') || (currentUser.type === 'Admin'))) &&
              <Btn><BtnNavLink to="/carrier">Click here</BtnNavLink></Btn>}
          </SectionDiv>

          <SectionDiv>
            <H2W>For Clients</H2W>
            <H3W>Find transportation solutions</H3W>
            {(currentUser && ((currentUser.type === 'Client') || (currentUser.type === 'Admin'))) && <Btn><BtnNavLink to="/client">Click here</BtnNavLink></Btn>}
          </SectionDiv>

          <SectionDiv>
            <H2W>Support</H2W>
            <H3W>Access to the support to find answers to your questions</H3W>
            {currentUser && <Btn><BtnNavLink to="/SupportSide">Click here</BtnNavLink></Btn>}
          </SectionDiv>
        </DivMain>
      </PageDiv>
    </div>
  )
}

export default Homepage

const PageDiv = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 82vh;
margin: 6vh 0 0 0;
padding: 1vh 1vw 1vh 1vw;
background-image: url(${img});
background-size: 100vw 100vh;
font-family: Nunito, serif;
`

const DivMain = styled.div`
Display: flex;
justify-content: space-between;
`

const SectionDiv = styled.div`
background-color: #232526;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 30vw;
height: auto;
padding: 1vh 1vw 4vh 1vw;
border-radius: 8px;
border: solid black 1px;
margin: 4vh 1vw 1vh 1vw;
box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`

const H2 = styled.h2`
color: #000;
padding: 2vh 0 2vh 0;
margin: 0 0 0 0;
font-family: "Nunito", serif;
`

const H2W = styled.h2`
color: #fff;
padding: 2vh 0 2vh 0;
`

const H3 = styled.h3`
color: #000;
padding: 1vh 0 1vh 0;
`

const H3W = styled.h3`
color: #fff;
padding: 1vh 0 2vh 0;
`

const H4 = styled.h4`
color: #000;

`

const BtnNavLink = styled(NavLink)`
text-decoration: none;
color: #fff;
`

const Btn = styled.button`
margin-right: 4px;
font-weight: bold;
border-radius: 30px;
padding: 4px 4px 4px 4px;
text-decoration: none;
background-color: #480048;
width: 8vw;
color: #fff;
&:hover {
  background-color: #E4E5E6;
  color: #00416A;
}
`