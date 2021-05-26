import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
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
import { select, Store } from '@ngrx/store';
import PolicySetState from 'src/app/store/policySet.state';
import * as PolicySetActions from 'src/app/store/policySet.action';
import { PolicySetReducer, policySet_selector } from 'src/app/store/policySet.reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from '../modal/modal.service';



@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css']

})
export class TreeGridComponent implements OnInit, OnChanges {
  @Input() policySet: PolicySet;
  public taskData: TaskModel;
  public mode: ModeEnum;
  TypesEnum = TypesEnum;
  tasks: TaskModel[] = [];
  bodyText = 'This text can be updated in modal 1'
  selectedItemId: number;

  @ViewChild('treegrid', { static: false })
  public treegrid: TreeGrid;

  constructor(private taskDataService: TaskDataService, private policyService: PolicyService,
    private store: Store<PolicySetState>, private modalService: ModalService) {

  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    console.log("change")
  }
  ngOnInit(): void {
    // this.policyService.getInitalPolicySet().subscribe(data => {
    //     this.tasks = this.taskDataService.transformDtoToTreeModel(data);
    //   });
    //this.store.dispatch(PolicySetActions.BeginGetPolicySetAction());

    // if (this.policySet != null) {
    //   this.tasks = this.taskDataService.transformDtoToTreeModel(this.policySet);
    //   console.log("tasks")
    //   console.log(this.tasks)
    // }
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.policySet != null) {
      this.tasks = this.taskDataService.transformDtoToTreeModel(this.policySet);
      console.log("tasks")
      console.log(this.tasks)
    }
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

  add() {
    // TODO change logic later, becaouse when policySet is selecte, this shouldd add Policy (or Target)
    var selected: any = this.treegrid.getSelectedRecords()[0];
    //console.log(selected.type);
    if (selected) {
      switch (selected.type) {
        case TypesEnum.Policy:
          this.openModal('custom-modal-2');
          this.mode = ModeEnum.Add;
          break;
        case TypesEnum.Rule:
          this.openModal('custom-modal-3');
          this.mode = ModeEnum.Add;
          break;
        default:
          this.openModal('custom-modal-1');
          this.mode = ModeEnum.Add;
          break;
      }
    } else {
      //open policy set
      this.openModal('custom-modal-1');
      this.mode = ModeEnum.Add;
    }
  }

  edit() {
    var selected: any = this.treegrid.getSelectedRecords()[0];
    //console.log(selected.type);
    if (selected) {
      switch (selected.type) {
        case TypesEnum.Policy:
          this.openModal('custom-modal-2');
          this.mode = ModeEnum.Edit;
          break;
        case TypesEnum.Rule:
          this.openModal('custom-modal-3');
          this.mode = ModeEnum.Edit;
          break;
        default:
          this.openModal('custom-modal-1');
          this.mode = ModeEnum.Edit;
          break;
      }
    }
  }

  delete() {
    var selected: any = this.treegrid.getSelectedRecords()[0];
    if(selected){
      this.selectedItemId = selected.id;
      this.openModal('custom-modal-4');
    }
  }

  deleteItem() {
    console.log(this.selectedItemId);
  }

  check() {
    console.log("check");
    console.log(this.policySet);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
