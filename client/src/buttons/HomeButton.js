import React from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const HomeButton = () => {
  return (
    <div>
      <Btn><NavLinkHome to="/">🏠 Home</NavLinkHome></Btn>
    </div>
  )
}

export default HomeButton

const Btn = styled.button`

font-weight: bold;
border-radius: 6px;
padding: 4px 4px 4px 4px;
`
const NavLinkHome = styled(NavLink)`
text-decoration: none;
`