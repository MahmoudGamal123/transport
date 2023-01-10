import TransportationModel from '../../../DB/model/transport.model.js'
import jwt from "jsonwebtoken"

//add transport

export const addTrans= async (req, res) => {
    try {
      // Verify JWT and check for admin role
      // const authData = await jwt.verify(req.token, process.env.JWT_SECRET);
      // if (authData.user.role !== 'admin') {
      //   return res.status(401).json({ msg: 'Unauthorized' });
      // }
  
      // Validate input
      const { rode, category, startLocation,endLocation } = req.body;
      if (!rode || !category || !startLocation || !endLocation) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }else{
        const savedTransportation = await new TransportationModel.save();
      res.json({message:"done",savedTransportation});
      }
  
      // Save transportation object to database
      
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };

// Get transportation by end location route

export const getTransByEndlocation= async (req, res) => {
  try {
    // Verify JWT and check for user role
    const authData = await jwt.verify(req.token, process.env.JWT_SECRET);
    if (authData.user.role !== 'user') {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Validate input
    const location = req.params.location;
    if (!location || typeof location !== 'string') {
      return res.status(400).json({ msg: 'Please enter a valid location' });
    }

    // Get transportation by end location
    const transportation = await TransportationModel.find({ to: location });
    res.json(transportation);
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    res.sendStatus(500);
  }
};


// Get transportation by end location and category route

export const getWithEndAndCategory=async (req, res) => {
  try {
    // Get transportation by end location and category
    const location = req.params.location;
    const category = req.params.category;
    const transportation = await TransportationModel.find({ to: location, category });

    // Check if transportation array is empty
    if (transportation.length === 0) {
      res.json({ msg: 'No transportation found. Please check back soon for updates.' });
    } else {
      res.json({ msg: 'Transportation retrieved successfully', transportation });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}



export const getAll = async (req, res) => {
  try {
    // Get transportation by start and end location
    const startLocation = req.params.from;
    const endLocation = req.params.to;
    const transportation = await TransportationModel.find({ startLocation, endLocation });

    // Check if transportation array is empty
    if (transportation.length === 0) {
      res.json({ msg: 'No transportation found. Please check back soon for updates.' });
    } else {
      res.json({ msg: 'Transportation retrieved successfully', transportation });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}









