import { createSelector, Selector } from '@ngxs/store';
import { CardStateModel } from './card-state.model';
import { CardsState } from './card.state';

export class CardSelectors {
	@Selector([CardsState])
	static allCards({ cards }: CardStateModel) {
		return cards;
	}

	static cards(cards: string[]) {
		return createSelector(
			[CardsState],
			(state: CardStateModel) => {
				return state.cards.filter(c => cards.includes(c._id));
			},
		);
	}

	static card(id: string) {
		return createSelector(
			[CardsState],
			(state: CardStateModel) => {
				return state.cards.find(c => c._id === id);
			},
		);
	}
}
