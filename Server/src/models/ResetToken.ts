import { Model, Schema, Types, HydratedDocument, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import constants from "../utils/constants";
mongoose.set('strictQuery', false);

interface IResetToken {
    userId: string;
    token: string;
    createdAt: Date;
}

interface ResetTokenMethods extends Model<IResetToken> {
    /** Deletes the reset token from the database
    */
    deleteResetToken(): void;
    /** Verifies the reset token for comparison
    */
    verifyResetToken(token: string): Promise<boolean>;
}

interface ResetTokenModel extends Model<IResetToken, {} ,ResetTokenMethods> {
}

const ResetTokenSchema = new Schema<IResetToken, ResetTokenModel, ResetTokenMethods>({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: 3600, default: Date.now },
});

ResetTokenSchema.pre("save", function (next) {
    bcrypt.genSalt(constants.bcrypt_log_rounds, (err, salt) => {
        bcrypt.hash(this.token, 10, (err, hash) => {
            if (err) return next(err);
            this.token = hash;
            next();
        });
    });
});

ResetTokenSchema.methods.deleteResetToken = async function () {
    await this.deleteOne({ _id: this.userId })
}

ResetTokenSchema.methods.verifyResetToken = async function (token: string) {
    return await bcrypt.compare(token, this.token);
}

const ResetToken = model<IResetToken, ResetTokenModel>("ResetToken", ResetTokenSchema);

export default ResetToken;
