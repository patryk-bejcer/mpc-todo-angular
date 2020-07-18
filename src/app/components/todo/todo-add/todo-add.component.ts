import {Component, EventEmitter, Output} from '@angular/core';
import {TodoService} from '../../../services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent {
  title = '';
  isInputValid = false;
  @Output() closePopupEvent = new EventEmitter<string>();

  constructor(private todoService: TodoService) {  }

  onInputChange(): void {
    this.isInputValid = this.title.length > 3;
  }

  onSubmit(): void {
    if (!this.isInputValid) { return; }
    this.todoService.addTodo(this.title);
    this.closePopupEvent.emit();
  }

  onClickClosePopupButton(): void {
    this.closePopupEvent.emit();
  }
}
