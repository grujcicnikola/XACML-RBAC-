import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';
import { PolicyService } from 'src/app/service/policyService/policy.service';
import { TypesEnum } from 'src/app/model/TypesEnum';
import { ModeEnum } from 'src/app/model/Mode';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  @Input() taskData: TaskModel;
  @Input() mode: ModeEnum;
  element: any;
  ModeEnum = ModeEnum;

  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    console.log(this.taskData);
    if (this.mode === ModeEnum.Edit) {
      switch (this.taskData.type) {
        case TypesEnum.PolicySet:
          this.policyService.getPolicySet(this.taskData.id).subscribe(data => {
            this.element = data;
            console.log(this.element);
          });
          break;
        case TypesEnum.Policy:
          this.policyService.getPolicy(this.taskData.id).subscribe(data => {
            this.element = data;
            console.log(this.element);
          });
          break;
        case TypesEnum.Rule:
          this.policyService.getRule(this.taskData.id).subscribe(data => {
            this.element = data;
            console.log(this.element);
          });
          break;
      }
    }

    if (this.mode === ModeEnum.Add) {

    }
  }

}
