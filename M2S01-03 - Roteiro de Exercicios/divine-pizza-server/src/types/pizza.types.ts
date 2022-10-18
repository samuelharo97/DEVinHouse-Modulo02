export interface IPizzas {
  id: string;
  url: string;
  name: string;
  description: string;
  price: string;
  ingredients: string[];
}
export interface IBodyUpdatePizzas {
  id?: string;
  url?: string;
  name?: string;
  description?: string;
  price?: string;
  ingredients?: string[];
}

export interface IRouteParamsPizzas {
  id: string;
}
