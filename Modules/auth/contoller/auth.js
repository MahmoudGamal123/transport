import {userModel} from "../../../DB/model/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from '../../../service/email.js'

// =================== Sign Up ====================

export const signup = async (req, res) => {
  try {
      const { userName, email, password } = req.body
      const user = await userModel.findOne({ email }).select('email')
      if (user) {
          res.status(400).json({ message: 'Email Exist' })
      } else {
          const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
          const newUser = new userModel({ userName, email, password: hash })
          const savedUser = await newUser.save()
          const token = jwt.sign({ id: savedUser._id },"ssssssss")
          const message = `
          <a href='${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}'>Follow me to activate your account</a>
          `
          sendEmail(email, 'confirmEmail', message)
          console.log(message);

          savedUser ? res.status(201).json({ message: 'DOne', savedUser }) :
              res.status(400).json({ message: 'Fail to signUp' })

      }
  } catch (error) {
      res.status(500).json({ message: 'Catch error', error })

  }

}

//==================== confirm email ==============
export const confirmEmail = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.GENERATE_TOKEN);
      if (!decoded?.id) {
        res.status(400).json({ message: "In-valid payload" });
      } else {
        const user = await userModel.updateOne(
          { _id: decoded.id, confirmEmail: false },
          { confirmEmail: true }
        );
        user.modifiedCount
          ? res.status(200).json({ message: "Done  try to login" })
          : res.status(400).json({ message: "Already confirmed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Intenal server error" });
    }
  };



// ===================== Sign In ===================
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "account not Exist" });
      } else {
        if (!user.confirmEmail) {
          res.status(400).json({ message: "Confirm your email first" });
        } else {
          const match = bcrypt.compareSync(password, user.password);
          if (!match) {
            res.status(400).json({ message: "In-valid Password" });
          } else {
            const token = jwt.sign(
              { id: user._id, isLoggedIn: true },
              "TOKENSIGNATURE"
            );
            res.status(200).json({ message: "Done", token });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Intenal server error" });
    }
  };
  