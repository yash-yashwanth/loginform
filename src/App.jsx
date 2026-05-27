import { useState } from 'react';

const validate = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export default function App() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length === 0) {
      alert('Login successful!');
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
