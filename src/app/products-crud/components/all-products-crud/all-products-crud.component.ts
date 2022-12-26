import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-all-products-crud',
  templateUrl: './all-products-crud.component.html',
  styleUrls: []
})
export class AllProductsCRUDComponent implements OnInit {
  products: any
  categories: any = [
    "dinning-room",
    "bed-room",
    "living-room",
    "sofas",
    "office",
    "chairs"
  ]
  cartProduct: any[] = []
  form!: FormGroup

  multipleFiles = []

  productToUpdateId: string = ''
  productToDeleteId: string = '';

  constructor(private productsService: ProductsService, private build: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProducts()

    this.form = this.build.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
      dimensions: ['', [Validators.required]],
      material: ['', [Validators.required]],
      number_of_units: ['', [Validators.required]],
      number_available: ['', [Validators.required]],
      delivery_within: ['', [Validators.required]],
      made_in: ['', [Validators.required]],
      images: [[], [Validators.required]],
    })
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res
      },
      error: (err: { message: any; }) => { alert(err.message) }
    })

  }


  //#region filter by category
  filterByCategory(event: any) {
    let value = event.target.value;
    (value === "all") ? this.getAllProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.productsService.getProductsByCategory(keyword).subscribe({
      next: (res: any) => {
        this.products = res
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }
  //#endregion filter by category


  //#region add product
  addProduct() {
    const newProduct = this.form.value
    this.productsService.addNewProduct(newProduct).subscribe({
      next: (res: any) => {
        console.log(res)
        alert('Product added successfully')
        this.getAllProducts()
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value)
  }
  //#endregion add product

  //#region update product
  updateProduct(item: any) {
    this.form.patchValue({
      name: item.name,
      category: item.category,
      color: item.color,
      price: item.price,
      dimensions: item.dimensions,
      material: item.material,
      number_of_units: item.number_of_units,
      number_available: item.number_available,
      delivery_within: item.delivery_within,
      made_in: item.made_in,
      images: item.images,
    })
  }

  confirmUpdateProduct() {
    this.productsService.updateProductById(this.productToUpdateId, this.form.value).subscribe({
      next: (res: any) => {
        this.getAllProducts()
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }
  //#endregion update product


  deleteProduct() {
    this.productsService.deleteProductById(this.productToDeleteId).subscribe({
      next: (res: any) => {
        alert('Product deleted successfully')
        this.productToDeleteId = ''
        this.getAllProducts()
      },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }


  //#region multiple image upload
  images: any = []
  selectMultipleFiles(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.images[i] = event.target.files[i].name
      }
      this.form.get('images')?.setValue(this.images)
    }

    const formData = new FormData()
    for (let eachFile of event.target.files) {
      formData.append('files', eachFile)
    }

    this.productsService.uploadFile(formData).subscribe({
      next: (res: any) => { },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }

  onMultipleFilesUpload() {
    const formData = new FormData()
    for (let eachFile of this.multipleFiles) {
      formData.append('files', eachFile)
    }

    this.productsService.uploadFile(formData).subscribe({
      next: (res: any) => { },
      error: (err: { message: any }) => { alert(err.message) }
    })
  }
  //#endregion multiple image upload


}
