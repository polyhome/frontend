import { Card } from '../../../card/models/card.model';

export class AddCards {
	static readonly type = '[Cards] Add Cards';
	constructor(public docs: Card[]) {}
}

export class AddCard {
	static readonly type = '[Cards] Add Card';
	constructor(public doc: Card) {}
}

export class UpdateCards {
	static readonly type = '[Cards] Update Cards';
	constructor(public docs: Card[]) {}
}
