import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

import { Product, ProductDTO, ProductAttributeValue, ProductAttributeValueDTO } from '../models/product.model';
import { CategoryAttributeDTO } from '../models/attribute.model';
import { AttributeService } from './attribute.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private readonly productsEndpoint = 'products';
  private readonly productAttributesEndpoint = 'product-attributes';
  private readonly attributeService = inject(AttributeService);


  getProducts(): Observable<Product[]> {
    return this.get<Product[]>(this.productsEndpoint).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: ProductDTO | FormData): Observable<Product> {
    return this.post<Product>(this.productsEndpoint, product).pipe(
      catchError(this.handleError)
    );
  }
  getProductAttributes(productId: number): Observable<ProductAttributeValue[]> {
    return this.get<ProductAttributeValue[]>(`${this.productAttributesEndpoint}?productId=${productId}`).pipe(
      catchError(this.handleError)
    );
  }
  addProductAttribute(productAttribute: ProductAttributeValueDTO): Observable<ProductAttributeValue> {
    return this.post<ProductAttributeValue>(this.productAttributesEndpoint, productAttribute).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * گرفتن ویژگی‌های مجاز برای محصول (بر اساس دسته‌بندی و ارث‌بری)
   */
  getAvailableAttributesForProduct(categoryId: number): Observable<CategoryAttributeDTO[]> {
    return this.attributeService.getCategoryAttributes(categoryId).pipe(
      catchError(this.handleError)
    );
  }
  deleteProduct(productId: number): Observable<void> {
    return this.delete<void>(`${this.productsEndpoint}/${productId}`).pipe(
      catchError(this.handleError)
    );
  }
//////i just add this for buying
buyProduct(productId: number) {
  return this.http.patch(`${environment.apiUrl}/products/${productId}`, { stockChange: -1 });
}

  searchProducts(term: string): Observable<Product[]> {
    const encodedTerm = encodeURIComponent(term);
    return this.get<Product[]>(`${this.productsEndpoint}/search?term=${encodedTerm}`).pipe(
      catchError(this.handleError)
    );
  }


  updateProduct(id: number, product: ProductDTO): Observable<ProductDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.put<ProductDTO>(url, product);
  }
}