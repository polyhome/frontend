import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SendWebSocketMessage } from '@ngxs/websocket-plugin';
import { CardSelectors } from './../../shared/store/card/card.selectors';

@Injectable()
export class CardService {
	constructor(private store: Store) {}

	/**
	 * @description - Issues command to backend to fetch cards
	 *
	 * @param cards - Cards to fetch
	 */
	fetchMany(cards: string[]) {
		this.store.dispatch(
			new SendWebSocketMessage({ event: 'cards/fetch-many', data: cards }),
		);
	}

	/**
	 * @description - Issues command to backend to fetch one card
	 *
	 * @param id - Id of card to fetch
	 */
	fetchOne(id: string): void {
		const exists = !!this.store.selectSnapshot(CardSelectors.card(id));
		if (!exists)
			this.store.dispatch(
				new SendWebSocketMessage({ event: 'cards/fetch-one', data: id }),
			);
	}
}
