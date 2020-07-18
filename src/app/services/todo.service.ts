import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Todo} from '../interfaces/todo';
import {HttpClient} from '@angular/common/http';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get<{ data: Array<Todo> }>(API_URL).subscribe(
      ({data}) => {
        this.todos = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    return this.todos;
  }
}
