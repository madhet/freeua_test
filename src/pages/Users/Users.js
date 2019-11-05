import React from "react";
import request from "../../helpers/request";
import { useState, useEffect } from "react";
import UserList from "../../components/UserList/UserList";
import UserDetail from "../../components/UserDetail/UserDetail";
import EditUser from "../../components/EditUser/EditUser";

export default function Users(props) {
	const [serverError, setServerError] = useState(false);
	const [users, setUsers] = useState(null);
	const [currentUser, setCurrentUser] = useState("");
	const [showEdit, setEdit] = useState({ show: false, user: null });

	useEffect(() => {
		request("/users")
			.then(data => {
				setCurrentUser("");
				setUsers(data);
			})
			.catch(err => {
				if (err.message === "Failed to fetch") {
					setServerError(true);
				}
			});
	}, []);

	if (serverError) {
		return <div>No connection to server</div>;
	} else if (showEdit.show) {
		return (
			<EditUser
				user={showEdit.user}
				setEdit={setEdit}
				setUsers={setUsers}
				setCurrentUser={setCurrentUser}
			/>
		);
	} else {
		return (
			<div className="users-wrapper">
				<UserList
					users={users}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					setEdit={setEdit}
					routerProps={props}
				/>
				{currentUser ? (
					<UserDetail
						user={users.find(user => user._id === currentUser)}
						setCurrentUser={setCurrentUser}
						setEdit={setEdit}
						routerProps={props}
						setUsers={setUsers}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}
