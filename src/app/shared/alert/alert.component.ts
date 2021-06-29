import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() message: string;
  @Input() message2: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
