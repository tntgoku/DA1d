
export class Cate {
      constructor(data) {
      this.id= data.id,
        this.name=data.name || "",
        this.displayOrder=data.displayOrder || "",
        this.parentId=data.parentId ,
        this.slug=data.slug,
        this.active=data.active || false,
        this.parents = (data.parents || []).map(v => new Cate(v));
      }
    getName() {
    return this.imgSrc;
  }
  getListParents(){
    return this.parents.filter(v => v.isisAvailable());
  }
}