import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as any;
  if (!user.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  const user = this as any;
  return await bcrypt.compare(enteredPassword, user.password);
};

const User = mongoose.model("User", userSchema);

export default User;
