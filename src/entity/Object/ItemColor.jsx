import { Variant } from "./Variant";

export class ItemColor{
    constructor(data={}){
        this.idColor=data.idColor || null;
        this.productId=this.productId || null;
        this.variants=(data.variants || []).map(v => new Variant(v));
    }
}