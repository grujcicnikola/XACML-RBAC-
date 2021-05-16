import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { EditSettingsModel, DataStateChangeEventArgs, TreeGrid } from '@syncfusion/ej2-treegrid/src';
import { Observable } from 'rxjs';
import { TaskStoreService } from 'src/app/service/taskStoreService/task-store.service';
import { TaskDataService } from 'src/app/service/taskDataService/task-data.service';
import { SaveEventArgs } from '@syncfusion/ej2-grids';
import { TaskModel } from 'src/app/model/TaskModel';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { PolicyService } from 'src/app/service/policyService/policy.service';
import { ModeEnum } from 'src/app/model/Mode';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css']
})
export class TreeGridComponent implements OnInit {

  @Input() tasks: TaskModel[] = [];
  public taskData: TaskModel;
  public mode: ModeEnum;
  TypesEnum = TypesEnum;

  @ViewChild('treegrid',{static: false}) 
  public treegrid: TreeGrid; 

  constructor(private taskService: TaskDataService) {
    //this.tasks = taskService.createDb();
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log("change")
    //this.taskService.execute(state);
  }
  ngOnInit(): void {

  }

  actionBegin(args: SaveEventArgs): void {
    console.log(args);
    if (args.requestType === "beginEdit" || args.requestType === "edit") {
      this.taskData = Object.assign(args.rowData);
      console.log(this.taskData);
      this.mode = ModeEnum.Edit;
    }
    if (args.requestType === "add") {
      this.taskData = Object.assign(args.rowData);
      console.log(this.taskData);
      this.mode = ModeEnum.Add;
    }
    if (args.requestType === "Delete") {
      this.taskData = Object.assign(args.rowData);
      console.log(this.taskData);
      this.mode = ModeEnum.Delete;
    }
    console.log(args);
  }

  add(){
    console.log("ADD");
    console.log(this.treegrid.getSelectedRecords());
  }

  edit(){
    console.log("EDIT");
    console.log(this.treegrid.getSelectedRecords());
  }

  delete(){
    console.log("DELETE");
    console.log(this.treegrid.getSelectedRecords());
  }
}
