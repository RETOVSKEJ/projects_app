import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

export default function ProjectForm() {
  const { currentUser, setCurrentUser, fetchUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.pathname.includes("edit");

  const handleSubmit = async (formData) => {
    if (isEditing) {
      // Call API to edit project using id
    } else {
      // Call API to create project
    }

    // After API call is successful
    navigate("/projects");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here */}
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
    </form>
  );
}
