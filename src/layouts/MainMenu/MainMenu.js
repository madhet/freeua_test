import React from "react";
import { NavLink } from "react-router-dom";

export default function MainMenu(props) {
	return (
		<div className="app">
			<nav className="main-menu">
				<NavLink to="/">Users</NavLink>
				<NavLink to="/list">List</NavLink>
			</nav>
			{props.children}
		</div>
	);
}
