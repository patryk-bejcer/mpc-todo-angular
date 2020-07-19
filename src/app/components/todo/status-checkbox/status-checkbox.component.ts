import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-status-checkbox',
  templateUrl: './status-checkbox.component.html',
  styleUrls: ['./status-checkbox.component.scss']
})
export class StatusCheckboxComponent {
  @Input() status: boolean;
  @Output() changeStatusEvent = new EventEmitter<string>();

  onClickChangeStatus(): void {
    this.changeStatusEvent.emit();
  }
}
