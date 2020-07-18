import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickClosePopupButton(): void {
    this.closePopupEvent.emit();
  }

}
