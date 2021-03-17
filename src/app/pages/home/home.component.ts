import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public list: Array<any> = new Array(5);
  
  constructor() { }

  ngOnInit(): void {
  }

}
