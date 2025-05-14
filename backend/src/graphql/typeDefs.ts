// import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
// import { typeDefs as userTypeDefs } from '../domain/users/presentation/userSchema.js';
// import { resolvers as userResolvers } from '../domain/users/presentation/userResolvers.js';

// import { typeDefs as productTypeDefs } from "../products/presentation/productSchema";
// import { resolvers as productResolvers } from "../products/presentation/productResolvers";

// export const typeDefs = mergeTypeDefs([userTypeDefs]);
// export const resolvers = mergeResolvers([userResolvers]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from '../domain/users/presentation/userSchema.js';
import { cardTypeDefs } from '../domain/cards/presentation/cardSchema.js';

export const typeDefs = mergeTypeDefs([userTypeDefs, cardTypeDefs]);
