import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Card } from '../../../card/models/card.model';
import { CardStateModel } from './card-state.model';
import { AddCard, AddCards, UpdateCards } from './card.actions';

@State<CardStateModel>({
	name: 'cards',
	defaults: {
		cards: [],
		curCards: [],
	},
})
export class CardsState {
	@Action(AddCards)
	addCards(
		{ getState, patchState }: StateContext<CardStateModel>,
		{ docs }: AddCards,
	) {
		patchState({
			cards: [...getState().cards, ...docs],
		});
	}

	@Action(AddCard)
	addCard(
		{ getState, patchState }: StateContext<CardStateModel>,
		{ doc }: AddCard,
	) {
		patchState({
			cards: [...getState().cards, doc],
		});
	}

	@Action(UpdateCards)
	updateCards(
		{ setState, getState }: StateContext<CardStateModel>,
		{ docs }: UpdateCards,
	) {
		docs.forEach(card => {
			const curCard = getState().cards.find(c => c._id === card._id);
			const newCard = { ...curCard, state: card.state };
			setState(
				patch({
					cards: updateItem<Card>(c => c._id === card._id, newCard),
				}),
			);
		});
	}
}
