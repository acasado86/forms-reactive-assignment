import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup(
      {
        // 'name': new FormControl(null, [Validators.required, this.validateName]),
        'name': new FormControl(null, [Validators.required], this.validateNameAsync),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(null, [Validators.required]),
      }
    );
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  validateName(control: FormControl): {[key: string]: boolean} | null {
    if (control.value === 'Test') {
      return {'invalidName': true};
    }
    return null;
  }

  validateNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          return resolve({'invalidName': true});
        }
        resolve(null);
      }, 2000);
    });
    return promise;
  }
}
