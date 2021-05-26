import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TypesEnum } from 'src/app/model/TypesEnum';

@Component({
  selector: 'app-choose-what-to-create',
  templateUrl: './choose-what-to-create.component.html',
  styleUrls: ['./choose-what-to-create.component.css']
})
export class ChooseWhatToCreateComponent implements OnInit {

  @Input() currentType: TypesEnum;
  @Output() closeEvent = new EventEmitter<void>();
  private types: TypesEnum[];

  constructor() { }

  ngOnInit() {
    switch (this.currentType) {
      case TypesEnum.PolicySet:
        this.types = [TypesEnum.Policy];
        break;
      case TypesEnum.Policy:
        this.types = [TypesEnum.Rule];
        break;
      case TypesEnum.Rule:
        this.types = [];
        break;
    }
    console.log(this.currentType);
    console.log(this.types);
  }

  onSubmit() {
    window.location.href = "https://localhost:4200/editor"; 
  }

}
