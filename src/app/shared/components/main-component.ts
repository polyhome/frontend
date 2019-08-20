import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export class MainComponent implements OnDestroy {
	/**
	 * Is created to help stopping subscriptions. Every subscription should
	 * pipe takeUntil this.end, making sure the subscription will be killed
	 * when the component is destroyed
	 */
	end = new Subject();

	ngOnDestroy() {
		this.end.next();
		this.end.complete();
	}
}
