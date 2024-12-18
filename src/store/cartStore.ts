import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
import { IProducts } from "./productsStore";

export interface ICart {
  products?: IProducts[];
}

export class CartStore {
  cart: ICart = { products: [] };
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      cart: observable,
      addProductInCart: action,
      removeProductInCart: action,
      getCarts: computed,
      getCartsCount: computed,
    });
    this.rootStore = rootStore;
  }

  addProductInCart(product: IProducts) {
    this.cart.products?.push(product);
  }

  removeProductInCart(product: IProducts) {
    const products = (this.cart.products || []).filter(
      (p: IProducts) => p.id !== product.id
    );
    this.cart.products = products || [];
  }

  get getCarts() {
    return this.cart.products || [];
  }

  get getCartsCount() {
    return this.cart.products?.length || 0;
  }
}
