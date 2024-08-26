import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmortizationService {
  calculateMonthlyPayment(loanAmount: number, annualInterestRate: number, loanTerm: number): number {
    const monthlyRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  }

  generateAmortizationSchedule(loanAmount: number, annualInterestRate: number, loanTerm: number, startDate: string) {
    const monthlyPayment = this.calculateMonthlyPayment(loanAmount, annualInterestRate, loanTerm);
    const numberOfPayments = loanTerm * 12;
    const monthlyRate = annualInterestRate / 12 / 100;
    let remainingBalance = loanAmount;
    const schedule = [];

    // Convert startDate to a Date object
    let paymentDate = startDate ? new Date(startDate) : new Date();

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      // Clone the date object to avoid mutation
      const paymentDateClone = new Date(paymentDate);

      schedule.push({
        month: i,
        date: paymentDateClone.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0
      });      

      if (remainingBalance <= 0) break;

      // Increment payment date by one month
      paymentDate.setMonth(paymentDate.getMonth() + 1);
    }

    return schedule;
  }
}
