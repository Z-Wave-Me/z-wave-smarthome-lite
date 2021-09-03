import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'z-wave-drop-down-head',
  templateUrl: './drop-down-head.component.html',
  styleUrls: ['./drop-down-head.component.scss'],
})
export class DropDownHeadComponent implements OnInit {
  constructor() {}
  @HostBinding('class.drop-down-head')
  class = true;
  ngOnInit(): void {}
}
