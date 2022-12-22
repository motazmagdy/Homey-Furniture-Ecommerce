import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {
  @Input() data:any ={}
  @Output() item =new EventEmitter()
  addButton:boolean = false;
  amount:number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  add(){
    this.item.emit({
      //  userId:localStorage.getItem('user'),
       productId:this.data._id,
        quantity:this.amount
     
      })
  }

}
