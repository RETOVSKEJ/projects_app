import { useState } from "react";
import { client } from "../App";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export default function EditForm({ currentUser, setCurrentUser, edit }) {
  const [error, setError] = useState("");
  console.log(currentUser);

  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(100),
      confirmPassword: z.string().min(8).max(100),
      age: z.number(),
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      gender: z.enum(["Male", "Female"]),
      phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
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
      .post("/api/auth/user/edit", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
        phone_number: phoneNumber,
      })
      .then((res) => {
        setCurrentUser(email);
      })
      .catch((err) => {
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
      <form className="form-auth" onSubmit={handleSubmit(handleRegister)}>
        <input
          type="email"
          placeholder="email"
          value={currentUser.email}
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <input
          type="text"
          placeholder="First Name"
          value={currentUser.first_name}
          {...register("firstName")}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          type="text"
          placeholder="Last Name"
          value={currentUser.last_name}
          {...register("lastName")}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input
          type="number"
          placeholder="Age"
          value={currentUser.age}
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <span>{errors.age.message}</span>}
        <select
          name="gender"
          defaultValue={currentUser.gender}
          {...register("gender")}
        >
          <option disabled value="placeholder">
            Your Gender...
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label className="self-start font-bold">Optional:</label>
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phoneNumber")}
          value={currentUser.phone_number}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        <button className="bg-zinc-900" type="submit">
          Edytuj Dane
        </button>
      </form>
    </>
  );
}
