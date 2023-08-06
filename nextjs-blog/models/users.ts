import mongoose, { Model, Schema, Types } from "mongoose";

interface IItem {
    name: string;
    condition: "poor" | "fair" | "good" | "very good";
}

// Subdocument Interface
interface IDonation {
    date: Date;
    address: string;
    items: Types.Array<IItem>;
}

// Document Interface
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    donations: IDonation[];
}

type UserDocumentProps = {
    donations: Types.DocumentArray<IDonation>;
};

type UserModelType = Model<IUser, {}, UserDocumentProps>;

// Create Model
// If already created, don't create again
export const User =
    mongoose.models.User ||
    mongoose.model<IUser, UserModelType>(
        "User",
        new Schema<IUser, UserModelType>(
            {
                firstName: String,
                lastName: String,
                email: String,
                password: String,
                donations: [
                    new Schema<IDonation>({
                        date: Date,
                        address: String,
                        items: [{ name: String, condition: String }],
                    }),
                ],
            },
            {
                timestamps: true,
            }
        )
    );
