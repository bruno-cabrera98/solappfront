import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: Raleway, sans-serif;
  font-size: 18px;
  height: 40px;
  margin: 10px 5px ;
  padding: 0 10px;
  line-height: 40px;
  border-radius: 5px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  :active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const NavContainer = styled.nav`
  background: #08010f;
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
`;

function Navbar() {
  return (
    <NavContainer>
      <NavBarItem to="/">
        Home
      </NavBarItem>
      <NavBarItem to="/downloads">
        Downloads
      </NavBarItem>
    </NavContainer>

  );
}

export default Navbar;
