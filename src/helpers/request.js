const request = (url, method = "GET", body = null) => {
	let options = {
		method: "",
		headers: {}
	};
	if (method) {
		options.method = method;
		if (method === "PUT") {
			options.body = body;
		} else if ((method === "POST" || method === "PATCH") && body) {
			options.body = JSON.stringify(body);
			options.headers["Content-Type"] = "application/json";
		}
	}
	return fetch("http://localhost:4000" + url, options).then(
		res => {
			if (res.status >= 200 && res.status <= 300) {
				return res.json();
			} else {
				alert(res.status + " " + res.statusText);
			}
		},
		rej => {
			// alert("No connection!");
			throw rej;
		}
	);
};

export default request;
