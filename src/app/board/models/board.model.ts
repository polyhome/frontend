export class Board {
	// tslint:disable-next-line: variable-name
	_id: string;
	title: string;
	icon: string;
	groups: Array<{ _id: string; position: number }>;
	position: number;
	slug: string;
}
