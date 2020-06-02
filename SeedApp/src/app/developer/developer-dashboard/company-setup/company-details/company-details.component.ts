import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../_store';
import { Observable } from 'rxjs';
import { Company } from 'src/app/_models/company';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from 'src/app/_models/Product';
import {MatSort} from '@angular/material/sort';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})

export class CompanyDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<fromStore.CompanyAction>,
              private prodStore: Store<fromStore.ProductAction>, private route: ActivatedRoute,
              private alertify: AlertifyService, private modalService: BsModalService) { }

  selectedCompany$: Observable<Company>;
  companyError$: Observable<string>;

  employeeForm: FormGroup;
  employeeCashierForm: FormGroup;
  employeeTab: boolean;
  employees$: Observable<Employee[]>;

  productForm: FormGroup;
  productTab: boolean;
  products$: Observable<Product[]>;
  productsEntity$: Observable<Product>;

  loading$: boolean;
  loaded$: boolean;
  productError$: Observable<string>;

  modalRef: BsModalRef;
  displayedColumns: string[] = ['Id', 'Product', 'Type', 'DateCreated', 'Price', 'Action'];
  displayedColumnsForEmployee: string[] = ['Id', 'FullName', 'Type', 'DateRegistered', 'Gender', 'Address' ,
   'ContactNumber', 'Username' , 'Action', ];
  searchText: string;
  searchTextForEmployee: string;
  position: string;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadCompany(this.route.snapshot.paramMap.get('companyId')));
    this.prodStore.dispatch(new fromStore.LoadCompanyProduct(this.route.snapshot.paramMap.get('companyId')));
    this.store.dispatch(new fromStore.LoadCompanyEmployees(this.route.snapshot.paramMap.get('companyId')));
    this.employees$ = this.store.pipe(select(fromStore.getEmployees));
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
      companyId: [this.route.snapshot.paramMap.get('companyId')],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gender: ['', Validators.required],
      employeeType: ['', Validators.required]
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

  resetForms() {
    this.productsEntity$ = null;
    this.employeeForm.reset();
    this.productForm.reset();
    this.createRegisterEmployeeForm();
    this.createRegisterProductForm();
  }

  addAccountFields() {
    this.employeeForm.addControl('username', new FormControl('', Validators.required));
    this.employeeForm.addControl('password', new FormControl('', Validators.required));
  }
  checkType() {
    const employee = Object.assign({}, this.employeeForm.value);
    if (employee.employeeType === 'Cashier') {
       return true;
    } else {
      return false;
    }
  }
  addUsernameField() {
    if (this.checkType() === true) {
      this.employeeForm.addControl('username', new FormControl('', Validators.required));
      this.employeeForm.addControl('password', new FormControl('', Validators.required));
      return true;
    }
    this.employeeForm.removeControl('username');
    this.employeeForm.removeControl('password');
  }

  addEmployee() {
    const employee = Object.assign({}, this.employeeForm.value);
    this.store.dispatch(new fromStore.AddCompanyEmployee(employee));
    this.resetForms();
  }

  addProduct() {
    const product = Object.assign({}, this.productForm.value);
    if (this.productForm.valid) {
      if (this.productsEntity$) {
        if (this.productForm.touched) {
          this.prodStore.dispatch(new fromStore.EditCompanyProduct(product));
          this.resetForms();
        } else {
          this.alertify.error('Please make any changes!');
        }
      } else {
          this.prodStore.dispatch(new fromStore.AddCompanyProduct(product));
          this.resetForms();
        }
    }
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
    this.resetForms();
  }
  cancel(): void {
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  deleteEmployee(id): void {
    this.store.dispatch(new fromStore.DeleteCompanyEmployee(id));
    this.modalRef.hide();
    this.resetForms();
  }


}
