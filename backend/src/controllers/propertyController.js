// get all properties
// get property based on id


import { Property } from "../models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";


// get all properties

const getProperties = async(req,res)=>{
    try{
      const features = new APIFeatures(Property.find(),req.query)
      .filter()
      .search()
      .paginate();

      const allProperties = await Property.find();

      const doc = await features.query;

      res.status(200).json({
        status:"success",
        no_of_responses: doc.length,
        all_properties: allProperties.length,
        data:doc
      })
    }catch(error){
        console.error("Error searching properties: ", error)
            res.status(500).json({error:"Internal server Error"})
    }
}

//get property by id
// http://localhost:8080/api/v1/rent/listing/:id
//http://localhost:8080/api/v1/rent/listing/666476848
// req.params.id

const getProperty = async(req,res)=>{
    try{
       const property = await Property.findById(req.params.id);

       res.status(200).json({
        status:"success",
        data: property,
       })

    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
}

// create a new property
const createProperty = async(req, res) => {
    try {
        const {
            propertyName, description, propertyType, roomType,
            extraInfo, images, amenities, address,
            checkInTime, checkOutTime, maximumGuest, price
        } = req.body;

        const newProperty = await Property.create({
            propertyName,
            description,
            propertyType,
            roomType,
            extraInfo,
            images,
            amenities,
            address,
            checkInTime,
            checkOutTime,
            maximumGuest,
            price,
            userId: req.user._id
        });

        res.status(201).json({
            status: "success",
            message: "Property created successfully",
            data: newProperty
        });
    } catch(error) {
        console.error("Error creating property: ", error);
        res.status(400).json({ status: "fail", message: error.message });
    }
}

// get all accommodations for the logged in user
const getMyAccommodations = async(req, res) => {
    try {
        const properties = await Property.find({ userId: req.user._id });
        res.status(200).json({
            status: "success",
            data: properties
        });
    } catch(error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
}

export{
    getProperties,
    getProperty,
    createProperty,
    getMyAccommodations
}