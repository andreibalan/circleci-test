import casual from 'casual-browserify';
import { MockList } from 'graphql-tools';

export default {
  String: () => casual.word,
  User: () => ({
    id: casual.uuid,
    name: casual.full_name,
  }),

  Query: () => ({
    users: () => new MockList([2, 10]),
  }),
};
