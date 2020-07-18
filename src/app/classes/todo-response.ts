export class TodoResponse {
  id: string;
  task: string;
  // tslint:disable-next-line:variable-name
  is_completed: number;

  constructor(id: string, task: string, isCompleted: number) {
    this.id = id;
    this.task = task;
    this.is_completed = isCompleted;
  }
}
