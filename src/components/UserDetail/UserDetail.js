import React from "react";
import { dateToStr } from "../../helpers/helpers";
import request from "../../helpers/request";

export default function UserDetail({
	user,
	setEdit,
	setUsers,
	setCurrentUser
}) {
	function deleteUser(id) {
		if (id) {
			if (window.confirm("Delete this user?")) {
				request(`/users/${id}`, "DELETE").then(() => {
					setCurrentUser("");
					setUsers(prevState => {
						return prevState.filter(item => item._id !== id);
					});
				});
			}
		}
	}

	return (
		<div className="user-detail">
			<div className="user-detail-photo">
				{user.photo ? (
					<img
						className="user-photo"
						src={user.photo}
						alt={user.photo}
					/>
				) : (
					<div className="user-photo-none">No photo</div>
				)}
			</div>
			<div className="user-detail-item">
				<div className="user-detail-label">Username:</div>
				<div className="user-detail-content">{user.username}</div>
			</div>
			<div className="user-detail-item">
				<div className="user-detail-label">Email:</div>
				<div className="user-detail-content">{user.email}</div>
			</div>
			<div className="user-detail-item">
				<div className="user-detail-label">Date of birth:</div>
				<div className="user-detail-content">
					{dateToStr(user.birthday)}
				</div>
			</div>
			<div className="user-detail-item">
				<div className="user-detail-label">Age:</div>
				<div className="user-detail-content">{user.age}</div>
			</div>
			<div className="user-detail-item">
				<div className="user-detail-label">Phone:</div>
				<div className="user-detail-content">{user.phone}</div>
			</div>
			<button onClick={() => setEdit({ show: true, user: user })}>
				Edit user
			</button>
			<button onClick={() => deleteUser(user._id)}>Delete user</button>
		</div>
	);
}
