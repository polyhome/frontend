import { Action, State, StateContext } from '@ngxs/store';
import { ElementStateModel } from './element-state.model';
import { AddElement, AddElements } from './element.actions';

@State<ElementStateModel>({
	name: 'elements',
	defaults: {
		elements: [],
	},
})
export class ElementsState {
	@Action(AddElements)
	addElements(
		{ getState, patchState }: StateContext<ElementStateModel>,
		{ docs }: AddElements,
	) {
		patchState({
			elements: [...getState().elements, ...docs],
		});
	}

	@Action(AddElement)
	addElement(
		{ getState, patchState }: StateContext<ElementStateModel>,
		{ doc }: AddElement,
	) {
		patchState({
			elements: [...getState().elements, doc],
		});
	}
}
