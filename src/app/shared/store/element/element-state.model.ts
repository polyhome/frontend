export class Element {
	// tslint:disable-next-line: variable-name
	_id: string;
	url: string;
	srcType: string;
}

export interface ElementStateModel {
	elements: Element[];
}
