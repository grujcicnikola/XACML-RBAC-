import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { TypesEnum } from 'src/app/model/TypesEnum';

@Component({
  selector: 'app-choose-what-to-create',
  templateUrl: './choose-what-to-create.component.html',
  styleUrls: ['./choose-what-to-create.component.css']
})
export class ChooseWhatToCreateComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
  }

  @Input() currentType: TypesEnum;
  @Output() closeEvent = new EventEmitter<any>();
  @Output() selectedEvent = new EventEmitter<TypesEnum>();
  private types: TypesEnum[];
  private choosenType: TypesEnum;

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //this.choosenType = null;
    switch (this.currentType) {
      case TypesEnum.PolicySet:
        this.types = [TypesEnum.Policy, TypesEnum.Target];
        this.choosenType= this.types[0];
        break;
      case TypesEnum.Policy:
        this.types = [TypesEnum.Rule, TypesEnum.Target];
        this.choosenType= this.types[0];
        break;
      case TypesEnum.Rule:
        this.types = [];
        this.choosenType= this.types[0];
        break;
    }
    console.log(this.choosenType);
    console.log(this.currentType);
    console.log(this.types);
  }

  ngOnInit() {
    
  }

  selectChangeHandler (event: any) {
    //update the ui
    console.log(event.target.value);
  }

  onSubmit() {
    //window.location.href = "https://localhost:4200/editor"; 
    this.selectedEvent.emit(this.choosenType);
    this.closeEvent.emit();
    this.ngOnDestroy();
    //this.choosenType = undefined;
  }

}
