import { Component, OnInit } from '@angular/core';

const is = (fileName: string, ext: string) => new RegExp(`.${ext}\$`).test(fileName);

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public data: any[] = [{
    text: 'My Documents',
    items: [
      {
        text: 'Kendo UI Project',
        items: [
          { text: 'about.html' },
          { text: 'index.html' },
          { text: 'logo.png' }
        ]
      },
      {
        text: 'New Web Site',
        items: [
          { text: 'mockup.jpg' },
          { text: 'Research.pdf' }
        ]
      },
      {
        text: 'Reports',
        items: [
          { text: 'February.pdf' },
          { text: 'March.pdf' },
          { text: 'April.pdf' }
        ]
      }
    ]
  }];

  public iconClass({ text, items }: any): any {
    return {
      'k-i-file-pdf': is(text, 'pdf'),
      'k-i-folder': items !== undefined,
      'k-i-html': is(text, 'html'),
      'k-i-image': is(text, 'jpg|png'),
      'k-icon': true
    };
  }

  doSomething(data: any){
    console.log(data);
  }

  // doSomething(){
  //   console.log("clicked");
  // }
}
