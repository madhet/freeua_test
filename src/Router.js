import React from "react";
import { Route } from "react-router-dom";
import MainMenu from "./layouts/MainMenu/MainMenu";
import Users from "./pages/Users/Users";
import List from "./pages/List";
import Edit from "./pages/Edit";

const router = [
	{
		path: "/",
		exact: true,
		layout: MainMenu,
		component: Users
	},
	{
		path: "/list",
		exact: true,
		layout: MainMenu,
		component: List
	},
	{
		path: "/edit",
		exact: true,
		layout: MainMenu,
		component: Edit
	}
];

export default () =>
	router.map((item, idx) => (
		<Route
			key={item.path + idx}
			exact={item.exact}
			path={item.path}
			render={props => (
				<item.layout {...props}>
					<item.component {...props} />
				</item.layout>
			)}
		/>
	));
