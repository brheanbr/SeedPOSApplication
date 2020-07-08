import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-slip',
  templateUrl: './order-slip.component.html',
  styleUrls: ['./order-slip.component.css']
})
export class OrderSlipComponent implements OnInit {
  @Input() orders$;
  constructor() { }

  ngOnInit() {
  }

}
