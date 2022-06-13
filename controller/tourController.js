const Tour = require('../model/tourModel.js');
const ApiFeatures=require("../helper/ApiFeatu.js")

// const fs=require('fs');

// const Tour=fs.readFileSync('./dev-data/data/tours-simple.json','utf-8')

const getToursAll = async (req, res) => {
  try {

    // const pageDocument=await Tour.countDocuments();

//    let data=new ApiFeatures(Tour,req.query).filter().sort().field().pagination(pageDocument)



    //1) filter
    const query={...req.query};
    console.log(query)
      const queryDelete=['sort','page','limit','field'];
      queryDelete.forEach(val=>delete query[val])
      console.log(query)
      const queryApi=JSON.stringify(query).replace(/\bgt\b/g,'$gt').replace(/\bgte\b/g,'$gte').replace(/\blt\b/g,'$lt').replace(/\blte\b/g,'$lte')
      let data=Tour.find(JSON.parse(queryApi)
      // req.query // {req.price=497}
      );


    // 2) sort
    if(req.query.sort){
      const querySort=req.query.sort.split(',').join(' ')
      console.log(querySort)
      data=data.sort(querySort)
    }


    // 3) Field
    if(req.query.field){
      const querySort=req.query.field.split(',').join(' ')
      console.log(querySort)
      data=data.select(querySort)
    }
 

    // 4) pagination
    const page=req.query.page*1 || 1;
    const limit=req.query.limit*1 || 4;
    const skip=(page-1)*limit;

    data=data.skip(skip).limit(limit); 

    if(req.query.page){
     
      const pageDocument=await Tour.countDocuments();
     
      if(pageDocument<=skip){
        throw new Error ("This page does not exist")
      }
    }


     const dataApi=await data.sorov
     console.log(dataApi)
  
    //////////////////////////////////
   if(dataApi.length){
    res.status(200).json({
      status: 'Success',
      results: dataApi.length,
      data: {
        dataApi,
      },
    });
   }
   else{
     throw new Error("Error")
   }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message:err.message,
    });
  }
};
const addTour = async (req, res) => {
  // assinxron funcsiya ishlatdikmmi try,catchni ishlatamiz
  try {
    // malumotni databasega yozish
    //1-usul
    // const tourModel = new Tour(req.body);
    // const data = await tourModel.save();
    // console.log(data);

    //2-usul
    const data = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      message: 'Invalid data',
    });
  }
};

const getTourItem = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Tour.findById(req.body.id);
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  } catch {
    res.status(404).json({
      message: 'Invalid data id',
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch {
    res.status(404).json({
      status: 'Failed',
      message: 'Updated Error',
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const data = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: data,
    });
  } catch {
    res.status(404).json({
      status: 'Failed',
      message: 'Updated Error',
    });
  }
};

/////////////////////////////////////////
/////////////////////////////////////////

const stats=async (req,res)=>{
  try{

    const data=await Tour.aggregate([
      {$match:{ratingsAverage:{$gte:4.7}}},
      {$group:{
        _id:'$ratingsAverage',
        averagePrice:{$avg:"$price"},
        minPrice:{$min:"$price"},
        maxPrice:{$max:"$price"},
        
      },}
    ])

    res.status(200).json({
      status:data.length,
      data:
        data,
      
    })

  } catch(err){
    res.status(200).json({
      message: err,
    });
  }
}
/////////////////////////////////////////

module.exports = {
  getToursAll,
  addTour,
  updateTour,
  deleteTour,
  getTourItem,
  stats,
};


