import { Injectable } from '@angular/core';
import { Http_Requests } from '../http_request.service';
import { sellerRequest } from '../models/sellerRequest.model';
import { seller } from '../models/seller.model';

@Injectable()
export class AdministrateHandlerService {

  public solicitudes : Array<sellerRequest>;	
  public sellerList : Array<seller>;
  constructor(private http_request : Http_Requests) { 
  	this.solicitudes = new Array<sellerRequest>();
    this.sellerList = new Array<seller>();
    setInterval(()=>{this.getSellerRequests();this.getSellers()},10000);
  }



  public acceptSellerRequest(request){

  }

  public getSellerRequests(){
  	this.http_request.getService('Solicitudes')
  	.then(response => {
      this.solicitudes = response[0];
    })
  	.catch(error =>{
  		console.log("Error: ",error)
  	})
  }

  public getSellers(){
    this.http_request.getService('Vendedores')
    .then(response => {
      this.sellerList=response[0];
    })
    .catch(error => {
      console.log('Error: ',error);
    })
  }

  public acceptRequestSeller(requestID){
    this.http_request.postService(requestID,'decidirVendedor')
    .then(response => {console.log(response);
       //llamar al snackbar aqui
    })
    .catch(error => console.log("Error:",error))
  }

  public declineRequestSeller(requestID){
    this.http_request.deleteService(requestID,'borrarVendedor')
    .then(response => {
      //llamar al snackbar aqui
    })
    .catch(error => console.log("Error",error))
  }

  public acceptRequestCategory(requestID){
    this.http_request.postService(requestID,'decidirVendedor')
    .then(response => {console.log(response);
       //llamar al snackbar aqui
    })
    .catch(error => console.log("Error:",error))
  }

  public declineRequestCategory(requestID){
    this.http_request.deleteService(requestID,'borrarVendedor')
    .then(response => {
      //llamar al snackbar aqui
    })
    .catch(error => console.log("Error",error))
  }

}
