const { model } = require("mongoose");

// class
class ApiFeatures{
  constructor(sorov,sorovUrl){
    this.sorov=sorov
    this.sorovUrl=sorovUrl

  } 
  filter(){
     
      const query={...this.sorovUrl};
      const queryDelete=['sort','page','limit','field'];
      queryDelete.forEach(val=>delete query[val])
     
      const queryApi=JSON.stringify(query).replace(/\bgt\b/g,'$gt').replace(/\bgte\b/g,'$gte').replace(/\blt\b/g,'$lt').replace(/\blte\b/g,'$lte')
      
      this.sorov=this.sorov.find(JSON.parse(queryApi)
      // req.query // {req.price=497}
      );
     return this
  }

  sort(){
    if(this.sorovUrl.sort){
      const querySort=this.sorovUrl.sort.split(',').join(' ')
      console.log(querySort)
      this.sorov=this.sorov.sort(querySort)
     
    }
    return this;
  }

  field(){
    if(this.sorovUrl.field){
      const querySort=this.sorovUrl.field.split(',').join(' ')

      this.sorov=this.sorov.select(querySort)
    }
   return this;
  }

  pagination(pageDocument){
    const page=this.sorovUrl.page*1 || 1;
    const limit=this.sorovUrl.limit*1 || 4;
    const skip=(page-1)*limit;

    this.sorov=this.sorov.skip(skip).limit(limit);

    if(this.sorovUrl.page){
     
      if(pageDocument<=skip){
        throw new Error ("This page does not exist")
      }
    }
   return this;
  }


}

module.exports=ApiFeatures