import { Component, OnInit, Input } from '@angular/core';
import { TaskModel } from 'src/app/model/TaskModel';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent implements OnInit {

  @Input() taskData: TaskModel;
  @Input() mode: string;

  constructor() { }

  ngOnInit() {
    console.log("MODE" + this.mode);
  }

}
