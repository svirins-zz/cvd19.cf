import Query from './Query'
import Result from './Result'
type Resolvers = IResolvers<any, any> | IResolvers<any, any>[] | undefined;

const resolvers: unknown = {
  Query,
  Result,
};

export default resolvers