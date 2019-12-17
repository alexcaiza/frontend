import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  protected searchStr: string;
  protected captain: string;
  protected selectedColor: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00', },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' },
    { color: 'flipkart', value: 'flipkart-coupons' }
  ];

  constructor(
    private completerService: CompleterService
  ) {
    //this.dataService = completerService.local(this.searchData, 'color', 'color');
    // Load data in delay using an Observale
    let timedRes = Observable.from([this.searchData]).delay(3000);
    this.dataService = completerService.local(timedRes, 'color', 'color');
  }

  ngOnInit() {
  }

  protected onSelected(item: CompleterItem) {
    this.selectedColor = item ? item.title : "";
    console.log(item);
    console.log('this.selectedColor: ' + this.selectedColor);
    //this.router.navigate(['/store/' + this.selectedColor]);
  }


}
