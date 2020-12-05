import { makeExecutableSchema, mergeTypeDefs, mergeResolvers, loadFilesSync } from 'graphql-tools';
import path from 'path';

// api 폴더 내의 graphql 확장자를 가진 파일을 배열 형태로 가져온다.
const allTypes = loadFilesSync(path.join(__dirname, '../api/**/*.graphql'));

// api 폴더 내의 resolver.ts 확장자를 가진 파일을 배열 형태로 가져온다.
const allResolvers = loadFilesSync(path.join(__dirname, '../api/**/*.resolvers.ts'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes), // 가져온 graphql 파일의 타입을 합쳐준다.
  resolvers: mergeResolvers(allResolvers), // 가져온 resolvers 함수를 합쳐준다.
});

export default schema;
