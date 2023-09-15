import { useState } from "react";
import { client } from "../App";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm({ setCurrentUser }) {
  const [error, setError] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  function handleLogin(data) {
    const { email, password } = data;
    client
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (Object.values(err.response.data)[0]) {
          console.log(Object.values(err.response.data)[0][0]);
          setError(Object.values(err.response.data)[0][0]);
        } else {
          setError("Sorry, Some error happened. Please try again");
        }
      });
  }

  return (
    <>
      {error ? <p className="text-red-500 font-bold text-xl">{error}</p> : null}
      <form className="form-auth" onSubmit={handleSubmit(handleLogin)}>
        <input type="email" placeholder="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
