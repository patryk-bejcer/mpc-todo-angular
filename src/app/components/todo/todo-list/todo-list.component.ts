import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  popup: boolean;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  onClickAddButton(): void {
    this.popup = true;
  }

  closePopup(): void {
    this.popup = false;
  }

}
