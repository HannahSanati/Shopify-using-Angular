import { AttributeType, ProductCondition } from './attribute.model';


export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName?: string;
  condition: ProductCondition;
  attributeValues: ProductAttributeValue[];
}

export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName?: string;
  // condition?: string;
  condition: ProductCondition;
  attributeValues?: any[];
  media?: { 
    url: string; 
    type?: 'image' | 'video';
  }[];
}
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   stock: number;
//   categoryId: number;
  // condition?: ProductCondition;
//   attributeValues: any[];



export interface ProductAttributeValue {
  id: number;
  attributeId: number;
  attributeName: string;
  attributeType: AttributeType;
  value: string;
}

export interface ProductAttributeValueDTO {
  attributeId: number;
  value: string;
}
