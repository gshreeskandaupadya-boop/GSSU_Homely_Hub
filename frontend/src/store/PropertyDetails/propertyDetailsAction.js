import { propertyDetailsAction } from "./propertyDetailsSlice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axiosInstance.get(`/v1/rent/listing/${id}`);
    if (!response) {
      throw new Error("Could not fetch property details");
    }
    const { data } = response;
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction.getErrors(error.response?.data?.error || error.message));
  }
};
