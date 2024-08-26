import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amortization-schedule',
  templateUrl: './amortization-schedule.component.html',
  styleUrl: './amortization-schedule.component.scss'
})
export class AmortizationScheduleComponent {
  @Input() amortizationSchedule: any[] | undefined;
}
