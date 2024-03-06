import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validator: validator.isEmail,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    contact: {
      type: number,
      required: [true, "contact is required"],
    },
    image: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    password: {
      type: String,
      required: [true, "Passcode is required"],
      minlength: [6, "passwoed length should be minimum 6 character"],
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model("User", userSchema);
