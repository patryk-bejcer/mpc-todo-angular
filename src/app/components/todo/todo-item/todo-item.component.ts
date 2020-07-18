import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../interfaces/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  edit: boolean;
  validError: boolean;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.edit = false;
  }

  onClickChangeStatus(): void {
    this.todoService.updateTodoStatus(this.todo);
  }

  onClickEditButton(): void {
    this.validInput();
    this.edit = true;
  }

  onClickCloseInput(): void {
    this.edit = false;
    this.validError = false;
  }

  validInput(): void {
    this.validError = this.todo.task.length <= 3;
  }

  onClickSave(): void {
    if (!this.validError) {
      this.todoService.updateTodo(this.todo);
      this.edit = false;
    }
  }

  onClickRemoveButton(id): void {
    this.todoService.removeTodo(id);
  }

}
