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
import { PolicySet } from 'src/app/model/PolicySet';
import { select,  Store } from '@ngrx/store';
import PolicySetState from 'src/app/store/policySet.state';
import * as PolicySetActions from 'src/app/store/policySet.action';
import { PolicySetReducer, policySet_selector } from 'src/app/store/policySet.reducer';



@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css']
  
})
export class TreeGridComponent implements OnInit {

  //@Input() policySet: PolicySet;
  public taskData: TaskModel;
  public mode: ModeEnum;
  TypesEnum = TypesEnum;
  tasks: TaskModel[] = [];
  policySet$: Observable<PolicySet>;

  @ViewChild('treegrid',{static: false}) 
  public treegrid: TreeGrid; 

  constructor(private taskDataService: TaskDataService, private policyService: PolicyService,
    private store: Store<PolicySetState>) {
    
  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log("change")
  }
  ngOnInit(): void {
    // this.policyService.getInitalPolicySet().subscribe(data => {
    //     this.tasks = this.taskDataService.transformDtoToTreeModel(data);
    //   });
    //this.store.dispatch(PolicySetActions.BeginGetPolicySetAction());
    this.store.dispatch(PolicySetActions.BeginGetPolicySetAction());
    this.policySet$ = this.store.pipe(select(policySet_selector));

    this.policySet$.subscribe((data)=>{
      if(data!=null)
        this.tasks = this.taskDataService.transformDtoToTreeModel(data);
      console.log("tasks")
      console.log(this.tasks)
    })
    

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

  check(){
    console.log("check");
    console.log(this.policySet$);
  }
}
