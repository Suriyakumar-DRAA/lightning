// libs/textbox/src/lib/textbox.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'dragarwal-doodles-textbox', // Your component's selector
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './textbox.html',
  styleUrls: ['./textbox.scss'], // Link to SCSS file
})
export class TextboxComponent {
  inputValue: string = '';
}
