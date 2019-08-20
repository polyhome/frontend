import { createSelector, Selector } from '@ngxs/store';
import { ElementStateModel } from './element-state.model';
import { ElementsState } from './element.state';

export class ElementSelectors {
	/**
	 * @emits - All Elements in Store
	 */
	@Selector([ElementsState])
	static elements({ elements }: ElementStateModel) {
		return elements;
	}

	/**
	 * @emits - Specified Element
	 * @param _id - Id of Element to subscribe to
	 */
	// tslint:disable-next-line: variable-name
	static element(_id: string) {
		return createSelector(
			[ElementsState],
			({ elements }: ElementStateModel) => {
				return elements.find(e => e._id === _id);
			},
		);
	}
}
