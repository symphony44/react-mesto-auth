import React from 'react';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import logo from '../images/mesto_logo.svg';

function Header(props) {

    const history = useHistory();

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/signin');
        props.setLoggedIn(false);
      };
    
      const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    
      React.useEffect(() => {
        setMenuIsOpen(false);
      }, [props.loggedIn])

    return ( 
      <>
    {menuIsOpen && 
    <div className={`header__auth-menu ${menuIsOpen && "header__auth-menu_visible"}`}>
        <span className="header__user header__user_visible">{props.userData}</span>
        <button className="header__auth-link header__auth-link_signout" onClick={signOut}>Выйти</button>
    </div>}  
    <header className="header">
       <img className="logo" src={logo} alt="логотип проекта Место" />
       <nav className="header__menu">
          <Switch>
            <Route path="/signup">
              <Link className="header__auth-link" to="/signin" aria-label="Переход на страницу авторизации">Войти</Link>
            </Route>
            <Route path="/signin">
              <Link className="header__auth-link" to="/signup" aria-label="Переход на страницу регистрации">Регистрация</Link>
            </Route>
            <Route path="/">
              <span className="header__user">{props.userData}</span>
              <button className="header__auth-link header__auth-link_signout" onClick={signOut}>Выйти</button>
            </Route>
          </Switch>
        </nav> 
    </header>
    </>
    )
}

export default Header;