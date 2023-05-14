import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: [true, "Email already exists"],
  },
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    // match: [
    //   /^[a-zA-Z0-9]{6,20}$/,
    //   "Username invalid, it should contain 6-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
