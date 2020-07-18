import {TodoResponse} from './todo-response';

export class Todo {
  id: string;
  task: string;
  isCompleted: boolean;

  constructor(id: string, task: string, isCompleted: boolean) {
    this.id = id;
    this.task = task;
    this.isCompleted = isCompleted;
  }

  public static fromResponse(todoResponse: TodoResponse): Todo {
    return new Todo(todoResponse.id, todoResponse.task, todoResponse.is_completed > 0);
  }

  public toResponse(): TodoResponse {
    return new TodoResponse(this.id, this.task, this.isCompleted ? 1 : 0);
  }
}
