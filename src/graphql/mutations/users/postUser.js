import { GraphQLString as StringType } from "graphql";
import moment from "moment";

// Types
import UserType from '../../types/user';

// Constants 
import { NEW_USER_CREATED } from '../../../constants/subscriptions';

// Models 
import UserModel from '../../../models/user'

module.exports = {
    type: UserType,
    description: "Adds New Data to the Database",
    args: {
        fullName: { type: StringType },
        email: { type: StringType },
        mobile: { type: StringType },
    },
    async resolve(parent, args, context) {
        try {
            const user = new UserModel({
                fullName: args.fullName,
                email: args.email,
                mobile: args.mobile,
                createdOn: moment().valueOf(),
                modifiedOn: moment().valueOf()
            })
            await user.save();
            context.pubsub.publish(NEW_USER_CREATED, user)
            return user;
        } catch (error) {
            return error;
        }
    }
};

/*


mutation ($fullName: String!, $mobile: String!, $email: String!) {
  postUser(fullName: $fullName, mobile: $mobile, email: $email) {
    id
    email
    mobile
  }
}

 */