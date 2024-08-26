import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (email!=="" && password!=="") {
     const user = await User.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  }
  else {
  return response.status(400).send("Email & Password Required");
  }}
  catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && bcrypt.compareSync(password, user.password)) {
//     let TOKEN = jwt.sign(
//       { name: user.name, userId: user._id },
//       process.env.JWT_KEY
//     );
//     return res.json({ message: "login with token", TOKEN });
//   }
//   res.json({ message: "User not found or password is wrong" });
// };

export { signup};
