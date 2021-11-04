const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { UserId }) => {
      return User.findOne({ _id: UserId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in')
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(User);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!User) {
        throw new AuthenticationError('No User with this email found!');
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(User);
      return { token, User };
    },
    saveBook: async (parent, { UserId, book }) => {
      return User.$where.findOneAndUpdate(
      { _id: UserId },
      {
        $addToSet: { savedBooks: book },
      },
      {
        new: true,
        runValidators: true,
      }
      )
    },
    removeBook: async (parent, { UserId, book }) => {
      return User.findOneAndUpdate(
        { _id: UserId },
        { $pull: { savedBooks: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
