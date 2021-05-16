import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { TaskModel } from 'src/app/model/TaskModel';
import { TaskDataService } from '../taskDataService/task-data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService extends Subject<DataStateChangeEventArgs> {
  private apiUrl = 'api/tasks';
  constructor(private taskDataService: TaskDataService) {
    super();
  }

  public execute(state: any): void {
    if (state.requestType === "expand") {
      state.childDataBind();
    } else {
      this.getTasks(state).subscribe(x =>
        super.next(x as DataStateChangeEventArgs)
      );
    }
  }

  getTasks(state?: any): Observable<TaskModel[]> {
    return new Observable((observer) => {
    
      // observable execution
      observer.next(this.taskDataService.createDb())
      //observer.complete()
    });
    // .pipe(
    //   map(
    //     (response: any) =>
    //       <any>{
    //         result:
    //           state.take > 0
    //             ? response.slice(state.skip, state.take)
    //             : response,
    //         count: response.length
    //       }
    //   )
    // );
  }
}