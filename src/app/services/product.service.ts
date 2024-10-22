import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URLs base da API
  private baseUrl = 'http://localhost:8090/api/productEntities';
  private categoryUrl = 'http://localhost:8090/api/product-category';

  constructor(private httpClient: HttpClient) { }

  // Método para buscar a lista de produtos pela categoria
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      tap(response => console.log(response)),
      map(response => response._embedded.productEntities)
    );
  }

  // Método para buscar as categorias de produtos
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoriesResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

// Interface para o retorno de produtos
interface GetResponseProducts {
  _embedded: {
    productEntities: Product[];
  }
}

// Interface para o retorno de categorias de produtos
interface GetProductCategoriesResponse {
  _embedded: { productCategory: ProductCategory[]; };
}
