import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }

  @Output() changeMarkdown = new EventEmitter<string>();

  @Input() markdownContent: any = '';
  @Input() label = "Value";


  onChange(event: any) {
    // this.changeMarkdown.emit(event.target.value)
    const target = event.target as HTMLInputElement;
    if (target) {
      this.changeMarkdown.emit(event.target.value)
      // console.log(target.value);
    }
  }

  ngOnInit(): void {
  }

}
