import React from "react";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
