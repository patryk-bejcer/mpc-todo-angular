import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Todo} from '../classes/todo';
import {HttpClient} from '@angular/common/http';
import {TodoResponse} from '../classes/todo-response';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  todosTemp: Todo[] = [];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.loading = true;
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get<{ data: Array<TodoResponse> }>(API_URL).subscribe(
      ({data}) => {
        this.todos = data.map<Todo>(Todo.fromResponse);
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
    const newTodo: Todo = new  Todo('', title, false);
    // Add to array new element.
    this.todos.unshift(newTodo);
    this.sortTodos();
    // Send API request (if request will return error - new element will be removed (optimistic scenario UX).
    this.http.post<{ data: Array<TodoResponse> }>(API_URL, this.prepareFormData(newTodo))
      .subscribe(
        ({data}) => {
          const [item] = data;
          newTodo.id = item.id;
        },
        error => {
          this.todos = this.todos.filter(t => t !== newTodo);
        },
      );
  }

  // Update element.
  updateTodo(todo: Todo): void {
    const tempTask = todo.task;
    this.sortTodos();
    this.http.post<{ data: Array<TodoResponse> }>(API_URL, this.prepareFormData(todo))
      .subscribe(
        () => {
        },
        error => {
          const updatedTodo = this.todos.find(el => el === todo);
          updatedTodo.task = tempTask;
        },
      );
  }

  updateTodoStatus(todo): void {
    this.http.post<{ data: Array<TodoResponse> }>(API_URL, this.prepareFormData(todo))
      .subscribe(
        () => {
        },
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
    this.http.delete(`${API_URL}/${id}`).subscribe(
      () => {},
      error => {
        this.todos.unshift(tempTodo);
        console.log(error);
      }
    );
  }

  // Prepare form data to send with request.
  prepareFormData(todoItem: Todo): FormData {
    const requestModel = todoItem.toResponse(); // TODO change name
    const formData = new FormData();
    formData.append('id', requestModel.id);
    formData.append('task', requestModel.task);
    formData.append('is_completed', requestModel.is_completed.toString());
    return formData;
  }

  // Show only completed.
  showOnlyCompleted(): any {
    this.todosTemp = this.todos;
    this.todos = this.todos.filter((todo) => {
      // tslint:disable-next-line:triple-equals
      if (todo.isCompleted == true) {
        return todo;
      } else {
        return false;
      }
    });
  }

  // Return from temp.
  showAll(): void {
    this.todos = this.todosTemp;
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
