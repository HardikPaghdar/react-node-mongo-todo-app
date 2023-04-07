// Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../api';

const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
      const token = await login(email, password);
      console.log(token, "")
      // Store token in local storage
      localStorage.setItem('token', token);

      // Redirect to dashboard page
      history('/dashboard');
      }
      catch(error){
        if (error.response && error.response.status === 401) {
          setErrors({ email: 'Invalid email or password' });
        } else {
          setErrors({ email:'Invalid email or password' });
      }
    }
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <span className='error'>{errors.password}</span>
          )}
        </div>
        <button type='submit' className='btn-primary'>
          Login
        </button>
      </form>
      <div className='register-link'>
        Don't have an account? <Link to='/register'>Register here</Link>
      </div>
    </div>
  );
};

export default Login;
