import React, { useState } from "react";

export default function MultiListItem({ list, parent, editTree }) {
	const [newValue, setNewValue] = useState("");

	function removeList(parent, item) {
		editTree("del-list", parent, item);
	}

	function addSublist(item) {
		editTree("add-sub", item);
	}

	function removeSublist(item) {
		editTree("del-sub", item);
	}

	function addListItem(item) {
		if (newValue) {
			editTree("add-item", item, newValue);
			setNewValue("");
		}
	}

	function itemMoveUp(parent, item) {
		editTree("move-up", parent, item);
	}

	function itemMoveDown(parent, item) {
		editTree("move-down", parent, item);
	}

	if (list.hasOwnProperty("length")) {
		return (
			<ul className="tree-sublist">
				{list.length
					? list.map((item, idx) => (
							<MultiListItem
								key={item.value + idx}
								list={item}
								parent={parent}
								editTree={editTree}
							/>
					  ))
					: ""}
				<div className="tree-additem-wrapper">
					<input
						type="text"
						value={newValue}
						onChange={e => setNewValue(e.target.value)}
						onKeyUp={e => {
							if (newValue && e.keyCode === 13) {
								addListItem(parent);
							}
						}}
					/>
					<button onClick={() => addListItem(parent)}>
						Add list
					</button>
				</div>
			</ul>
		);
	} else if (list.value) {
		return (
			<li>
				{list.value ? list.value : ""}
				{parent &&
				parent.sub.length > 1 &&
				parent.sub.indexOf(list) > 0 ? (
					<button onClick={() => itemMoveUp(parent, list)}>
						&uarr;
					</button>
				) : (
					""
				)}
				{parent && parent.sub.indexOf(list) < parent.sub.length - 1 ? (
					<button onClick={() => itemMoveDown(parent, list)}>
						&darr;
					</button>
				) : (
					""
				)}
				{list.hasOwnProperty("sub") && !list.sub ? (
					<button onClick={() => addSublist(list)}>+ sublist</button>
				) : (
					<button onClick={() => removeSublist(list)}>
						- sublist
					</button>
				)}
				{parent ? (
					<button onClick={() => removeList(parent, list)}>
						Remove
					</button>
				) : (
					""
				)}
				{list.sub ? (
					<MultiListItem
						list={list.sub}
						parent={list}
						editTree={editTree}
					/>
				) : (
					""
				)}
			</li>
		);
	} else if (list.hasOwnProperty("value") && list.sub) {
		return (
			<MultiListItem list={list.sub} parent={list} editTree={editTree} />
		);
	} else {
		return <div>Unable to create list</div>;
	}
}
