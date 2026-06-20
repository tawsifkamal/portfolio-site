import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-render-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-dashboard.component.html',
  styleUrl: './render-dashboard.component.css'
})
export class RenderDashboardComponent implements OnInit {
  renderData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/render-data.json').subscribe(data => {
      this.renderData = data;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'live': return '#4caf50';
      case 'build_failed': return '#f44336';
      case 'deactivated': return '#9e9e9e';
      default: return '#ffeb3b';
    }
  }
}
