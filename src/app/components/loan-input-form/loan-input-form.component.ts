import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-input-form',
  templateUrl: './loan-input-form.component.html',
  styleUrl: './loan-input-form.component.scss'
})
export class LoanInputFormComponent {
  loanForm: FormGroup;
  @Output() calculate = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loanAmount: ['', [Validators.required, Validators.min(1)]],
      interestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      loanTerm: ['', [Validators.required, Validators.min(1)]],
      startDate: ['']
    });
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.calculate.emit(this.loanForm.value);
    }
  }
}
