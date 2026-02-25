import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    
    if (!email.trim() || !password || !confirmPassword) {
      throw new Error('Заполните все поля');
    }
    
    if (password.length < 6) {
      throw new Error('Пароль должен содержать минимум 6 символов');
    }
    
    if (password !== confirmPassword) {
      throw new Error('Пароли не совпадают');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Некорректный формат email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      validateForm();
      
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации');
      }

      setSuccess('✅ Регистрация успешна! Перенаправление...');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (err) {
      setError(err.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Регистрация</h2>
        
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="example@mail.com"
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={6}
              placeholder="Минимум 6 символов"
              autoComplete="new-password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Повторите пароль"
              autoComplete="new-password"
            />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="loader"></span>
            ) : (
              'Зарегистрироваться'
            )}
          </button>
        </form>
        
        <p className="auth-switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;