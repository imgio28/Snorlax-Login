import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const HandleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data.message === "Login successful") {
                    localStorage.setItem("employeeName", result.data.user.name);
                    navigate('/home');
                } else {
                    alert("Email or Password is incorrect");
                }
            })
            .catch(() => alert("An error occurred. Please try again."));
    };

    return (
        <div data-bs-theme= "dark" className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "url(/assets/snorlax1.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-dark p-5 rounded shadow-lg animate__animated animate__fadeIn">
                <h2 className="text-center text-light">Snorlax Login</h2>
                <form onSubmit={HandleSubmit}>
                    <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-info btn-lg w-100 text-light shadow-sm">Login</button>
                </form>
                <br/>
                <div>
                <Link to="/" className="btn btn-danger btn-lg w-100 shadow-sm">Back</Link>
                </div>
                <br/>
                <p className="text-center text-light">Don't have an account? <Link to="/register" className="text-primary">Register</Link></p><br />
                
            </div>
        </div>
    );
}

export default Login;