import React, { useState } from "react";

export default function MultiListItem({
	list,
	parent,
	isUpdated,
	updateTree,
	changeTree
}) {
	const [newValue, setNewValue] = useState("");

	function removeList(parent, item) {
		// parent.delValue(item);
		changeTree(prevTree => {
			prevTree.getNode(parent).delValue(item);
			return prevTree;
		});
		updateTree(!isUpdated);
	}

	function addSublist(item) {
		// item.addSub();
		changeTree(prevTree => {
			prevTree.getNode(item).addSub();
			return prevTree;
		});
		updateTree(!isUpdated);
	}

	function removeSublist(item) {
		// item.delSub();
		changeTree(prevTree => {
			prevTree.getNode(item).delSub();
			return prevTree;
		});
		updateTree(!isUpdated);
	}

	function addListItem(item) {
		if (newValue) {
			// item.addValue(newValue);
			changeTree(prevTree => {
				prevTree.getNode(item).addValue(newValue);
				return prevTree;
			});
			setNewValue("");
			// updateTree(!isUpdated);
		}
	}

	function itemMoveUp(parent, item) {
		// parent.moveUp(list.value);
		changeTree(prevTree => {
			prevTree.getNode(parent).moveUp(item.value);
			return prevTree;
		});
		updateTree(!isUpdated);
	}

	function itemMoveDown(parent, item) {
		// parent.moveDown(list.value);
		changeTree(prevTree => {
			prevTree.getNode(parent).moveDown(item.value);
			return prevTree;
		});
		updateTree(!isUpdated);
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
								changeTree={changeTree}
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
						isUpdated={isUpdated}
						updateTree={updateTree}
						changeTree={changeTree}
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
				changeTree={changeTree}
			/>
		);
	} else {
		return <div>Unable to create list</div>;
	}
}
