import { Component, OnInit } from '@angular/core';
import { EditorService } from '../service/editor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: EditorService) { 
    service.test();
    this.service.test().subscribe(data => {
        console.log(data);
     });
  
  }

  ngOnInit() {
    
  }

}
