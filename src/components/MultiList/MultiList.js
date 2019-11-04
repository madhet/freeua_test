import React from "react";

const sketch = {
	addSub() {
		this.sub = [];
	},
	delSub() {
		this.sub = null;
	},
	addValue(value) {
		if (!this.sub) this.addSub();
		this.sub.push({
			id: this.id + 1,
			value,
			sub: null,
			__proto__: this.__proto__
		});
	},
	delValue(value) {
		this.sub = this.sub.filter(item => item.value !== value);
	},
	moveUp(value) {
		let elem = this.sub.filter(item => item.value === value)[0];
		let pos = this.sub.indexOf(elem);
		if (pos === 0) return;
		this.sub.splice(pos - 1, 2, elem, this.sub[pos - 1]);
	},
	moveDown(value) {
		let elem = this.sub.filter(item => item.value === value)[0];
		let pos = this.sub.indexOf(elem);
		if (pos === this.sub.length - 1) return;
		this.sub.splice(pos, 2, this.sub[pos + 1], elem);
	}
};

let mList3 = {
	value: null,
	sub: null
};
mList3.__proto__ = sketch;
mList3.addSub();
mList3.addValue("List_1");
mList3.sub[0].addSub();
mList3.sub[0].addValue("List_1-1");
mList3.sub[0].addValue("List_1-2");
mList3.sub[0].sub[1].addValue("List_1-2-1");
mList3.sub[0].sub[1].addValue("List_1-2-2");
mList3.sub[0].addValue("List_1-3");
mList3.sub[0].addValue("List_1-4");

console.log(mList3);

const MultiListItem = ({ item }) => {
	console.log(item);
	const { value, sub } = item;
	return (
		<li>
			{value ? value : ""}
			{sub && sub.length ? (
				<ul>
					{sub.map((item, idx) => {
						// console.log(item);
						return (
							<MultiListItem
								key={idx}
								item={item}></MultiListItem>
						);
					})}
				</ul>
			) : (
				""
			)}
		</li>
	);
};

export default function MultiList() {
	return (
		<ul>
			<MultiListItem item={mList3}></MultiListItem>;
		</ul>
	);
}
