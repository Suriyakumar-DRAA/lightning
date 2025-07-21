import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NxWelcome } from './nx-welcome';
import { TextboxComponent } from '@lightning/textbox';
import { DropdownComponent } from '@lightning/dropdown';
import { DatepickerComponent } from '@lightning/datepicker';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker';
export interface PatientDetail {
  salutation?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  conatctNumber?: number;
  gender?: string;
  dob?: Date;
  relationship?: string;
  patientType?: string;
}
@Component({
  imports: [RouterModule, FormsModule, TextboxComponent, DropdownComponent, DatepickerComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Lightning';
  public submitted: boolean = false;
  protected salutationMaster = [
    { id: 'Mrs.', name: 'Mrs.' },
    { id: 'Ms.', name: 'Ms.' },
    { id: 'Mx.', name: 'Mx.' },
    { id: 'Dr.', name: 'Dr.' },
    { id: 'Mst.', name: 'Mst.' },
  ];
  patientDetail: PatientDetail = {
  }

  onCancel(): void {
    // Handle cancel action
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      // Handle form submission
    }
  }
}
