import { Component } from '@angular/core';
import { AmortizationService } from './services/amortization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  amortizationSchedule: any[] | undefined;

  constructor(private loanService: AmortizationService) {}

  onCalculate(formData: any) {
    const { loanAmount, interestRate, loanTerm, startDate } = formData;
    this.amortizationSchedule = this.loanService.generateAmortizationSchedule(
      loanAmount,
      interestRate,
      loanTerm,
      startDate
    );
  }
}
