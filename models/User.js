import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Exclude confirmPassword from being saved in the database
UserSchema.virtual("confirmPassword")
  .set(function (value) {
    this._confirmPassword = value;
  })
  .get(function () {
    return this._confirmPassword;
  });

// Validate that password and confirmPassword match
UserSchema.pre("save", function (next) {
  if (this._confirmPassword && this.password !== this._confirmPassword) {
    return next(new Error("Passwords do not match!"));
  }
  next();
});

export default mongoose.model("User", UserSchema);
