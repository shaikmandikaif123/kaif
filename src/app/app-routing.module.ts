import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exercise } from './Entity/Exercise';
import { ExerciseComponent } from './exercise/exercise.component';

const routes: Routes = [{
  path:"",component:ExerciseComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
