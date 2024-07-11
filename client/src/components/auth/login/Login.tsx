import React from "react";
import { useLogin } from "./useLogin";

export const Login: React.FC = () => {
  const { emailRef, passwordRef, handleSubmit, isLoading, error } = useLogin();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      <button type="submit">Login</button>
    </form>
  );
};
