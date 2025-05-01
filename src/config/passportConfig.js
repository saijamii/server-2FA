import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "user not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("We are inside serialzeUser");
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserialzeUser");
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
