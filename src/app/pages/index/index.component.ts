import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public list: Array<any> = new Array(5);
  
  constructor() { }

  ngOnInit(): void {
  }

}
