import React, { useState } from "react";
import MultiListItem from "./MultiListItem";

class TreeList {
	constructor(value = null, sub = null) {
		this.value = value;
		this.sub = sub;
	}
	addSub() {
		this.sub = [];
	}
	delSub() {
		this.sub = null;
	}
	addValue(value) {
		if (!this.sub) this.addSub();
		this.sub.push(new TreeList(value));
	}
	delValue(value) {
		this.sub = this.sub.filter(item => item.value !== value.value);
	}
	moveUp(value) {
		let elem = this.sub.filter(item => item.value === value)[0];
		let pos = this.sub.indexOf(elem);
		if (pos === 0) return;
		this.sub.splice(pos - 1, 2, elem, this.sub[pos - 1]);
	}
	moveDown(value) {
		let elem = this.sub.filter(item => item.value === value)[0];
		let pos = this.sub.indexOf(elem);
		if (pos === this.sub.length - 1) return;
		this.sub.splice(pos, 2, this.sub[pos + 1], elem);
	}
	hasNode(node) {
		if (this === node) {
			return true;
		}
		if (this.sub && this.sub.length) {
			if (this.sub.some(item => item.hasNode(node))) {
				return true;
			}
		}
		return false;
	}
	getNode(node) {
		if (this === node) {
			return this;
		}
		if (this.sub && this.sub.length) {
			let temp = this.sub.filter(item => item.getNode(node));
			if (temp.length) {
				return temp[0].getNode(node);
			}
		}
		return null;
	}
}

/* some initial not empty tree */
let someTree = new TreeList("", []); //create root node
someTree.addValue("List_1");
someTree.sub[0].addSub();
someTree.sub[0].addValue("List_1-1");
someTree.sub[0].addValue("List_1-2");
someTree.sub[0].sub[1].addValue("List_1-2-1");
someTree.sub[0].sub[1].addValue("List_1-2-2");
someTree.sub[0].addValue("List_1-3");
someTree.sub[0].addValue("List_1-4");

/* empty tree */
// let emptyTree = new TreeList("", []); //create root node

export default function MultiList({ title }) {
	const [isUpdated, updateTree] = useState(false);
	const [stateTree, changeTree] = useState(new TreeList("", []));

	function editTree(action, parent, item) {
		changeTree(prevTree => {
			if (action === "add-item") {
				prevTree.getNode(parent).addValue(item);
			} else if (action === "add-sub") {
				prevTree.getNode(parent).addSub();
			} else if (action === "del-sub") {
				prevTree.getNode(parent).delSub();
			} else if (action === "del-list") {
				prevTree.getNode(parent).delValue(item);
			} else if (action === "move-up") {
				prevTree.getNode(parent).moveUp(item.value);
			} else if (action === "move-down") {
				prevTree.getNode(parent).moveDown(item.value);
			}
			return prevTree;
		});
		updateTree(!isUpdated);
	}

	return (
		<div className="tree-wrapper">
			{title ? <div className="tree-title">{title}</div> : ""}
			<MultiListItem list={stateTree} editTree={editTree} />
		</div>
	);
}
