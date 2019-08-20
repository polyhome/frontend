import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Board } from '../board';
import { MainComponent } from '../shared/components/main-component';
import { RouterSelectors } from '../shared/store';
import { BoardSelectors } from './../shared/store/board/board.selectors';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends MainComponent implements OnInit {
	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store
			.select(BoardSelectors.boards)
			.pipe(takeUntil(this.end))
			.subscribe(boards => {
				if (boards.length !== 0) {
					this.store.dispatch(new Navigate([this.getRedirectUrl(boards[0])]));
				}
			});
	}

	/**
	 * @description Gets redirection URL either from url, or a given board
	 * @param board - Board to eventually redirect to
	 */
	getRedirectUrl(board: Board) {
		return (
			this.store.selectSnapshot(RouterSelectors.queryParams).redirectUrl ||
			'board/' + board._id
		);
	}
}
