import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoadingComponent } from './loading/loading.component';
import { InitGuard } from './shared/guards/init.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: LoadingComponent },
	{ path: 'loading', component: LoadingComponent },
	{
		path: 'board/:id',
		component: BoardComponent,
		canActivate: [InitGuard],
		loadChildren: './board/board.module#BoardModule',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
