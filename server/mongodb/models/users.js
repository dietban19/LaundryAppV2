import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  loggedIn: { type: Boolean, required: true },
  profileImage: { type: Object, required: true },
  allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // firstName: String,
  // lastName: String,
  // email: { type: String, unique: true },
  // password: String,
});
const userModel = mongoose.model("User", UserSchema);
export default userModel;
