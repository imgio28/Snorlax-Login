import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

function Landing() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark animate__animated animate__fadeIn" style={{
            backgroundImage: `url(/assets/snorlax4.gif)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="bg-light p-5 rounded shadow-lg text-center">
                <h1 className="text-dark text-center mb-4">Welcome to Snorlax Club! 😴</h1>
                <p className="text-secondary">Join us for a cozy and relaxing experience.</p>
                <div className="d-flex gap-3 mt-4 align-items-center justify-content-center">
                    <Link to="/login" className="btn btn-success btn-lg px-4 shadow-sm animate__animated animate__pulse animate__infinite">Login</Link>
                    <Link to="/register" className="btn btn-warning btn-lg px-4 shadow-sm animate__animated animate__pulse animate__infinite">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default App;