import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCardComponent } from './components/book-card/book-card.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
