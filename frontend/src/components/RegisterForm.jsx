import { useState } from "react";
import { client } from "../App";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export default function RegisterForm({ setCurrentUser, edit }) {
  const [error, setError] = useState("");

  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(100),
      confirmPassword: z.string().min(8).max(100),
      age: z.number(),
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      gender: z.enum(["Male", "Female"]),
      phoneNumber: z
        .string()
        .optional()
        .refine(
          (value) => phoneRegex.test(value) || value === "",
          "Invalid Number!"
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  function handleRegister(data) {
    const { email, password, firstName, lastName, age, gender, phoneNumber } =
      data;
    client
      .post("/api/auth/register", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
        phone_number: phoneNumber,
      })
      .then((res) =>
        // AUTOMATICALLY LOGS IN THE USER
        client.post("/api/auth/login", {
          email,
          password,
        })
      )
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        if (err.response && Object.values(err.response.data)) {
          console.log(Object.values(err.response.data)[0]);
          setError(Object.values(err.response.data)[0]);
        } else {
          setError("Sorry, Some error happened. Please try again");
        }
      });
  }

  return (
    <>
      <form className="form-auth" onSubmit={handleSubmit(handleRegister)}>
        {error ? (
          <p className="text-red-600 font-medium text-lg">{error}</p>
        ) : null}
        <input type="email" placeholder="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          placeholder="Confirm password..."
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <input
          type="text"
          placeholder="First Name..."
          {...register("firstName")}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          type="text"
          placeholder="Last Name..."
          {...register("lastName")}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          type="number"
          placeholder="Age..."
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <span>{errors.age.message}</span>}
        <select
          name="gender"
          defaultValue="placeholder"
          {...register("gender")}
        >
          <option disabled value="placeholder">
            Your Gender...
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label className="self-start md:self-center font-bold">Optional:</label>
        <input
          type="tel"
          placeholder="Phone Number..."
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        <button className="bg-zinc-900" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}
