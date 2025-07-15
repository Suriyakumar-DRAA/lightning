import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NxWelcome } from './nx-welcome';
import { TextboxComponent } from '@lightning/textbox';

export interface Appointment {
  name: string;
}
@Component({
  imports: [RouterModule, FormsModule, TextboxComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Lightning';
  appointment: Appointment = {
    name: '',
  }

}
