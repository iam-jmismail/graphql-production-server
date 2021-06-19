import { GraphQLString as StringType } from "graphql";
import mongoose from "mongoose";

// Types
import UserType from '../../types/user';

// Models 
import UserModel from '../../../models/user'

const deleteUser = {
    type: UserType,
    description: "Deletes a single user",
    args: {
        id: { type: StringType },
    },
    async resolve(parent, args) {
        try {
            const status = await UserModel.updateOne({ _id: mongoose.mongo.ObjectId(args.id), }, {
                $set: { "deleted": true }
            })
            if (status.nModified === 0) return { statusText: "Not Deleted" }
            else return { statusText: "User Deleted" }
        } catch (error) {
            return { statusText: error.toString() };
        }
    }
};

module.exports = deleteUser;

/*

mutation ($id: String!) {
  deleteUser(id: $id) {
    statusText
  }
}

 */