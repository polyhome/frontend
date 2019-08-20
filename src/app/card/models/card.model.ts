export class Card {
	// tslint:disable-next-line: variable-name
	_id: string;
	tag: string;
	state: object;
	commands: Array<{ _id: string; trigger: string }>;
	classes: string[];
}
