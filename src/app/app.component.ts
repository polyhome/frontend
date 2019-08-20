import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ConnectWebSocket } from '@ngxs/websocket-plugin';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Board } from './board';
import { BoardService } from './board/services/board.service';
import { MainComponent } from './shared/components/main-component';
import {
	BoardSelectors,
	RouterSelectors,
	UpdateCurrentBoard,
} from './shared/store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent extends MainComponent implements OnInit {
	/**
	 * @description - Observes how the big viewport is
	 */
	isHandset: Observable<boolean> = this.breakpointObs
		.observe([Breakpoints.Small, Breakpoints.XSmall])
		.pipe(map(result => result.matches));

	@Select(BoardSelectors.boards) boards: Observable<Board[]>;
	@Select(RouterSelectors.url) url: Observable<string>;

	constructor(
		private store: Store,
		private breakpointObs: BreakpointObserver,
		private boardSvc: BoardService,
	) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(new ConnectWebSocket());
		this.boardSvc.fetchAll();
		this.url.pipe(takeUntil(this.end)).subscribe((url: string) => {
			if (url) {
				this.store.dispatch(new UpdateCurrentBoard(url.split('/')[2]));
			}
		});
	}
}
