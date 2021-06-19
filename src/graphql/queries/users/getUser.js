import mongoose from 'mongoose';
import {
    GraphQLString as StringType,
} from "graphql";

// Types
import UserType from '../../types/user';

// Models 
import UserModel from '../../../models/user'


const getUser = {
    type: UserType,
    description: "Get Single user by Id",
    args: {
        id: { type: StringType },
    },
    async resolve(parent, args, context) {
        try {
            return await UserModel.findOne({ _id: mongoose.mongo.ObjectId(args.id) });;
        } catch (error) {
            return error;
        }
    }
};

module.exports = getUser;

/*
query ($id: String!) {
  getUser(id: $id) {
    id
    email
    mobile
  }
}
*/