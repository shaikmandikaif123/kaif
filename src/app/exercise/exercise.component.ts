import { Component, OnInit } from '@angular/core';
import { Exercise } from '../Entity/Exercise';
import { ExerciseService } from '../Service/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit{
  exercise: Exercise = new Exercise();

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {


    
  }

  onSubmit() {
    this.exerciseService.createExercise(this.exercise)
      .subscribe(data => {
        console.log(data);
        // Handle success, such as showing a success message or redirecting to another page
      }, error => {
        console.log(error);
        // Handle error, such as displaying an error message
      });
  }
}
