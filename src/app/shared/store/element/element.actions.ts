import { Element } from './element-state.model';

export class AddElements {
	static readonly type = '[Elements] Add Elements';
	constructor(public docs: Element[]) {}
}

export class AddElement {
	static readonly type = '[Elements] Add Element';
	constructor(public doc: Element) {}
}
