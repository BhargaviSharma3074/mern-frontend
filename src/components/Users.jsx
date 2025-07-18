// import axios from 'axios';
// import React, { useRef } from 'react'
// import { useEffect,useState } from 'react'

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState();
//   const frmRef = useRef();
//   const [form, setForm] = useState({
//     firstname:"", 
//     lastname:"", 
//     email:"", 
//     password:"", 
//     role:"",
//   });
//   const [page, setPage] = useState(1);
//   const [searchVal, setSearchVal] = useState("")
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(2);
//   const [editId, setEditId] = useState();
//   const API_URL = import.meta.env.VITE_BACKEND;
//   const fetchUsers = async () => {
//     try{
//       setError("Loading...");
//       const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
//       const result = await axios.get(url);
//     setUsers(result.data.users);
//     setTotalPages(result.data.total);
//     setError()
// }
//     catch(err){
//       console.log(err);
//       setError("Something went wrong!")
//     }
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, [page]);
//   const handleDelete = async (id) => {
//     try{
//       const url = `${API_URL}/api/users/${id}`;
//       const result = await axios.delete(url);
//       setError("User deleted successfully!");
//       fetchUsers();
//     }
//     catch(err){
//       console.log(err);
//       setError("Something went wrong!");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]:e.target.value})
//   }

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     const frm = frmRef.current;
//     if(!frm.checkValidity()){
//       frm.reportValidity();
//       return;
//     }
//     try{
//       const url = `${API_URL}/api/users`;
//       const result = await axios.post(url, form);
//       setError("User added successfully!");
//       fetchUsers();
//       resetForm();
//     }
//     catch(err){
//       console.log(err);
//       setError("Something went wrong!");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditId(user._id);
//     setForm({
//         ...form, 
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//         password: user.password,
//         role: user.role,
//     });
//   };

//   const handleUpdate = async(e) => {
//     e.preventDefault();
//     try{
//       const url = `${API_URL}/api/users/${editId}`;
//       const result = await axios.patch(url, form);
//       fetchUsers();
//       setEditId();
//       resetForm();
//       setError("User information updated successfully!");
//     }
//     catch(err){
//       console.log(err);
//       setError("Something went wrong!");
//     }
//   };

//   const handleCancel = () => {
//     setEditId();
//     resetForm();
//   }
  
//   const resetForm = () => {
//     setForm({
//       ...form,
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//       role: "",
//     });
//   };
//     return ( 
//     <div>
//       <h2>User Management</h2>
//       {error}
//       <div>
//         <form ref={frmRef}>
//           <input 
//             name="firstname"
//             value={form.firstname}
//             type="text"
//             placeholder="First Name"
//             onChange={handleChange}
//             required
//           />
//           <input 
//             name="lastname"
//             value={form.lastname}
//             type="text"
//             placeholder="Last Name"
//             onChange={handleChange}
//             required
//           />
//           <input 
//             name="email"
//             value={form.email}
//             type="text"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />
//           <input 
//             name="password"
//             value={form.password}
//             type="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//           <select 
//             name="role"
//             value={form.role}
//             type="text"
//             onChange={handleChange}
//           >
//             <option value="">--Select Role--</option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           {/* <input
//             name="role"
//             value={form.role}
//             type="text"
//             onChange={handleChange}
//             placeholder="Role"
//           /> */}
//           {editId ? (
//             <>
//             <button onClick={handleUpdate}>Update</button>
//             <button onClick={handleCancel}>Cancel</button>
//             </>
//           ) : (
//             <button onClick={handleAdd}>Add</button>
//           )}
//         </form>
//       </div>
//       <div>
//         <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
//         <button onClick={() => fetchUsers()}>Search</button>
//       </div>
//       <div>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email Address</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           {(users || []).map((value) => (
//             <tbody key={value._id}>
//               <tr>
//                 <td>{value.firstname}</td>
//                 <td>{value.lastname}</td>
//                 <td>{value.email}</td>
//                 <td>{value.role}</td>
//                 <td>
//                   <button onClick={() => handleEdit(value)}>Edit</button>
//                   <button onClick={() => handleDelete(value._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           ))}
//         </table>
//       </div>
//     <div>
//       <button disabled={page===1} onClick={() => setPage(page-1)}>Previous </button>
//       Page {page} of {totalPages || 0}
//       <button disabled={page===totalPages} onClick={() => setPage(page+1)}> Next</button>
//     </div>
//     </div>
//     );
  
// }








// ================================================================================================================


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
    <div>
      <h2>User Management</h2>
      {error}
      <div>
        <form ref={frmRef}>
          <input
            name="firstname"
            value={form.firstname}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            name="lastname"
            value={form.lastname}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            value={form.email}
            type="text"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            value={form.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <select
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
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>
      <div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={() => fetchUsers()}>Search</button>
      </div>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          {(users || []).map((value) => (
            <tbody key={value._id}>
              <tr>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <button onClick={() => handleEdit(value)}>Edit</button>
                  <button onClick={() => handleDelete(value._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        Page {page} of {totalPages || 0}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
