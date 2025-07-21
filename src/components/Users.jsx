import "./Users.css";
import axios from 'axios';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { AppContext } from "../App";


export default function Users() {
  const { user } = useContext(AppContext); // Get token from context
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, config);
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, config);
      setError("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users`;
      await axios.post(url, form, config);
      setError("User added successfully!");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      ...form,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${editId}`;
      await axios.patch(url, form, config);
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully!");
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="users-container">
      <h2 className="users-title">User Management</h2>
      <div className="users-error">{error}</div>
      <div className="users-form-section">
        <form ref={frmRef} className="users-form">
          <input
            className="users-input"
            name="firstname"
            value={form.firstname}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            className="users-input"
            name="lastname"
            value={form.lastname}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            className="users-input"
            name="email"
            value={form.email}
            type="text"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="users-input"
            name="password"
            value={form.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <select
            className="users-input"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {editId ? (
            <>
              <button className="users-btn users-update-btn" onClick={handleUpdate}>Update</button>
              <button className="users-btn users-cancel-btn" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="users-btn users-add-btn" onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>
      <div className="users-search-section">
        <input
          className="users-search-input"
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="users-btn users-search-btn" onClick={() => fetchUsers()}>Search</button>
      </div>
      <div className="users-table-section">
        <table className="users-table" border="1">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map((value) => (
              <tr key={value._id}>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <button className="users-btn users-edit-btn" onClick={() => handleEdit(value)}>Edit</button>
                  <button className="users-btn users-delete-btn" onClick={() => handleDelete(value._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-pagination">
        <button className="users-btn users-prev-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="users-page-info">Page {page} of {totalPages || 0}</span>
        <button className="users-btn users-next-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
