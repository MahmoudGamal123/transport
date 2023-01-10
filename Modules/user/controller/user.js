import {userModel} from '../../../DB/model/user.model.js'
import bcryptjs from "bcryptjs";

//======================= soft delete account=====================
export const softdelete = async (req, res) => {
    try {
      if (req.user.role === "admin") {
        const { _id } = req.body;
        const userFound = await userModel.findOneAndUpdate(
          { _id, isDeleted: false, role: "user" },
          { isDeleted: true },
          {
            new: true
          }
        );
        if (userFound) {
          res.json({ message: "Done" });
        } else {
          res.json({ message: "fail to find the user" });
        }
      } else {
        const userFound = await userModel.findOneAndUpdate(
          { _id: req.user._id, isDeleted: false },
          { isDeleted: true },
          { new: true }
        );
        if (userFound) {
          res.json({ message: "Done" });
        } else {
          res.json({ message: "fail to find the user" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


//===================== update profile =======================
export const updatePassword = async (req, res) => {
  try {
    let { currentPassword, newPassword, newCPassword } = req.body;
  if (newPassword == newCPassword) {
    let user = await userModel.findById(req.user._id);
    let matched = await bcryptjs.compare(currentPassword, user.password);
    if (matched) {
      let hashedPass = await bcryptjs.hash(newPassword, parseInt(process.env.saltRound));
     let updatedUser =  await userModel.findByIdAndUpdate(user._id, {password:hashedPass},{new:true})
      res.json({ message: "updated", updatedUser });
  
    } else {
      res.json({message:"current password invalid"})
    }
  } else {
    res.json({ message: "newPassword must equal to newCPassword" });
  }
  } catch (error) {
    res.json({ message: "catch",error });
  }
  
}
//==================== Block account ========================
export const blockAccount = async (req, res) => {
    try {
      const { _id } = req.body;
      const userFound = await userModel.findOneAndUpdate(
        { _id, isBlocked: false, role: "user" },
        { isBlocked: true },
        {
          new: true
        }
      );
      if (userFound) {
        res.json({ message: "Done" });
      } else {
        res.json({ message: "fail to find the user" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  

//====================== get all users with their posts =================
export const getAllUsers = async (req, res) => {
    try {
      const { skip, limit } = pagination(req.query.page, req.query.size);
      const users = await userModel
        .find({ isDeleted: false })
        .populate([
          {
            path: "posts",
            select: ["postBody", "createdBy", "comments"],
            match: { isDeleted: false },
            populate: [
              {
                path: "comments",
                select: ["comment_body", "replies"],
                // match:{isDeleted:false} ,
                populate: {
                  path: "replies",
                  select: "comment_body replies",
                  populate: {
                    path: "replies",
                    select: "comment_body"
                  }
                }
              }
            ]
          }
        ])
        .select("email posts")
        .limit(limit)
        .skip(skip);
  
      users.length
        ? res.status(200).json({ message: "Done", users })
        : res.status(200).json({ message: "there are no users", users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };  