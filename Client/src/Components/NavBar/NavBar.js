import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export default function NavBar() {
	const { user } = useContext(AuthContext);

	return (
		<nav className="nav">
			<Link to="/dashboard" className="site-title">
				BEARMAX
			</Link>

			{user ? (
				<ul>
					<CustomLink to="/dashboard">Main Dashboard</CustomLink>
					<CustomLink to="/all-notes">Report History</CustomLink>
					<CustomLink to="/emotion-game">Emotion Game Review</CustomLink>
					<CustomLink to="/how-to-use">How To Use</CustomLink>
					<CustomLink to="/settings">Settings</CustomLink>
				</ul>
			) : (
				<ul>
					<CustomLink to="/">Home</CustomLink>
					<CustomLink to="/about-us">About BearMax</CustomLink>
					<CustomLink to="/contact-us">Contact Us</CustomLink>
				</ul>
			)}
		</nav>
	);
}

function CustomLink({ to, children, ...props }) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}
