import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  //é possivel escrever ?size=100 no fim da url e ter todos os itens mostrados. MAS ISSO É UMA GAMBIARRA
  private baseUrl = 'http://localhost:8090/api/productEntities'

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //url construida com a url base + o id passado
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;


    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      tap(response => console.log(response)),
      map(response => response._embedded.productEntities)
    );
  }
}

interface GetResponse{
  _embedded: {
    productEntities: Product[];
  }
}
