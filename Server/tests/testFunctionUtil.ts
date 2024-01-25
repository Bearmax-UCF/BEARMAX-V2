import User from "../src/models/User";

// Use this file to write utility functions for backend unit tests

export async function createVerifiedUser() : Promise<void>{
    await new User({
      email: "random@random.com",
      firstName: "random",
      lastName: "random",
      password: "123456",
    }).save();
    const user = await User.findOne({ email: "random@random.com" });
    user!.isVerified = true;
    await user!.save();
}



