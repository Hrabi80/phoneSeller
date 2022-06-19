import { Component, OnDestroy, OnInit } from '@angular/core';
import { productsDB } from '../../shared/data/products';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { ProductService } from 'src/app/_services/product.service';
@Component({
  selector: 'll-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,OnDestroy  {
  isLoaded: boolean;
  advanceSearchExpanded: boolean = false;
  products : Array<product>=[];
  cat : string;
  subs = new SubscriptionContainer();
  constructor(private router : ActivatedRoute,
              private service : ProductService) {}

  ngOnInit(): void {
      this.cat = this.router.snapshot.paramMap.get('category');
      this.subs.add = this.service.getProducts(this.cat).subscribe((res:Array<product>)=>{
      this.products = res;
    });
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
