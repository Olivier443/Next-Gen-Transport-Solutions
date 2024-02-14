import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const LoginButton = () => {
  return (
    <div>
      <Btn><NavLinkSignIn to="/signin">Sign In</NavLinkSignIn></Btn>
    </div>
  )
}

export default LoginButton

const Btn = styled.button`

font-weight: bold;
border-radius: 6px;
padding: 4px 4px 4px 4px;
`

const NavLinkSignIn = styled(NavLink)`
text-decoration: none;
`