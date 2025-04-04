import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(() => {
                alert("Registration successful");
                navigate('/login');
            })
            .catch(() => alert("Registration failed"));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "url(/assets/snorlax3.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-light p-5 rounded shadow-lg animate__animated animate__fadeIn">
                <h2 className="text-center text-dark">Snorlax Register</h2>
                <form onSubmit={HandleSubmit}>
                    <input type="text" placeholder="Name" className="form-control mb-3" onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-info w-100 shadow-sm">Register</button>
                </form>
                <p className="text-center mt-3">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;