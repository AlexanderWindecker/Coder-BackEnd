import passport from "passport";
import { usersModel } from "../dao/models/users.model.js";
import { Strategy as GithubStrategy } from "passport-github2";

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.9dfea8ca6898b179",
      clientSecret: "75b67d0a05fba1882ab0cc1b7d3f7b10fa7fdfc3",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await usersModel.findOne({ email: profile._json.email });
      if (!user) {
        const newUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1] || " ",
          email: profile._json.email,
          password: " ",
        };
        const userDB = await usersModel.create(newUser);
        done(null, userDB);
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersModel.findById(id);
  done(null, user);
});

//App ID: 306974

//Client ID: Iv1.9dfea8ca6898b179

//clientsecret: 75b67d0a05fba1882ab0cc1b7d3f7b10fa7fdfc3
