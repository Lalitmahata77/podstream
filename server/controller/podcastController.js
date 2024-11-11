import asyncHandler from "../middleware/asyncHandler.js";
import Podcast from "../models/padcastModel.js";

export const addPodcast = asyncHandler(async(req,res,next)=>{
try {
    const {name,description,category} = req.body;
    switch (true) {
        case !name:
          return res.json({ error: "Name is required" });
        case !description:
          return res.json({ error: "Description is required" });
        case !category:
          return res.json({ error: "Category is required" })
      }
    
      const podcats = new Podcast({...req.body})
      await podcats.save()
      res.json(podcats)
} catch (error) {
    res.status(400).json(error.message)
}
})

export const updatePodcast = asyncHandler(async(req,res,next)=>{
   try {
     const {name,description,category} = req.body;
     switch (true) {
         case !name:
           return res.json({ error: "Name is required" });
         case !description:
           return res.json({ error: "Description is required" });
         case !category:
           return res.json({ error: "Category is required" })
       }
     const podcast = await Podcast.findByIdAndUpdate(req.params.id , {...req.body}, {new : true})
     await podcast.save()
     res.json(podcast)
   } catch (error) {
    console.log(error);
    res.status(500).json({message : "Internal server error"})
    
   }
})

export const deletePodcast = asyncHandler(async(req,res,next)=>{
 try {
   const {id} = req.params;
   const deletedPodcast = await Podcast.findByIdAndDelete(id)
   res.json({message : "Product deleted successfully"})
 } catch (error) {
  console.log(error);
  res.status(500).json({message : "Internal server error"})
  
 }

})


export const fetchPodcast = asyncHandler(async(req,res,next)=>{
  try {
    const pageSize = 6;
    const keyword = req.query.keyword ? {
     name : {
       $regex : req.query.keyword,
       $options : "i"
     },
    }: {}
    const count = await Podcast.countDocuments({...keyword})
    const podcasts =await Podcast.find({...keyword}).limit(pageSize)
    res.status(200).json({
     podcasts,
     page : 1,
     pages : Math.ceil(count/pageSize),
     hasMore : false
    })
 
  } catch (error) {
   console.log(error);
   res.status(500).json({error :"internal server error"})
   
  }
 })


//  export const fetchPodcastById = asyncHandler(async(req,res,next)=>{
//   try {
//     const {id} = req.params
//     const podcast =await Podcast.findById(id)
//         if (podcast) {
//       res.json(podcast)
//     }else{
//       res.json({message : "Podcast not found"})
//     }
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message : "Internal server error"})
    
//   }
//  })

//  export const fetchPodcasts = asyncHandler(async(req,res,next)=>{
//   try {
//     const podcasts = await Podcast.find({})
    
//     res.status(201).json(podcasts)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message : "Internal server error"})
    
//   }
//  })
export const podcasts = asyncHandler(async(req,res,next)=>{
  try {
    const podcasts = await Podcast.find({})
    .populate("category")
    .limit(12)
    .sort({createAt: -1})
    res.json(podcasts)
  } catch (error) {
    console.log(error);
   res.status(500).json({message : "Internal server error"})
  }
})
 export const addPodcastReview = asyncHandler(async(req,res,next)=>{
try {
    const {rating,comment} = req.body;
    const podcast = await Podcast.findById(req.params.id)
    if (podcast) {
      const alreadyReviewed = podcast.reviews.find((r)=>r.user.toString() === req.user._id.toString())
      if (alreadyReviewed) {
        res.status(400)
        throw new Error("Podcast already reviewed")
      }
      const review = {
        name : req.user.username,
        rating : Number(rating),
        comment,
        user : req.user._id
      }
      podcast.reviews.push(review)
      podcast.numReviews = podcast.reviews.length
  
      podcast.rating = podcast.reviews.reduce((acc,item)=>item.rating + acc,0) / podcast.reviews.length
  
      await podcast.save()
   res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
} catch (error) {
  console.log(error);
  res.status(400).json(error.message)
  
}
  
  })

  export const fetchTopPodcast = asyncHandler(async(req,res,next)=>{
    try {
      const podcast = await Podcast.find({}).sort({rating : -1}).limit(4)
      res.json(podcast)
      
    } catch (error) {
      console.log(error);
      res.status(400).json(error.message)
      
    }
  })
  export const fetchNewPodcast = asyncHandler(async(req,res,next)=>{
    try {
      const podcast = await Podcast.find({}).sort({_id : -1}).limit(5)
      res.json(podcast)
    } catch (error) {
      res.status(400).json(error.message)
      console.log(error);
      
    }
  })



  export const filterPodcast = asyncHandler(async(req,res,next)=>{
    try {
      const { checked, radio } = req.body;
  
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
  
      const podcast = await Podcast.find(args);
      res.json(podcast);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  })