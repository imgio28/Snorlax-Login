import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [employeeName, setEmployeeName] = useState("");
    const [snorlaxTimer, setSnorlaxTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [snorlaxFact, setSnorlaxFact] = useState("");
    const snorlaxFacts = [
        "Snorlax is known for its immense size and love for sleeping.",
        "It is one of the original 151 Pokémon.",
        "Snorlax can block roads with its massive size.",
        "Snorlax sleeps for 20 hours a day!",
        "Its body is known to be so heavy it can cause tremors.",
    ];

    // Initialize audio objects using useRef to ensure they persist
    const snorsleep = useRef(new Audio("/assets/sleep.mp3"));
    const wake = useRef(new Audio("/assets/wake.mp3"));
    const snorlaxSound = useRef(new Audio("/assets/snorlax_sound.mp3"));

    // Initialize the useNavigate hook
    const navigate = useNavigate();

    // Load stored name
    useEffect(() => {
        const storedName = localStorage.getItem("employeeName");
        if (storedName) {
            setEmployeeName(storedName);
        }

        // Pick a random Snorlax fact
        const randomFact = snorlaxFacts[Math.floor(Math.random() * snorlaxFacts.length)];
        setSnorlaxFact(randomFact);
    }, []);

    // Timer function to simulate Snorlax's sleeping time
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setSnorlaxTimer(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    // Play Snorlax sound
    const playSnorlaxSound = () => {
        snorlaxSound.current.play();
    };

    // Pause Snorlax sound
    const pauseSnorlaxSound = () => {
        snorlaxSound.current.pause();
        snorlaxSound.current.currentTime = 0;  // Reset to the start
    };

    // Handle timer start
    const handleStartTimer = () => {
        snorsleep.current.play();
        setIsTimerRunning(true);
        alert("Snorlax is now sleeping! 💤");  
    };

    // Handle timer stop
    const handleStopTimer = () => {
        snorsleep.current.pause();
        snorsleep.current.currentTime = 0;  // Reset the sleep sound
        setIsTimerRunning(false);
        alert("Snorlax woke up! 😲");
        wake.current.play();
    };

    // Handle logout
    const handleLogout = () => {
        setEmployeeName(""); 
        localStorage.removeItem("employeeName"); 
        alert("Goodbye from Snorlax! 👋");  // Show goodbye message
        navigate("/login");  // Redirect to the login page
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: "url(/assets/snorlax2.gif)", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-light p-5 rounded shadow-lg animate__animated animate__fadeIn text-center">
                <h2 className="text-dark">Welcome to Snorlax's Home</h2>
                {employeeName ? <p className="text-dark">Welcome, {employeeName}! Snorlax says hi! 😴</p> : <p className="text-dark">Welcome to the home page!</p>}

                <div className="mt-4">
                    <h4 className="text-dark">Fun Snorlax Facts</h4>
                    <p className="text-secondary">{snorlaxFact}</p>
                </div>

                <div className="mt-4">
                    <h4 className="text-dark">Snorlax Sleep Timer</h4>
                    <p className="text-secondary">Snorlax has been sleeping for: <strong>{snorlaxTimer} seconds</strong></p>
                    <button 
                        onClick={isTimerRunning ? handleStopTimer : handleStartTimer} 
                        className="btn btn-primary mt-2">
                        {isTimerRunning ? "Stop Sleeping" : "Start Sleeping"}
                    </button>
                </div>

                <div className="mt-4">
                    <h4 className="text-dark">Snorlax Quiz</h4>
                    <button onClick={() => alert("Quiz coming soon!")} className="btn btn-warning mt-2">Take Snorlax Quiz</button>
                </div>

                <div className="mt-4">
                    <button onClick={playSnorlaxSound} className="btn btn-success mt-2">Play Snorlax Sound</button>
                </div>
                <div className="mt-4">
                    <button onClick={pauseSnorlaxSound} className="btn btn-success mt-2">Pause Snorlax Sound</button>
                </div>

                {/* Logout button */}
                <div className="mt-4">
                    <button onClick={handleLogout} className="btn btn-danger mt-2">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
