import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodoService} from '../../../services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  title: string;
  validError: boolean;
  @Output() closePopupEvent = new EventEmitter<string>();

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.title = '';
  }

  onClickClosePopupButton(): void {
    this.closePopupEvent.emit();
  }

  onClickAddButton(): void {
    if (this.title.length > 3) {
      this.todoService.addTodo(this.title);
      this.closePopupEvent.emit();
    } else {
      this.validError = true;
    }
  }

}
