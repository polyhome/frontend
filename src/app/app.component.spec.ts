import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { MaterialModule } from './shared/modules/material/material.module';

describe('AppComponent', () => {
	let fixture;
	let comp;

	beforeEach(async(() => {
		const storeMock = {
			dispatch: jest.fn(action => action),
			select: jest.fn(() => {
				return { subscribe: jest.fn(() => of([])) };
			}),
		};

		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([
					{ path: '', component: AppComponent, pathMatch: 'full' },
				]),
				BrowserAnimationsModule,
				MaterialModule,
				BoardModule,
			],
			declarations: [AppComponent],
			providers: [{ provide: Store, useValue: storeMock }],
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(AppComponent);
				comp = fixture.componentInstance;
			});
	}));

	it('should create the app', async(() => {
		expect(comp).toBeTruthy();
	}));
});
