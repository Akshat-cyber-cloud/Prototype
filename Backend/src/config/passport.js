const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL || "http://localhost:3000"}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const { id, displayName, emails, photos } = profile;
            const email = emails[0].value;
            const avatar = photos[0].value;

            try {
                // Check if user already exists
                let user = await User.findOne({ googleId: id });

                if (!user) {
                    // Check if a user with the same email exists (but no googleId)
                    user = await User.findOne({ email });

                    if (user) {
                        // Update existing user with googleId and avatar
                        user.googleId = id;
                        user.avatar = avatar;
                        await user.save();
                    } else {
                        // Create new user
                        user = await User.create({
                            name: displayName,
                            email: email,
                            googleId: id,
                            avatar: avatar,
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// We don't need serialize/deserialize because we use JWT (session: false)
