import { Component, OnInit, ViewChild, Pipe, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../_store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/_models/company';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/_models/Product';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { AdminService } from 'src/app/_services/Admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})

export class CompanyDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<fromStore.CompanyAction>,
              private prodStore: Store<fromStore.ProductAction>, private route: ActivatedRoute,
              private alertify: AlertifyService, private adminService: AdminService, private modalService: BsModalService) { }

  employeeForm: FormGroup;
  selectedCompany$: Observable<Company>;
  companyError$: Observable<string>;
  employeeTab: boolean;

  productForm: FormGroup;
  productTab: boolean;
  products$: Observable<Product[]>;
  productsEntity$: Observable<Product>;

  loading$: boolean;
  loaded$: boolean;
  productError$: Observable<string>;

  modalRef: BsModalRef;
  displayedColumns: string[] = ['Id', 'Product', 'Type', 'DateCreated', 'Price', 'Action'];
  dataSource = new MatTableDataSource();
  noData: Product[] = [{} as Product];
  searchText: string;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadCompany(this.route.snapshot.paramMap.get('companyId')));
    this.prodStore.dispatch(new fromStore.LoadCompanyProduct(this.route.snapshot.paramMap.get('companyId')));
    this.selectedCompany$ = this.store.pipe(select(fromStore.getCompany));
    this.companyError$ = this.store.pipe(select(fromStore.getCompanyError));
    this.products$ = this.prodStore.pipe(select(fromStore.getProducts));
    this.productError$ = this.prodStore.pipe(select(fromStore.getProductError));
    this.createRegisterEmployeeForm();
    this.createRegisterProductForm();
    this.prodStore.pipe(select(fromStore.getProductLoading)).subscribe(x => this.loading$ = x);
    this.prodStore.pipe(select(fromStore.getProductLoaded)).subscribe(x => this.loaded$ = x);
  }
  createRegisterEmployeeForm() {
    this.employeeForm = this.fb.group ({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  createRegisterProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      productType: ['', Validators.required],
      companyId: [this.route.snapshot.paramMap.get('companyId')]
    });
  }
  createEditProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      productType: ['', Validators.required]
    });
  }

  resetForms() {
    this.employeeForm.reset();
    this.productForm.reset();
    this.createRegisterEmployeeForm();
    this.createRegisterProductForm();
  }
  addProduct() {
    const product = Object.assign({}, this.productForm.value);
    if (this.productForm.valid) {
      if (this.productsEntity$) {
        this.prodStore.dispatch(new fromStore.EditCompanyProduct(product));
        this.productsEntity$ = null;
      } else {
        this.prodStore.dispatch(new fromStore.AddCompanyProduct(product));
      }
      this.resetForms();
    }
    this.resetForms();
  }

  edit(product) {
    this.productsEntity$ = this.prodStore.pipe(select(fromStore.getProductEntity(product.Id)));
    this.productForm = this.fb.group({
      Id: [product.Id, Validators.required],
      productName: [product.ProductName, Validators.required],
      productType: [product.ProductType, Validators.required],
      price: [product.Price, Validators.required],
      companyId: [product.CompanyId, Validators.required]
    });
  }

  delete(id): void {
    this.prodStore.dispatch(new fromStore.DeleteCompanyProduct(id));
    this.modalRef.hide();
  }
  cancel(): void {
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


}
