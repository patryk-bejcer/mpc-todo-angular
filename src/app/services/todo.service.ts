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
  formData: FormData = new FormData();
  loading: boolean;

  constructor(private http: HttpClient) {
    this.loading = true;
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get<{ data: Array<Todo> }>(API_URL).subscribe(
      ({data}) => {
        this.todos = data;
        this.sortTodos();
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
    return this.todos;
  }

  addTodo(title): void {
    this.appendFormData('', title, '0');
    // Add to array new element.
    this.todos.unshift({
      id: '#temp-task',
      task: title,
      is_completed: false
    });
    this.sortTodos();
    // Send API request (if request will return error - new element will be removed (optimistic scenario UX).
    this.http.post<{ data: Array<Todo> }>(API_URL, this.formData)
      .subscribe(
        ({data}) => {
          const [item] = data;
          this.todos.filter((todo) => {
            // Replace id of new added task.
            if (todo.id === '#temp-task') {
              todo.id = item.id;
            }
            return item;
          });
        },
        error => {
          // Remove new added task.
          this.todos.splice(this.todos.findIndex(todo => todo.id === '#temp-task'), 1);
          console.log(error);
        },
      );
  }

  // Update element.
  updateTodo(todo: Todo): void {
    let isCompleted;
    todo.is_completed ? isCompleted = '1' : isCompleted = '0';

    console.log(todo);

    this.appendFormData('122a1bc5-8407-4677-b966-689ccbbc46b1', '', '1');
    this.http.post<{ data: Array<Todo> }>(API_URL, this.formData)
      .subscribe(
        ({data}) => {},
        error => {
          console.log(error);
        },
      );
  }


  // Remove task.
  removeTodo(id): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    const tempTodo = this.todos[index];
    this.todos.splice(index, 1);
    // Send request to API.
    this.http.delete<{ data: Todo }>(`${API_URL}/${id}`).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        this.todos.unshift(tempTodo);
        console.log(error);
      }
    );
  }

  // Prepare form data to send with request.
  appendFormData(id, task, completed): void {
    this.formData.append('id', id);
    this.formData.append('task', task);
    this.formData.append('is_completed', completed);
  }

  // Sort alphabetical.
  sortTodos(): void {
    this.todos.sort((a, b) => {
      const titleA = a.task.toLowerCase();
      const titleB = b.task.toLowerCase();
      return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    });
  }
}
