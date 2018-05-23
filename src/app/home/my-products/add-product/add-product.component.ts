import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ProductHandlerService } from '../../../shared/handlers/product.handler.service';
import { CatalogHandlerService } from '../../../shared/handlers/catalog.handler.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public title: string;
  public message: string;
  form: FormGroup;
  selected = '';
  constructor(
    private productHandler : ProductHandlerService,
  	public dialogRef: MatDialogRef<AddProductComponent>,
  	formBuilder: FormBuilder,
  	public snackBar: MatSnackBar,
    private catalogHandler : CatalogHandlerService) { 
  	this.form= formBuilder.group({
  		'nameFormControl': [null, Validators.required],
        'quantityFormControl': [null, Validators.compose([Validators.required, Validators.min(0)])],
        'descriptionFormControl': [null, Validators.required],
        'priceFormControl': [null, Validators.compose([Validators.required, Validators.min(0)])],
        'categoryFormControl': [null, Validators.required],
        'shippingTimeFormControl': [null, Validators.compose([Validators.required, Validators.min(0)])],
        'shippingFeeFormControl': [null, Validators.compose([Validators.required, Validators.min(0)])],
        //'imageFormControl': [null, Validators.required]
  	});
    this.catalogHandler.getCategories();
  }

  ngOnInit() {
  	this.title = ""
    this.message = ""
  }

  onSubmit(){//funcion para añadir producto a la lista de productos del vendedor
  	//validar si los datos son correctos para añadir o no el producto
  	if(this.form.valid){
  		this.dialogRef.close();
      this.openSnackBar('Producto agregado!', 'Ok');
  	} else {
      this.openSnackBar('Credenciales Incorrectas!', 'Ok');
    }
  	
  }

  openSnackBar(message: string, action: string) {
    let extraClasses=['background-grey'];
      this.snackBar.open(message, action, {
        duration: 2000,
        extraClasses: extraClasses
    });
  }

}
