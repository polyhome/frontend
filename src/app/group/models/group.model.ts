export class Group {
	// tslint:disable-next-line: variable-name
	_id: string;
	classes: string[];
	cards: Array<{ _id: string; classes: string[]; position: number }>;
}
