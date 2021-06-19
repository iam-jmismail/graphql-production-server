import { GraphQLString as StringType } from "graphql";
import mongoose from "mongoose";

// Types
import UserType from '../../types/user';

// Models 
import UserModel from '../../../models/user'

module.exports = {
    type: UserType,
    description: "Updates users",
    args: {
        id: { type: StringType },
        fullName: { type: StringType },
        email: { type: StringType },
        mobile: { type: StringType },
    },
    async resolve(parent, args) {
        try {
            const tobeUpdate = {};
            if (args.fullName) tobeUpdate.fullName = args.fullName;
            if (args.email) tobeUpdate.email = args.email;
            if (args.mobile) tobeUpdate.mobile = args.mobile;

            const status = await UserModel.updateOne({ _id: mongoose.mongo.ObjectId(args.id) }, {
                $set: tobeUpdate
            });
            if (status.nModified === 0) return { statusText: "Not Updated" }
            else return { statusText: "User details updated" }
        } catch (error) {
            return { statusText: error.toString() };
        }
    }
};

/*
mutation ($id: String!, $fullName: String, $mobile: String, $email: String) {
  updateUser(id: $id, fullName: $fullName, mobile: $mobile, email: $email) {
    statusText
  }
}
*/