import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { productsDB } from '../../shared/data/products';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/models/product';
import { SubscriptionContainer } from 'src/app/_helper/subscription-container';
import { ProductService } from 'src/app/_services/product.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { CharacteristicsPopupComponent } from '../characteristics-popup/characteristics-popup.component';
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
  filterBy;
  filter : FilterPipe;
  subs = new SubscriptionContainer();
  constructor(private router : ActivatedRoute,
               public dialog: MatDialog,
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

  openPopup(id:string) {
    const dialogRef = this.dialog.open(CharacteristicsPopupComponent , {data:{prodId:id}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
