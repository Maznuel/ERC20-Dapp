import { createGlobalStyle } from 'styled-components';


const GlobalStyled = createGlobalStyle`
*{
margin:0;
padding:0;
box-sizing:border-box;
}
body{
    background: #1b1b1b;
    font-family: 'Inter', sans-serif;
}
button{
    font-weight:bold;
    cursor:pointer;
    padding:1rem 2rem;
    font-size:1.1rem;
    border: 2px solid #23d997;
    background: transparent;
    color:white;
    transition: all 0.5s ease;
    &:hover{
        background:#23d997;
        color:white;
    }
}
h2{
        font-weight:lighter;
        font-size:3rem;
    }
    h3{
        color:white;
        color: #23d997
    }
    h4{
        font-weight:bold;
        font-size:2rem;
    }
    p{
        padding: 3rem 0rem;
        color: #ccc;
        font-size:1.2rem;
    }
    a{
        font-size:1.1rem;
    }
    span{
        font-weight:bold;
        color:#23d997;
    }

`;

export default GlobalStyled;