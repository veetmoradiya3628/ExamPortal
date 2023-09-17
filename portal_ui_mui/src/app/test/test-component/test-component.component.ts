import { ChangeDetectionStrategy } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(){

  }

}
