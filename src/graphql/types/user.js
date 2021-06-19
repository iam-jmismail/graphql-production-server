import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLNonNull as NotNullType,
    // GraphQLFloat as FloatType 
} from 'graphql'

const userType = new ObjectType({
    name: "UserType",
    description: "UserType Type Defnitions",
    fields: () => ({
        id: { type: new NotNullType(StringType) },
        fullName: { type: new NotNullType(StringType) },
        email: { type: new NotNullType(StringType) },
        mobile: { type: new NotNullType(StringType) },
        statusText: { type: StringType },
    })
});

module.exports = userType;