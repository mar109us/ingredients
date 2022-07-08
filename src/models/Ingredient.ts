export interface Ingredient {
  id: number;
  original: string;
  originalName: string;
  name: string;
  possibleUnits: Array<string>;
  consistency: string;
  shoppingListUnits: Array<string>;
  aisle: string;
  image: string;
  meta: Array<unknown>;
  categoryPath: Array<string>;
}
