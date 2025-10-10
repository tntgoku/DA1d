

import { Variant } from "./Variant";
export class VariantColor{
  constructor(data ={}) {
    this.idColor = data.idColor || null;
    this.color = data.color || "";
    this.variantsStorage = (data.variants || []).map(v => new Variant(v));
  }
}