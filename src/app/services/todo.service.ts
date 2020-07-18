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
  loading: boolean;

  constructor(private http: HttpClient) {
    this.loading = true;
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get<{ data: Array<Todo> }>(API_URL).subscribe(
      ({data}) => {
        this.todos = data;
        this.loading = false;
      },
      error => {
        console.log(error);
      }
    );
    return this.todos;
  }
}
