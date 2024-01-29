import User from "../src/models/User";
import { Types } from "mongoose";

// Use this file to write utility functions for backend unit tests

export async function createVerifiedUser() {
    await new User({
      email: "random@random.com",
      firstName: "random",
      lastName: "random",
      password: "123456",
    }).save();
    const user = await User.findOne({ email: "random@random.com" });
    user!.isVerified = true;
    await user!.save();
    return user;
}

export async function createUserWithGivenParameters(
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string
) {
    await new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    }).save();
    const user = await User.findOne({ email: email });
    user!.isVerified = true;
    await user!.save();
    return user;
}

export async function removeAllUsers() : Promise<void>{
    console.log(await User.deleteMany({__v: 0}));
}

export async function createRandomObjectId() : Promise<string>{
    return new Types.ObjectId().toString();
}



