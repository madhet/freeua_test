import React, { useState } from "react";

export default function MultiListItem({ list, parent, isUpdated, updateTree }) {
	const [newValue, setNewValue] = useState("");

	function removeList(item, parent) {
		parent.delValue(item);
		updateTree(!isUpdated);
	}

	function addSublist(item) {
		item.addSub();
		updateTree(!isUpdated);
	}

	function removeSublist(item) {
		item.delSub();
		updateTree(!isUpdated);
	}

	function addListItem(item) {
		if (newValue) {
			item.addValue(newValue);
			setNewValue("");
			updateTree(!isUpdated);
		}
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
								isUpdated={isUpdated}
								updateTree={updateTree}
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
					<button
						onClick={() => {
							parent.moveUp(list.value);
							updateTree(!isUpdated);
						}}>
						&uarr;
					</button>
				) : (
					""
				)}
				{parent && parent.sub.indexOf(list) < parent.sub.length - 1 ? (
					<button
						onClick={() => {
							parent.moveDown(list.value);
							updateTree(!isUpdated);
						}}>
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
					<button onClick={() => removeList(list, parent)}>
						Remove
					</button>
				) : (
					""
				)}
				{list.sub ? (
					<MultiListItem
						list={list.sub}
						parent={list}
						isUpdated={isUpdated}
						updateTree={updateTree}
					/>
				) : (
					""
				)}
			</li>
		);
	} else if (list.hasOwnProperty("value") && list.sub) {
		return (
			<MultiListItem
				list={list.sub}
				parent={list}
				isUpdated={isUpdated}
				updateTree={updateTree}
			/>
		);
	} else {
		return <div>Unable to create list</div>;
	}
}
