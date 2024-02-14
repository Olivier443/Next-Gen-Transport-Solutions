import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const LogoutButton = () => {
  return (
    <div>
      <Btn><NavLinkSignOut to="/signout">Sign Out</NavLinkSignOut></Btn>
    </div>
  )
}

export default LogoutButton

const Btn = styled.button`

font-weight: bold;
border-radius: 6px;
padding: 4px 4px 4px 4px;
`

const NavLinkSignOut = styled(NavLink)`
text-decoration: none;
`