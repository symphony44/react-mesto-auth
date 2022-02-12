import logo from '../images/mesto_logo.svg';

function Header() {
    return ( 
    <header className="header">
       <img className="logo" src={logo} alt="логотип проекта Место" /> 
    </header>
    )
}

export default Header;