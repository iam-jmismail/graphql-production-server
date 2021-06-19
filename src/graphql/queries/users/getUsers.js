import { GraphQLList } from "graphql";

// Types
import UserType from '../../types/user';

// Models 
import UserModel from '../../../models/user'

const getUsers = {
  type: new GraphQLList(UserType),
  description: "Get All users",
  async resolve(parent, args, context) {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error) {
      return error;
    }
  }
};

module.exports = getUsers;

/*
{
  getUsers {
    id
    email
  }
}
*/