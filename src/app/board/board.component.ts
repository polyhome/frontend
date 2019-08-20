import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { MainComponent } from '../shared/components/main-component';
import { BoardSelectors } from './../shared/store/board/board.selectors';
import { Board } from './models/board.model';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends MainComponent implements OnInit {
	/**
	 * Contains board currently showing in UI
	 */
	board: Board;

	/**
	 * @param store - Reference to the NGXS Store
	 */
	constructor(private store: Store) {
		super();
	}

	ngOnInit() {
		this.initBoard();
	}

	/**
	 * @description - Initialises subscription to curBoard,
	 * ensuring UI will update on board change
	 */
	initBoard() {
		this.store
			.select(BoardSelectors.curBoard)
			.pipe(takeUntil(this.end))
			.subscribe(board => {
				if (!board) return;
				this.board = board;
			});
	}
}
