import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import LockerImg from "../../assets/images/locker.svg";

import "./styles.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleOnSubmit(e: any) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    }

    fetch('http://localhost:5173/api/login', requestOptions)
    .then(response => response.json())
    .then(data => {
      if(data.status === 200) {
        navigate("/dashboard");
      } else {
        console.log(` ${data.status}: ${data.message} `)
      }
    })
  }
  
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src={LockerImg} alt="locker" />
          <h5>Login</h5>
        </div>
        <form onSubmit={handleOnSubmit} className="login-form">
          <input 
            type="email" 
            placeholder="Seu e-mail"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Sua senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <div className="checkbox-container">
            <input 
              type="checkbox" 
              name="remember-me"
            />
            <label>Lembre-se de mim.</label>
          </div>
          <button type="submit">Entrar</button>
          <a href="#">Esqueceu a sua senha?</a>
        </form>
        <p>Copyright @Mobilius 2022.</p>
      </div>
    </div>
  );
}
