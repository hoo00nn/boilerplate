import { Resolvers } from "../../types/api";

const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return { result: "success", error: "no error" };
    },
  },
};

export default resolvers;
