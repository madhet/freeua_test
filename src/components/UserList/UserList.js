import React from "react";

export default function UserList({
	users,
	currentUser,
	setCurrentUser,
	setEdit,
	routerProps
}) {
	if (users) {
		return (
			<div className="user-list-wrapper">
				<button onClick={() => setEdit({ show: true, user: {} })}>
					New user
				</button>
				{/* <button
					onClick={() => {
						routerProps.history.push("/edit", {
							user: {}
						});
					}}>
					Edit
				</button> */}
				{users.length ? (
					<ul className="user-list">
						{users.map(user => {
							return (
								<li
									className={`user-list-item${
										user._id === currentUser
											? " active"
											: ""
									}`}
									key={user._id}
									onClick={() => setCurrentUser(user._id)}>
									{user.username}
								</li>
							);
						})}
					</ul>
				) : (
					<div className="user-list-empty">No users yet</div>
				)}
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
}
