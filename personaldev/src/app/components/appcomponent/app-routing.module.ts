import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from 'src/app/components/contact/contact.component';
import { NotefoundComponent } from 'src/app/components/notefound/notefound.component';
import { HomeComponent } from '../home/home.component';
import { ResumeComponent } from '../resume/resume.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  }, {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    component: NotefoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
