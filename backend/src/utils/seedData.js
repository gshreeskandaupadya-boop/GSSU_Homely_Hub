import mongoose from "mongoose";
import dotenv from "dotenv";
import { Property } from "../models/propertyModel.js";

dotenv.config();

const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
];

const sampleAmenities = [
  { name: "Wifi", icon: "wifi" },
  { name: "Kitchen", icon: "kitchen" },
  { name: "Tv", icon: "tv" },
  { name: "Free Parking", icon: "local_parking" },
  { name: "Ac", icon: "ac_unit" },
  { name: "Pool", icon: "pool" },
];

const sampleProperties = [
  {
    propertyName: "Sunny Beach Cottage",
    description: "A bright, airy cottage just steps from the beach. Wake up to ocean breezes, cook in a fully equipped modern kitchen, and relax on your private sunset balcony.",
    extraInfo: "Check-in on time. High-speed wifi and complimentary breakfast included.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 4,
    price: 4500,
    address: {
      area: "Juhu",
      city: "mumbai",
      state: "Maharashtra",
      pincode: 400049
    },
    amenities: sampleAmenities,
    images: PROPERTY_IMAGES.map((url, i) => ({ public_id: `img_seed_${i}`, url })),
    checkInTime: "13:00",
    checkOutTime: "10:00"
  },
  {
    propertyName: "Mountain View Villa",
    description: "Nestled in the lush hills with panoramic valley views. Cozy fireplaces, spacious wooden decks, and serene mountain trails right at your doorstep.",
    extraInfo: "Heated rooms available. Free parking for up to two vehicles.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 6,
    price: 7800,
    address: {
      area: "Mall Road",
      city: "manali",
      state: "Himachal Pradesh",
      pincode: 175131
    },
    amenities: sampleAmenities,
    images: PROPERTY_IMAGES.slice(1).concat(PROPERTY_IMAGES.slice(0, 1)).map((url, i) => ({ public_id: `img_seed_mv_${i}`, url })),
    checkInTime: "12:00",
    checkOutTime: "11:00"
  },
  {
    propertyName: "Cozy City Apartment",
    description: "A stylish, modern apartment located in the vibrant city center. Walking distance to the best cafes, tech parks, and cultural hotspots.",
    extraInfo: "24/7 security, high speed elevator and designated parking space.",
    propertyType: "Flat",
    roomType: "Room",
    maximumGuest: 3,
    price: 3200,
    address: {
      area: "Koramangala",
      city: "bengaluru",
      state: "Karnataka",
      pincode: 560034
    },
    amenities: sampleAmenities.slice(0, 4),
    images: PROPERTY_IMAGES.slice(2).concat(PROPERTY_IMAGES.slice(0, 2)).map((url, i) => ({ public_id: `img_seed_cca_${i}`, url })),
    checkInTime: "14:00",
    checkOutTime: "11:00"
  },
  {
    propertyName: "Lakeside Retreat",
    description: "Overlooking the tranquil waters with private dock access. Enjoy stunning sunrises, peaceful boating, and candlelit dinners by the water.",
    extraInfo: "Complimentary boat ride included for weekend bookings.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    maximumGuest: 5,
    price: 5600,
    address: {
      area: "Lake Pichola",
      city: "udaipur",
      state: "Rajasthan",
      pincode: 313001
    },
    amenities: sampleAmenities,
    images: PROPERTY_IMAGES.slice(3).concat(PROPERTY_IMAGES.slice(0, 3)).map((url, i) => ({ public_id: `img_seed_lr_${i}`, url })),
    checkInTime: "13:00",
    checkOutTime: "11:00"
  },
  {
    propertyName: "Heritage Haveli Stay",
    description: "Immerse yourself in authentic royal architecture with carved archways, lush courtyards, and traditional regal hospitality.",
    extraInfo: "Traditional Rajasthani dinner can be arranged on request.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 8,
    price: 6900,
    address: {
      area: "Amer Road",
      city: "jaipur",
      state: "Rajasthan",
      pincode: 302002
    },
    amenities: sampleAmenities,
    images: PROPERTY_IMAGES.slice(4).concat(PROPERTY_IMAGES.slice(0, 4)).map((url, i) => ({ public_id: `img_seed_hh_${i}`, url })),
    checkInTime: "12:00",
    checkOutTime: "10:00"
  },
  {
    propertyName: "Backwater Houseboat",
    description: "Glide through the emerald backwaters on a handcrafted traditional houseboat. Includes chef-prepared authentic coastal delicacies.",
    extraInfo: "Cruising begins at 1:00 PM. All meals included in the stay.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 4,
    price: 8200,
    address: {
      area: "Punnamada",
      city: "alappuzha",
      state: "Kerala",
      pincode: 688006
    },
    amenities: sampleAmenities,
    images: PROPERTY_IMAGES.map((url, i) => ({ public_id: `img_seed_bh_${i}`, url })),
    checkInTime: "13:00",
    checkOutTime: "09:00"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.insertMany(sampleProperties);
      console.log(`Successfully seeded ${sampleProperties.length} properties!`);
    } else {
      console.log(`Database already contains ${count} properties.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
