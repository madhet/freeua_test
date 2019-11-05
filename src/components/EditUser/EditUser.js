import React, { Component } from "react";
import {
	checkDate,
	dateToStr,
	calcAge,
	strToDate
} from "../../helpers/helpers";
import request from "../../helpers/request";

const FormInput = ({
	type,
	name,
	label,
	value,
	isRequired,
	errorMessage,
	inputChange,
	validateOnBlur
}) => {
	return (
		<div className="form-input-wrapper">
			<div className="form-input-label">
				{label + ": "}
				{isRequired ? <span className="span-required">*</span> : ""}
			</div>
			<input
				className={`form-input${errorMessage ? " error" : ""}`}
				type={type}
				name={name}
				value={value}
				required={isRequired}
				onChange={event => inputChange(event)}
				onBlur={event => validateOnBlur(event)}
			/>
			<div className="form-input-error">{errorMessage}</div>
		</div>
	);
};

const FormInputFile = ({ name, label, accept, inputChange }) => {
	return (
		<div className="form-input-wrapper">
			<div className="form-input-label">{label + ": "}</div>
			<input
				type="file"
				name={name}
				accept={accept}
				onChange={event => inputChange(event)}
			/>
		</div>
	);
};

export default class EditUser extends Component {
	state = {
		_id: "",
		username: "",
		email: "",
		birthday: "",
		age: 0,
		photo: "",
		phone: "",
		usernameIsValid: false,
		usernameErrorMessage: "",
		emailIsValid: false,
		emailErrorMessage: "",
		birthdayIsValid: false,
		birthdayErrorMessage: "",
		phoneIsValid: false,
		phoneErrorMessage: "",
		formIsValid: false
	};

	validData = {
		username: /^[0-9a-zA-Z]+$/i,
		email: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i,
		birthday: /^\d{2}\/\d{2}\/\d{4}$/i,
		phone: /^\+?\d+$/i
	};

	userData = this.props.user;

	componentDidMount() {
		if (this.props.user._id) {
			const {
				_id,
				username,
				email,
				birthday,
				age,
				photo,
				phone
			} = this.props.user;
			this.setState({
				_id,
				username,
				email,
				birthday: dateToStr(birthday),
				age,
				photo,
				phone
			});
		}
	}

	validateField = (name, value) => {
		if (name === "username") {
			if (!value) return false;
			else if (value && value.length < 3) return false;
			else if (value && !this.validData[name].test(value)) return false;
		} else if (name === "email") {
			if (!value) return false;
			else if (value && !this.validData[name].test(value)) return false;
		} else if (name === "birthday") {
			if (!value) return false;
			else if (value && !this.validData[name].test(value)) return false;
			else if (value && !checkDate(value)) return false;
		} else if (name === "phone") {
			if (value && !this.validData[name].test(value)) return false;
		}
		return true;
	};

	validateOnBlur = event => {
		let { name, value } = event.target;
		let isValid = true;
		let errorMessage = "";
		if (!this.validateField(name, value)) {
			isValid = false;
			if (name === "username") {
				errorMessage = "Username is incorrect";
			} else if (name === "email") {
				errorMessage = "Email is incorrect";
			} else if (name === "birthday") {
				errorMessage = "Date is incorrect";
			} else if (name === "phone") {
				errorMessage = "Phone is incorrect";
			}
		}
		this.setState({
			[name + "IsValid"]: isValid,
			[name + "ErrorMessage"]: errorMessage
		});
	};

	inputChange = event => {
		let { name, value } = event.target;
		if (event.target.type === "file") {
			let file = event.target.files[0];
			if (event.target.files.length) {
				if (
					!["image/jpg", "image/jpeg", "image/png"].includes(
						file.type
					)
				) {
					alert("Unsupported filetype!");
					event.target.value = "";
					value = "";
				} else if (file.size > 1024 * 1024) {
					alert("File is too big!");
					event.target.value = "";
					value = "";
				} else {
					value = event.target.files[0].name;
				}
			} else value = "";
		}
		let isValid = true;
		let errorMessage = "";
		if (name === "username") {
			if (value && !this.validData[name].test(value)) {
				isValid = false;
				errorMessage = "Username is incorrect";
			}
		} else if (name === "phone") {
			if (value && !this.validData[name].test(value)) {
				isValid = false;
				errorMessage = "Phone is incorrect";
			}
		}
		this.setState({
			[name]: value,
			[name + "IsValid"]: isValid,
			[name + "ErrorMessage"]: errorMessage
		});
	};

	submitForm = event => {
		event.preventDefault();
		let age = calcAge(this.state.birthday);
		this.setState({ age });
		let { _id, username, email, birthday, photo, phone } = this.state;
		let method = _id ? "PATCH" : "POST";
		let url = `/users${_id ? "/" + _id : ""}`;
		let bd = strToDate(birthday);
		let resBody = {
			username,
			email,
			birthday: bd,
			age,
			photo,
			phone
		};
		// if (_id) {
		// 	for (let key in this.userData) {
		// 		if (this.userData[key] !== this.state[key])
		// 			testB[key] = this.state[key];
		// 	}
		// } else {
		// 	resBody = {
		// 		username,
		// 		email,
		// 		birthday: bd,
		// 		age,
		// 		photo,
		// 		phone
		// 	};
		// }

		request(url, method, resBody).then(user => {
			this.props.setUsers(prevState => {
				if (prevState.findIndex(item => item._id === user._id) === -1) {
					this.props.setCurrentUser("");
					return prevState.concat(user);
				} else {
					return prevState.map(item =>
						item._id === user._id ? user : item
					);
				}
			});
			this.props.setEdit({ show: false });
		});
	};

	render() {
		const {
			_id,
			username,
			email,
			birthday,
			photo,
			phone,
			usernameErrorMessage,
			emailErrorMessage,
			birthdayErrorMessage,
			phoneErrorMessage
		} = this.state;
		let buttonEnabled =
			this.validateField("username", username) &&
			this.validateField("email", email) &&
			this.validateField("birthday", birthday) &&
			this.validateField("phone", phone);
		return (
			<div className="user-edit-form-wrapper">
				<h2>{_id ? "Edit user" : "Create user"}</h2>
				<form className="user-edit-form" onSubmit={this.submitForm}>
					<div className="form-photo-wrapper">
						{photo ? (
							<img
								className="form-photo"
								src={photo}
								alt={photo}
							/>
						) : (
							""
						)}
						<FormInputFile
							name="photo"
							label="Photo"
							accept=".jpg, .jpeg, .png"
							inputChange={this.inputChange}
						/>
					</div>
					<FormInput
						type="text"
						name="username"
						label="Username (only letters and digits)"
						value={username}
						isRequired={true}
						errorMessage={usernameErrorMessage}
						inputChange={this.inputChange}
						validateOnBlur={this.validateOnBlur}
					/>
					<FormInput
						type="text"
						name="email"
						label="Email"
						value={email}
						isRequired={true}
						errorMessage={emailErrorMessage}
						inputChange={this.inputChange}
						validateOnBlur={this.validateOnBlur}
					/>
					<FormInput
						type="text"
						name="birthday"
						label="Date of birth (mm/dd/yyyy)"
						value={birthday}
						isRequired={true}
						errorMessage={birthdayErrorMessage}
						inputChange={this.inputChange}
						validateOnBlur={this.validateOnBlur}
					/>
					<FormInput
						type="text"
						name="phone"
						label="Phone"
						value={phone}
						errorMessage={phoneErrorMessage}
						inputChange={this.inputChange}
						validateOnBlur={this.validateOnBlur}
					/>
					<input
						className="form-submit-button"
						type="submit"
						value={_id ? "Save" : "Create"}
						disabled={!buttonEnabled}
					/>
					<button
						className="form-submit-button"
						onClick={() => this.props.setEdit({ show: false })}>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}
