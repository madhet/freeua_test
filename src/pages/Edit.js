import React from "react";

export default function Edit(props) {
	// console.log(props);
	return (
		<div>
			Edit
			<button
				onClick={() => {
					props.history.push("/", {
						action: "edit",
						user: {}
					});
				}}>
				Back
			</button>
		</div>
	);
}
