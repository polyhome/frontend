import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
} from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { BoardSelectors } from './../store/board/board.selectors';

@Injectable({
	providedIn: 'root',
})
export class InitGuard implements CanActivate {
	constructor(private store: Store) {}

	/**
	 * @description - Checks whether or not BoardsState is initialised, otherwise it
	 * redirects to LoadingComponent
	 * @param next - Next Route
	 * @param state - Router State
	 */
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): boolean {
		const boards = this.store.selectSnapshot(BoardSelectors.boards);
		if (boards.length !== 0) {
			return true;
		} else {
			this.store.dispatch(
				new Navigate(['loading'], { redirectUrl: state.url }),
			);
			return false;
		}
	}
}
