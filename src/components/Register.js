import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <section className="auth">
      <h1 className="auth__title" >Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input auth__input_margin" value={email || ''} onChange={handleChangeEmail} placeholder="Email" type="email"></input>
        <input className="auth__input auth__input_margin" value={password || ''} onChange={handleChangePassword} placeholder="Пароль" type="password" 
        minLength="5"></input>
        <button className="auth__submit-button" type='submit'>Зарегистрироваться</button>
      </form>
      <Link className="auth__link" to="/signin">Уже зарегистрированы? Войти</Link>
    </section>
  )
}

export default Register;