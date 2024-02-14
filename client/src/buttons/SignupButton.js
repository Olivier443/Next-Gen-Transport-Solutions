import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const SignupButton = () => {
  return (
    <div>
      <Btn><NavLinkSignup to="/signup">Sign Up</NavLinkSignup></Btn>
    </div>
  )
}

export default SignupButton

const Btn = styled.button`
font-weight: bold;
border-radius: 6px;
padding: 4px 4px 4px 4px;
`

const NavLinkSignup = styled(NavLink)`
text-decoration: none;
`