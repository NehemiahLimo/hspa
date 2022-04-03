export interface IPropertyBase
 {
   id: number;
   sellRent: number;
   name: string;
   propertyType: string;
   furnishingType: string;
   bhk: number;
   builtArea: number;
   city: string;
   readyToMove: number;
   price: number;
   image?: string;
   estPossessionOn?:Date;

 }
