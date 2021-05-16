import { Component, OnInit } from '@angular/core';
import {
  EditSettingsModel,
  DataStateChangeEventArgs
} from '@syncfusion/ej2-angular-treegrid';
import { Observable } from 'rxjs';
import { TaskStoreService } from 'src/app/service/taskStoreService/task-store.service';

@Component({
  selector: 'app-tree-view-observables',
  templateUrl: './tree-view-observables.component.html',
  styleUrls: ['./tree-view-observables.component.css']
})
export class TreeViewObservablesComponent implements OnInit {
  public editSettings: EditSettingsModel;
  public toolbar: String[];

  public tasks: Observable<DataStateChangeEventArgs>;

  constructor(private taskService: TaskStoreService) {
    this.tasks = taskService;
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.taskService.execute(state);
  }
  ngOnInit(): void {
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: "Dialog"
    };
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel"];

    const state: any = { skip: 0, take: 10 };
    this.taskService.execute(state);
  }
}