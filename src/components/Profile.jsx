import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;
  const Navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      console.log(profile);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      // console.log("Profile update payload:", form);
      const result = await axios.patch(url, form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchProfile();
      setError("Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <h3 className="profile-title">My Profile</h3>
      <div className="profile-error">{error}</div>

      <form className="profile-form">
        <input
          className="profile-input"
          name="firstname"
          type="text"
          defaultValue={profile.firstname}
          onChange={handleChange}
        />
        <input
          className="profile-input"
          name="lastname"
          type="text"
          defaultValue={profile.lastname}
          onChange={handleChange}
        />
        <input
          className="profile-input"
          name="email"
          type="text"
          defaultValue={profile.email}
          onChange={handleChange}
        />
        <input
          className="profile-input"
          name="password"
          type="password"
          defaultValue={profile.password}
          onChange={handleChange}
        />
        <button className="profile-btn" type="button" onClick={handleSubmit}>Update Profile</button>
        <button className="profile-btn" onClick={logout}>Logout</button>
      </form>
    </div>
  );
}