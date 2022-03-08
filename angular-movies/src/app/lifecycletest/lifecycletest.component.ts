import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycletest',
  templateUrl: './lifecycletest.component.html',
  styleUrls: ['./lifecycletest.component.css']
})
export class LifecycletestComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  @Input()
  title!: string;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes");
    console.log(changes);

  }
  ngOnDestroy(): void {
    console.log("on destroy");
  }
  ngDoCheck(): void {
    console.log("on docheck");
  }
  ngAfterViewInit(): void {
    console.log("on after view init");
  }
  ngOnInit(): void {
    console.log("on init");

  }

}
