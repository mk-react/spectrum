// @flow
import {
  getFrequencies,
  editFrequency,
  createFrequency,
  deleteFrequency,
} from '../models/frequency';
import type {
  CreateFrequencyArguments,
  EditFrequencyArguments,
} from '../models/frequency';

type Context = {
  user: Object,
};

module.exports = {
  Mutation: {
    createFrequency: (
      _: any,
      args: CreateFrequencyArguments,
      { user }: Context
    ) => createFrequency(args, user.uid),
    deleteFrequency: (_: any, { id }, { user }: Context) => {
      return getFrequencies([id]).then(frequencies => {
        if (frequencies[0].owners.indexOf(user.uid) > -1) {
          return deleteFrequency(id);
        }

        return new Error('Not allowed to do that!');
      });
    },
    editFrequency: (
      _: any,
      args: EditFrequencyArguments,
      { user }: Context
    ) => {
      return getFrequencies([args.input.id]).then(communities => {
        if (communities[0].owners.indexOf(user.uid) > -1) {
          return editFrequency(args);
        }

        return new Error('Not allowed to do that!');
      });
    },
  },
};