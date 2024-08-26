import {Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-amortization-chart',
  templateUrl: './amortization-chart.component.html',
  styleUrl: './amortization-chart.component.scss'
})
export class AmortizationChartComponent implements OnInit{
  @Input() amortizationData: any[] | undefined;
  chart: Chart | undefined; // Store chart instance

  constructor() {
    Chart.register(...registerables); // Register necessary components
  }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['amortizationData'] && this.amortizationData) {
      this.createChart();
    }
  }

  createChart() {
    if (!this.amortizationData || this.amortizationData.length === 0) return;

    // Destroy the previous chart instance to avoid multiple canvas rendering
    if (this.chart) {
      this.chart.destroy();
    }

    const data = {
      labels: this.amortizationData.map(d => d.date),
      datasets: [
        {
          label: 'Principal',
          data: this.amortizationData.map(d => d.principal),
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Interest',
          data: this.amortizationData.map(d => d.interest),
          borderColor: 'red',
          fill: false
        }
      ]
    };

    this.chart = new Chart('loanChart', {
      type: 'line',
      data,
      options: {
        responsive: true,
        scales: {
          x: { 
            title: { display: true, text: 'Payment Date' },
            type: 'time', // Use 'time' type for date labels
            time: {
              unit: 'month'
            }
          },
          y: { 
            title: { display: true, text: 'Amount (INR)' }
          }
        }
      }
    });
  }
}
