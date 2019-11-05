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
//let emptyTree = new TreeList("", []); //create root node

export default function MultiList({ title }) {
	const [isUpdated, updateTree] = useState(false);

	return (
		<div className="tree-wrapper">
			{title ? <div className="tree-title">{title}</div> : ""}
			<MultiListItem
				list={someTree}
				// list={emptyTree}
				isUpdated={isUpdated}
				updateTree={updateTree}
			/>
		</div>
	);
}
