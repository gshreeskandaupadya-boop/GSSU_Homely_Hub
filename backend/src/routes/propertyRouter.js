import express from "express";
import { getProperties, getProperty, createProperty, getMyAccommodations } from "../controllers/propertyController.js";
import { protect } from "../controllers/authController.js";

const propertyRouter = express.Router()

propertyRouter.route("/").get(getProperties)
propertyRouter.route("/my-accommodations").get(protect, getMyAccommodations)
propertyRouter.route("/new").post(protect, createProperty)
propertyRouter.route("/:id").get(getProperty)

export{propertyRouter};