import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginInfo } from '../auth/login';
import { AuthService } from '../auth/authService';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() selectedItemId : number;
  @Output() closeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    window.location.href = "https://localhost:4200/editor"; 
  }


}
