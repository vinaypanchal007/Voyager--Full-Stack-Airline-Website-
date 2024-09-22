import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Images/Logo.png';

function Navbar() {
	const navRef = useRef();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkLoginStatus = () => {
			const user = localStorage.getItem('user');
			setIsLoggedIn(!!user);
		};

		checkLoginStatus();

		// Optional: Listen for storage changes if multiple tabs are used
		window.addEventListener('storage', checkLoginStatus);

		return () => {
			window.removeEventListener('storage', checkLoginStatus);
		};
	}, []);

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token')
		setIsLoggedIn(false);
		navigate('/');
	};

	return (
		<header>
			<p className="aura">
				<Link to='/'>
					<img className="logo" src={Logo} alt="logo" />
					<h4>VOYAGER</h4>
				</Link>
			</p>
			<nav ref={navRef}>
				<Link to='/'>Booking</Link>
				<Link to='/MyBooking'>My Booking</Link>
				<Link to='/Lounge'>Lounge</Link>
				<Link to='/Baggage'>Baggage</Link>
				<Link to='/About Us'>About Us</Link>
				<Link to='/Help'>Help</Link>
				{isLoggedIn ? (
					<button className="btn-logic logout" onClick={handleLogout}>Logout</button>
				) : (
					<Link to='/Login' className="btn-logic">Login</Link>
				)}
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
