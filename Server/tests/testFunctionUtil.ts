import User from "../src/models/User";
import PhysicianNotes from "../src/models/PhysicianNotes";
import EmotionRecognition from "../src/models/EmotionRecognition";
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

export async function createVerifiedUserWithGivenParameters(
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

export async function createNoteForVerifiedUser(title: string, userID: string, note: string) {
    return await new PhysicianNotes({title, date: new Date(), note, userID}).save(); 
}

export async function removeAllUsers() : Promise<void>{
    await User.deleteMany({__v: 0});
}

export async function removeCertainUser(email :string): Promise<void>{
    await User.deleteOne({email: email});
}

export async function createRandomObjectId() : Promise<string>{
    return new Types.ObjectId().toString();
}

export async function createEmotionRecognitionGameForVerifiedUser(
    UserID: string
) {
    return await new EmotionRecognition({
        Correct: 2,
        Wrong: 2,
        NumPlays: 3,
        GameFin: new Date(),
        UserID,
    }).save();
}