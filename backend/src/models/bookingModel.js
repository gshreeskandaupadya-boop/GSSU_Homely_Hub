//which property???
//whis user
//price
//dates
//guests,
//paid

import mongoose from "mongoose";
import "./propertyModel.js";
import "./userModel.js";


const bookingSchema = new mongoose.Schema(
    {
      property:{
        type: mongoose.Schema.ObjectId,
        ref: "Property",
        required:[true,"Booking must belong to a Property"]
      },

      user:{
         type: mongoose.Schema.ObjectId,
        ref: "User",
        required:[true,"Booking must belong to a User"]
      },

      price:{
        type:Number,
        required:[true,"Booking must have price"]
      },

      createdAt:{
        type:Date,
        default:Date.now()
      },
      paid:{
        type:Boolean,
        default:true
      },
      fromDate:{
        type:Date
      },
      toDate:{
       type:Date,
      },
      guests:{
        type:Number
      },
      numberOfnights:{
        type:Number
      }
    },
    
    {timestamps:true}
);


bookingSchema.pre(/^find/, function(next){
    this.populate("user").populate({
        path:"property",
        select: "maximumGuest images propertyName address"
    });
    if (typeof next === "function") next();
})

const Booking = mongoose.model("Booking", bookingSchema);

export {Booking};