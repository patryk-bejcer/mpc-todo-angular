import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  popup: boolean;

  constructor(public todoService: TodoService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    if (this.todoService.loading) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  onClickAddButton(): void {
    this.popup = true;
  }

  closePopup(): void {
    this.popup = false;
  }

}
