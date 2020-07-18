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

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.edit = false;
  }

  onClickChangeStatus(): void {
    //
  }

  onClickEditButton(): void {
    this.edit = true;
  }

  onClickSave(): void {
    alert('save');
  }

  onClickRemoveButton(id): void {
    this.todoService.removeTodo(id);
  }

}
