import React, { Component } from 'react';
import styled from 'styled-components';


const Nav = () => {
  return (
    <StyledNav>
      <h1>NikiToken</h1>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
min-height:10vh;
display:flex;
margin:auto;
justify-content:center;
align-items:center;
padding: 1rem 10rem;
background: #282828;
h3{
    color:white;
    text-decoration:none;
}
ul{
    display:flex;
    list-style:none;
}
li{
    padding-left:10rem;
}
h1{
    font-size:1.8rem;
    font-weight: lighter;
    color:white;
}

`;

export default Nav;