export class SpecEntity{
    constructor(data={}){
      this.id= data.id ||-1,
      this.categoryId= data.categoryId || -1,
      this.name= thidata.name || '',
      this.unitId= thidata.unitId || ''
    }
}
export class Unit{
    constructor(data={}){
        this.id=data.id||-1 ,
        this.name =data.name || '',  /*-- vd: GB, TB, mAh*/
        this.description =data.description ||''
    }
}