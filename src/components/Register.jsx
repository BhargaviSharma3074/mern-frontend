import "./Register.css";
import { useState,useRef } from "react";
import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
export default function Register() {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const handleSubmit = async () => {
        try{
            const url = "http://localhost:8080/api/users/register";
            // const url = `${import.meta.env.VITE_BACKEND}/api/users/register`;
            const result = await axios.post(url,user);
            setError("Data saved successfully!")}
        catch(err)
        {
            console.log(err);
            setError("Something went wrong!");
        }

    }
      
    return (
        <div className="App-Register-Row">
            <div>
            <h2>Registration Form</h2>
            {error}
            <p>
                <input type="text" placeholder="Enter First Name" onChange={(e) => setUser({...user,firstname: e.target.value})}  />
            </p><br />
            <p>
                <input type="text" placeholder="Enter Last Name" onChange={(e) => setUser({...user,lastname: e.target.value})} />
            </p><br />
            <p>
                <input type="text" placeholder="Enter Email Address" onChange={(e) => setUser({...user,email: e.target.value})} />
            </p><br />
            <p>
                <input type="password" placeholder="Enter Password" onChange={(e) => setUser({...user,password: e.target.value})} />
            </p><br />
            <p><button onClick={handleSubmit}>Submit</button></p>
            </div>
        </div>
    );
}

// export default function Register() {
//     const fname = useRef();
//     const lname = useRef();
//     const email = useRef();
//     const password = useRef();
//     const handleSubmit = () => {
//         const user = {
//             fname: fname.current.value,
//             lname: lname.current.value,
//             email: email.current.value,
//             password: password.current.value,
//         }
//         console.log(user);
//     }
//     return (
//         <div className="App-Register-Row">
//             <div>
//             <h2>Registration Form</h2>
//             <p>
//                 <input type="text" placeholder="Enter First Name" ref={fname}  />
//             </p><br />
//             <p>
//                 <input type="text" placeholder="Enter Last Name" ref={lname} />
//             </p><br />
//             <p>
//                 <input type="text" placeholder="Enter Email Address" ref={email} />
//             </p><br />
//             <p>
//                 <input type="password" placeholder="Enter Password" ref={password} />
//             </p><br />
//             <p><button onClick={handleSubmit}>Submit</button></p>
//             </div>
//         </div>
//     );
// }