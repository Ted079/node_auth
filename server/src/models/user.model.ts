import { model, Schema } from "mongoose";
import { IUser } from "../../../shared/types/user.types.js";

export interface IUserDocument extends Omit<IUser, "_id">, Document {
  password: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      //   match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    bio: {
      type: String,
      maxlength: 500,
    },

    // location: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    //cv pdf format add
  },

  { timestamps: true },
);

const User = model("User", UserSchema);
export default User;
