import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, DataStateChangeEventArgs } from '@syncfusion/ej2-treegrid/src';
import { Observable } from 'rxjs';
import { TaskStoreService } from 'src/app/service/taskStoreService/task-store.service';
import { TaskDataService } from 'src/app/service/taskDataService/task-data.service';
import { SaveEventArgs } from '@syncfusion/ej2-grids';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css']
})
export class TreeGridComponent implements OnInit {

  public editSettings: EditSettingsModel;
  public toolbar: String[];

  public tasks: TaskModel[]=[];
  public taskData: TaskModel;
  public mode: 'add' | 'edit';
  TypesEnum = TypesEnum;


  constructor(private taskService: TaskDataService) {
    this.tasks = taskService.createDb();
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log("change")
    //this.taskService.execute(state);
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
   // this.taskService.execute(state);
  }

  actionBegin(args: SaveEventArgs): void{
    if(args.requestType==="beginEdit" || args.requestType==="edit"){
      this.taskData = Object.assign(args.rowData);
      console.log(this.taskData);
      this.mode='edit';
    }
    if(args.requestType==="add"){
      this.taskData = Object.assign(args.rowData);
      console.log(this.taskData);
      this.mode='add'
    }
    console.log(args);
  }

  myFunction(): void{
    console.log("klik");
    console.log(this.tasks);
  }
}
