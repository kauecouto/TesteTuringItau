import { AuthenticatedGuard } from './../../guards/authenticated.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", pathMatch: 'full' ,redirectTo: 'home'
  },
  {
    path: "home", component: HomeComponent, canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
