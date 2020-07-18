import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../classes/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  localTodo: Todo;
  edit: boolean;
  validError: boolean;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.edit = false;
    this.localTodo = new Todo(this.todo.id, this.todo.task, this.todo.isCompleted);
  }

  onClickChangeStatus(): void {
    this.localTodo.isCompleted = !this.localTodo.isCompleted;
    this.todo.isCompleted = this.localTodo.isCompleted;
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
    if (this.todo.task === this.localTodo.task) {
      this.edit = false;
      return;
    }
    if (!this.validError) {
      this.todo.task = this.localTodo.task;
      this.todoService.updateTodo(this.todo);
      this.edit = false;
    }
  }

  onClickRemoveButton(id): void {
    this.todoService.removeTodo(id);
  }

}
