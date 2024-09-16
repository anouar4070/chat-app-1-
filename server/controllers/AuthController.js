import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email !== "" && password !== "") {
      const user = await User.create({ email, password });
      res.cookie("jwt", createToken(email, user.id), {
        maxAge,
        secure: true, //https
        sameSite: "None",
      });

      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,
        },
      });
    } else {
      return res.status(400).send("Email and Password Required");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email !== "" && password !== "") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User with the given email not found");
      }

      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(400).send("Password is incorrect");
      }
      res.cookie("jwt", createToken(email, user.id), {
        maxAge,
        secure: true, //https
        sameSite: "None",
      });

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          color: user.color,
        },
      });
    } else {
      return res.status(400).send("Email and Password Required");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};


export const  getUserInfo = async (request, response, next) => {
    try {
    const userData = await User.findById(request.userId);
    if(!userData) {
        return response.status(404).send("User with the given id not found");
    }
  
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error");
    }
  };

  

  export const  updateProfile = async (request, response, next) => {
    try {
        const { userId } =request;
        const { firstName, lastName,  color } = request.body;
    
    if(!firstName || !lastName ) {
        return response.status(400).send("Firstname lastname is required");
    }
    const userData = await User.findByIdAndUpdate(userId, {firstName, lastName,  color, profileSetup:true}, {new:true , runValidators: true})
  
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error");
    }
  };



  export const  addProfileImage= async (request, response, next) => {
    try {
        const { userId } =request;
        const { firstName, lastName,  color } = request.body;
    
    if(!firstName || !lastName ) {
        return response.status(400).send("Firstname lastname is required");
    }
    const userData = await User.findByIdAndUpdate(userId, {firstName, lastName,  color, profileSetup:true}, {new:true , runValidators: true})
  
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
        });
    } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error");
    }
  };
