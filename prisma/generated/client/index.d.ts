
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Policy
 * 
 */
export type Policy = $Result.DefaultSelection<Prisma.$PolicyPayload>
/**
 * Model UprSnapshot
 * 
 */
export type UprSnapshot = $Result.DefaultSelection<Prisma.$UprSnapshotPayload>
/**
 * Model AdminExpenseAllocation
 * 
 */
export type AdminExpenseAllocation = $Result.DefaultSelection<Prisma.$AdminExpenseAllocationPayload>
/**
 * Model BranchParameters
 * 
 */
export type BranchParameters = $Result.DefaultSelection<Prisma.$BranchParametersPayload>
/**
 * Model PremiumActuals
 * 
 */
export type PremiumActuals = $Result.DefaultSelection<Prisma.$PremiumActualsPayload>
/**
 * Model ClaimsActuals
 * 
 */
export type ClaimsActuals = $Result.DefaultSelection<Prisma.$ClaimsActualsPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model AdminExpense
 * 
 */
export type AdminExpense = $Result.DefaultSelection<Prisma.$AdminExpensePayload>
/**
 * Model ActuarialEstimate
 * 
 */
export type ActuarialEstimate = $Result.DefaultSelection<Prisma.$ActuarialEstimatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Policies
 * const policies = await prisma.policy.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Policies
   * const policies = await prisma.policy.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.policy`: Exposes CRUD operations for the **Policy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Policies
    * const policies = await prisma.policy.findMany()
    * ```
    */
  get policy(): Prisma.PolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uprSnapshot`: Exposes CRUD operations for the **UprSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UprSnapshots
    * const uprSnapshots = await prisma.uprSnapshot.findMany()
    * ```
    */
  get uprSnapshot(): Prisma.UprSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminExpenseAllocation`: Exposes CRUD operations for the **AdminExpenseAllocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminExpenseAllocations
    * const adminExpenseAllocations = await prisma.adminExpenseAllocation.findMany()
    * ```
    */
  get adminExpenseAllocation(): Prisma.AdminExpenseAllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branchParameters`: Exposes CRUD operations for the **BranchParameters** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BranchParameters
    * const branchParameters = await prisma.branchParameters.findMany()
    * ```
    */
  get branchParameters(): Prisma.BranchParametersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.premiumActuals`: Exposes CRUD operations for the **PremiumActuals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PremiumActuals
    * const premiumActuals = await prisma.premiumActuals.findMany()
    * ```
    */
  get premiumActuals(): Prisma.PremiumActualsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claimsActuals`: Exposes CRUD operations for the **ClaimsActuals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimsActuals
    * const claimsActuals = await prisma.claimsActuals.findMany()
    * ```
    */
  get claimsActuals(): Prisma.ClaimsActualsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminExpense`: Exposes CRUD operations for the **AdminExpense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminExpenses
    * const adminExpenses = await prisma.adminExpense.findMany()
    * ```
    */
  get adminExpense(): Prisma.AdminExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actuarialEstimate`: Exposes CRUD operations for the **ActuarialEstimate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActuarialEstimates
    * const actuarialEstimates = await prisma.actuarialEstimate.findMany()
    * ```
    */
  get actuarialEstimate(): Prisma.ActuarialEstimateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.0
   * Query Engine version: ab56fe763f921d033a6c195e7ddeb3e255bdbb57
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Policy: 'Policy',
    UprSnapshot: 'UprSnapshot',
    AdminExpenseAllocation: 'AdminExpenseAllocation',
    BranchParameters: 'BranchParameters',
    PremiumActuals: 'PremiumActuals',
    ClaimsActuals: 'ClaimsActuals',
    Branch: 'Branch',
    AdminExpense: 'AdminExpense',
    ActuarialEstimate: 'ActuarialEstimate'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "policy" | "uprSnapshot" | "adminExpenseAllocation" | "branchParameters" | "premiumActuals" | "claimsActuals" | "branch" | "adminExpense" | "actuarialEstimate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Policy: {
        payload: Prisma.$PolicyPayload<ExtArgs>
        fields: Prisma.PolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          findFirst: {
            args: Prisma.PolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          findMany: {
            args: Prisma.PolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>[]
          }
          create: {
            args: Prisma.PolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          createMany: {
            args: Prisma.PolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>[]
          }
          delete: {
            args: Prisma.PolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          update: {
            args: Prisma.PolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          deleteMany: {
            args: Prisma.PolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PolicyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>[]
          }
          upsert: {
            args: Prisma.PolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          aggregate: {
            args: Prisma.PolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicy>
          }
          groupBy: {
            args: Prisma.PolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyCountAggregateOutputType> | number
          }
        }
      }
      UprSnapshot: {
        payload: Prisma.$UprSnapshotPayload<ExtArgs>
        fields: Prisma.UprSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UprSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UprSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          findFirst: {
            args: Prisma.UprSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UprSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          findMany: {
            args: Prisma.UprSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>[]
          }
          create: {
            args: Prisma.UprSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          createMany: {
            args: Prisma.UprSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UprSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>[]
          }
          delete: {
            args: Prisma.UprSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          update: {
            args: Prisma.UprSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.UprSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UprSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UprSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.UprSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UprSnapshotPayload>
          }
          aggregate: {
            args: Prisma.UprSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUprSnapshot>
          }
          groupBy: {
            args: Prisma.UprSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<UprSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.UprSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<UprSnapshotCountAggregateOutputType> | number
          }
        }
      }
      AdminExpenseAllocation: {
        payload: Prisma.$AdminExpenseAllocationPayload<ExtArgs>
        fields: Prisma.AdminExpenseAllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminExpenseAllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminExpenseAllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          findFirst: {
            args: Prisma.AdminExpenseAllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminExpenseAllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          findMany: {
            args: Prisma.AdminExpenseAllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>[]
          }
          create: {
            args: Prisma.AdminExpenseAllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          createMany: {
            args: Prisma.AdminExpenseAllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminExpenseAllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>[]
          }
          delete: {
            args: Prisma.AdminExpenseAllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          update: {
            args: Prisma.AdminExpenseAllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          deleteMany: {
            args: Prisma.AdminExpenseAllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminExpenseAllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminExpenseAllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>[]
          }
          upsert: {
            args: Prisma.AdminExpenseAllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpenseAllocationPayload>
          }
          aggregate: {
            args: Prisma.AdminExpenseAllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminExpenseAllocation>
          }
          groupBy: {
            args: Prisma.AdminExpenseAllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminExpenseAllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminExpenseAllocationCountArgs<ExtArgs>
            result: $Utils.Optional<AdminExpenseAllocationCountAggregateOutputType> | number
          }
        }
      }
      BranchParameters: {
        payload: Prisma.$BranchParametersPayload<ExtArgs>
        fields: Prisma.BranchParametersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchParametersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchParametersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          findFirst: {
            args: Prisma.BranchParametersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchParametersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          findMany: {
            args: Prisma.BranchParametersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>[]
          }
          create: {
            args: Prisma.BranchParametersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          createMany: {
            args: Prisma.BranchParametersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchParametersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>[]
          }
          delete: {
            args: Prisma.BranchParametersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          update: {
            args: Prisma.BranchParametersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          deleteMany: {
            args: Prisma.BranchParametersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchParametersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchParametersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>[]
          }
          upsert: {
            args: Prisma.BranchParametersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchParametersPayload>
          }
          aggregate: {
            args: Prisma.BranchParametersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranchParameters>
          }
          groupBy: {
            args: Prisma.BranchParametersGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchParametersGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchParametersCountArgs<ExtArgs>
            result: $Utils.Optional<BranchParametersCountAggregateOutputType> | number
          }
        }
      }
      PremiumActuals: {
        payload: Prisma.$PremiumActualsPayload<ExtArgs>
        fields: Prisma.PremiumActualsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremiumActualsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremiumActualsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          findFirst: {
            args: Prisma.PremiumActualsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremiumActualsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          findMany: {
            args: Prisma.PremiumActualsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>[]
          }
          create: {
            args: Prisma.PremiumActualsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          createMany: {
            args: Prisma.PremiumActualsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PremiumActualsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>[]
          }
          delete: {
            args: Prisma.PremiumActualsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          update: {
            args: Prisma.PremiumActualsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          deleteMany: {
            args: Prisma.PremiumActualsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremiumActualsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PremiumActualsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>[]
          }
          upsert: {
            args: Prisma.PremiumActualsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumActualsPayload>
          }
          aggregate: {
            args: Prisma.PremiumActualsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremiumActuals>
          }
          groupBy: {
            args: Prisma.PremiumActualsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremiumActualsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremiumActualsCountArgs<ExtArgs>
            result: $Utils.Optional<PremiumActualsCountAggregateOutputType> | number
          }
        }
      }
      ClaimsActuals: {
        payload: Prisma.$ClaimsActualsPayload<ExtArgs>
        fields: Prisma.ClaimsActualsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimsActualsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimsActualsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          findFirst: {
            args: Prisma.ClaimsActualsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimsActualsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          findMany: {
            args: Prisma.ClaimsActualsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>[]
          }
          create: {
            args: Prisma.ClaimsActualsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          createMany: {
            args: Prisma.ClaimsActualsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimsActualsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>[]
          }
          delete: {
            args: Prisma.ClaimsActualsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          update: {
            args: Prisma.ClaimsActualsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          deleteMany: {
            args: Prisma.ClaimsActualsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimsActualsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimsActualsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>[]
          }
          upsert: {
            args: Prisma.ClaimsActualsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimsActualsPayload>
          }
          aggregate: {
            args: Prisma.ClaimsActualsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimsActuals>
          }
          groupBy: {
            args: Prisma.ClaimsActualsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimsActualsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimsActualsCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimsActualsCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      AdminExpense: {
        payload: Prisma.$AdminExpensePayload<ExtArgs>
        fields: Prisma.AdminExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          findFirst: {
            args: Prisma.AdminExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          findMany: {
            args: Prisma.AdminExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>[]
          }
          create: {
            args: Prisma.AdminExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          createMany: {
            args: Prisma.AdminExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>[]
          }
          delete: {
            args: Prisma.AdminExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          update: {
            args: Prisma.AdminExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          deleteMany: {
            args: Prisma.AdminExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>[]
          }
          upsert: {
            args: Prisma.AdminExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminExpensePayload>
          }
          aggregate: {
            args: Prisma.AdminExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminExpense>
          }
          groupBy: {
            args: Prisma.AdminExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<AdminExpenseCountAggregateOutputType> | number
          }
        }
      }
      ActuarialEstimate: {
        payload: Prisma.$ActuarialEstimatePayload<ExtArgs>
        fields: Prisma.ActuarialEstimateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActuarialEstimateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActuarialEstimateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          findFirst: {
            args: Prisma.ActuarialEstimateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActuarialEstimateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          findMany: {
            args: Prisma.ActuarialEstimateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>[]
          }
          create: {
            args: Prisma.ActuarialEstimateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          createMany: {
            args: Prisma.ActuarialEstimateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActuarialEstimateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>[]
          }
          delete: {
            args: Prisma.ActuarialEstimateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          update: {
            args: Prisma.ActuarialEstimateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          deleteMany: {
            args: Prisma.ActuarialEstimateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActuarialEstimateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActuarialEstimateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>[]
          }
          upsert: {
            args: Prisma.ActuarialEstimateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActuarialEstimatePayload>
          }
          aggregate: {
            args: Prisma.ActuarialEstimateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActuarialEstimate>
          }
          groupBy: {
            args: Prisma.ActuarialEstimateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActuarialEstimateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActuarialEstimateCountArgs<ExtArgs>
            result: $Utils.Optional<ActuarialEstimateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    policy?: PolicyOmit
    uprSnapshot?: UprSnapshotOmit
    adminExpenseAllocation?: AdminExpenseAllocationOmit
    branchParameters?: BranchParametersOmit
    premiumActuals?: PremiumActualsOmit
    claimsActuals?: ClaimsActualsOmit
    branch?: BranchOmit
    adminExpense?: AdminExpenseOmit
    actuarialEstimate?: ActuarialEstimateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Policy
   */

  export type AggregatePolicy = {
    _count: PolicyCountAggregateOutputType | null
    _avg: PolicyAvgAggregateOutputType | null
    _sum: PolicySumAggregateOutputType | null
    _min: PolicyMinAggregateOutputType | null
    _max: PolicyMaxAggregateOutputType | null
  }

  export type PolicyAvgAggregateOutputType = {
    branchNumber: number | null
    premiumAmount: Decimal | null
  }

  export type PolicySumAggregateOutputType = {
    branchNumber: number | null
    premiumAmount: Decimal | null
  }

  export type PolicyMinAggregateOutputType = {
    id: string | null
    policyNumber: string | null
    branchNumber: number | null
    premiumAmount: Decimal | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type PolicyMaxAggregateOutputType = {
    id: string | null
    policyNumber: string | null
    branchNumber: number | null
    premiumAmount: Decimal | null
    startDate: Date | null
    endDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type PolicyCountAggregateOutputType = {
    id: number
    policyNumber: number
    branchNumber: number
    premiumAmount: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type PolicyAvgAggregateInputType = {
    branchNumber?: true
    premiumAmount?: true
  }

  export type PolicySumAggregateInputType = {
    branchNumber?: true
    premiumAmount?: true
  }

  export type PolicyMinAggregateInputType = {
    id?: true
    policyNumber?: true
    branchNumber?: true
    premiumAmount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
  }

  export type PolicyMaxAggregateInputType = {
    id?: true
    policyNumber?: true
    branchNumber?: true
    premiumAmount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
  }

  export type PolicyCountAggregateInputType = {
    id?: true
    policyNumber?: true
    branchNumber?: true
    premiumAmount?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type PolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policy to aggregate.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Policies
    **/
    _count?: true | PolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyMaxAggregateInputType
  }

  export type GetPolicyAggregateType<T extends PolicyAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicy[P]>
      : GetScalarType<T[P], AggregatePolicy[P]>
  }




  export type PolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyWhereInput
    orderBy?: PolicyOrderByWithAggregationInput | PolicyOrderByWithAggregationInput[]
    by: PolicyScalarFieldEnum[] | PolicyScalarFieldEnum
    having?: PolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyCountAggregateInputType | true
    _avg?: PolicyAvgAggregateInputType
    _sum?: PolicySumAggregateInputType
    _min?: PolicyMinAggregateInputType
    _max?: PolicyMaxAggregateInputType
  }

  export type PolicyGroupByOutputType = {
    id: string
    policyNumber: string
    branchNumber: number
    premiumAmount: Decimal
    startDate: Date
    endDate: Date
    status: string
    createdAt: Date
    _count: PolicyCountAggregateOutputType | null
    _avg: PolicyAvgAggregateOutputType | null
    _sum: PolicySumAggregateOutputType | null
    _min: PolicyMinAggregateOutputType | null
    _max: PolicyMaxAggregateOutputType | null
  }

  type GetPolicyGroupByPayload<T extends PolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyGroupByOutputType[P]>
        }
      >
    >


  export type PolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policyNumber?: boolean
    branchNumber?: boolean
    premiumAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["policy"]>

  export type PolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policyNumber?: boolean
    branchNumber?: boolean
    premiumAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["policy"]>

  export type PolicySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policyNumber?: boolean
    branchNumber?: boolean
    premiumAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["policy"]>

  export type PolicySelectScalar = {
    id?: boolean
    policyNumber?: boolean
    branchNumber?: boolean
    premiumAmount?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type PolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "policyNumber" | "branchNumber" | "premiumAmount" | "startDate" | "endDate" | "status" | "createdAt", ExtArgs["result"]["policy"]>

  export type $PolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Policy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      policyNumber: string
      branchNumber: number
      premiumAmount: Prisma.Decimal
      startDate: Date
      endDate: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["policy"]>
    composites: {}
  }

  type PolicyGetPayload<S extends boolean | null | undefined | PolicyDefaultArgs> = $Result.GetResult<Prisma.$PolicyPayload, S>

  type PolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PolicyCountAggregateInputType | true
    }

  export interface PolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Policy'], meta: { name: 'Policy' } }
    /**
     * Find zero or one Policy that matches the filter.
     * @param {PolicyFindUniqueArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyFindUniqueArgs>(args: SelectSubset<T, PolicyFindUniqueArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Policy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PolicyFindUniqueOrThrowArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindFirstArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyFindFirstArgs>(args?: SelectSubset<T, PolicyFindFirstArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindFirstOrThrowArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Policies
     * const policies = await prisma.policy.findMany()
     * 
     * // Get first 10 Policies
     * const policies = await prisma.policy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyWithIdOnly = await prisma.policy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyFindManyArgs>(args?: SelectSubset<T, PolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Policy.
     * @param {PolicyCreateArgs} args - Arguments to create a Policy.
     * @example
     * // Create one Policy
     * const Policy = await prisma.policy.create({
     *   data: {
     *     // ... data to create a Policy
     *   }
     * })
     * 
     */
    create<T extends PolicyCreateArgs>(args: SelectSubset<T, PolicyCreateArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Policies.
     * @param {PolicyCreateManyArgs} args - Arguments to create many Policies.
     * @example
     * // Create many Policies
     * const policy = await prisma.policy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyCreateManyArgs>(args?: SelectSubset<T, PolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Policies and returns the data saved in the database.
     * @param {PolicyCreateManyAndReturnArgs} args - Arguments to create many Policies.
     * @example
     * // Create many Policies
     * const policy = await prisma.policy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Policies and only return the `id`
     * const policyWithIdOnly = await prisma.policy.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, PolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Policy.
     * @param {PolicyDeleteArgs} args - Arguments to delete one Policy.
     * @example
     * // Delete one Policy
     * const Policy = await prisma.policy.delete({
     *   where: {
     *     // ... filter to delete one Policy
     *   }
     * })
     * 
     */
    delete<T extends PolicyDeleteArgs>(args: SelectSubset<T, PolicyDeleteArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Policy.
     * @param {PolicyUpdateArgs} args - Arguments to update one Policy.
     * @example
     * // Update one Policy
     * const policy = await prisma.policy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyUpdateArgs>(args: SelectSubset<T, PolicyUpdateArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Policies.
     * @param {PolicyDeleteManyArgs} args - Arguments to filter Policies to delete.
     * @example
     * // Delete a few Policies
     * const { count } = await prisma.policy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyDeleteManyArgs>(args?: SelectSubset<T, PolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Policies
     * const policy = await prisma.policy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyUpdateManyArgs>(args: SelectSubset<T, PolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Policies and returns the data updated in the database.
     * @param {PolicyUpdateManyAndReturnArgs} args - Arguments to update many Policies.
     * @example
     * // Update many Policies
     * const policy = await prisma.policy.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Policies and only return the `id`
     * const policyWithIdOnly = await prisma.policy.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PolicyUpdateManyAndReturnArgs>(args: SelectSubset<T, PolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Policy.
     * @param {PolicyUpsertArgs} args - Arguments to update or create a Policy.
     * @example
     * // Update or create a Policy
     * const policy = await prisma.policy.upsert({
     *   create: {
     *     // ... data to create a Policy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Policy we want to update
     *   }
     * })
     */
    upsert<T extends PolicyUpsertArgs>(args: SelectSubset<T, PolicyUpsertArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCountArgs} args - Arguments to filter Policies to count.
     * @example
     * // Count the number of Policies
     * const count = await prisma.policy.count({
     *   where: {
     *     // ... the filter for the Policies we want to count
     *   }
     * })
    **/
    count<T extends PolicyCountArgs>(
      args?: Subset<T, PolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PolicyAggregateArgs>(args: Subset<T, PolicyAggregateArgs>): Prisma.PrismaPromise<GetPolicyAggregateType<T>>

    /**
     * Group by Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyGroupByArgs['orderBy'] }
        : { orderBy?: PolicyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Policy model
   */
  readonly fields: PolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Policy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Policy model
   */
  interface PolicyFieldRefs {
    readonly id: FieldRef<"Policy", 'String'>
    readonly policyNumber: FieldRef<"Policy", 'String'>
    readonly branchNumber: FieldRef<"Policy", 'Int'>
    readonly premiumAmount: FieldRef<"Policy", 'Decimal'>
    readonly startDate: FieldRef<"Policy", 'DateTime'>
    readonly endDate: FieldRef<"Policy", 'DateTime'>
    readonly status: FieldRef<"Policy", 'String'>
    readonly createdAt: FieldRef<"Policy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Policy findUnique
   */
  export type PolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy findUniqueOrThrow
   */
  export type PolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy findFirst
   */
  export type PolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy findFirstOrThrow
   */
  export type PolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy findMany
   */
  export type PolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy create
   */
  export type PolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * The data needed to create a Policy.
     */
    data: XOR<PolicyCreateInput, PolicyUncheckedCreateInput>
  }

  /**
   * Policy createMany
   */
  export type PolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Policies.
     */
    data: PolicyCreateManyInput | PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Policy createManyAndReturn
   */
  export type PolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * The data used to create many Policies.
     */
    data: PolicyCreateManyInput | PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Policy update
   */
  export type PolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * The data needed to update a Policy.
     */
    data: XOR<PolicyUpdateInput, PolicyUncheckedUpdateInput>
    /**
     * Choose, which Policy to update.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy updateMany
   */
  export type PolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Policies.
     */
    data: XOR<PolicyUpdateManyMutationInput, PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Policies to update
     */
    where?: PolicyWhereInput
    /**
     * Limit how many Policies to update.
     */
    limit?: number
  }

  /**
   * Policy updateManyAndReturn
   */
  export type PolicyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * The data used to update Policies.
     */
    data: XOR<PolicyUpdateManyMutationInput, PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Policies to update
     */
    where?: PolicyWhereInput
    /**
     * Limit how many Policies to update.
     */
    limit?: number
  }

  /**
   * Policy upsert
   */
  export type PolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * The filter to search for the Policy to update in case it exists.
     */
    where: PolicyWhereUniqueInput
    /**
     * In case the Policy found by the `where` argument doesn't exist, create a new Policy with this data.
     */
    create: XOR<PolicyCreateInput, PolicyUncheckedCreateInput>
    /**
     * In case the Policy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyUpdateInput, PolicyUncheckedUpdateInput>
  }

  /**
   * Policy delete
   */
  export type PolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Filter which Policy to delete.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy deleteMany
   */
  export type PolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policies to delete
     */
    where?: PolicyWhereInput
    /**
     * Limit how many Policies to delete.
     */
    limit?: number
  }

  /**
   * Policy without action
   */
  export type PolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
  }


  /**
   * Model UprSnapshot
   */

  export type AggregateUprSnapshot = {
    _count: UprSnapshotCountAggregateOutputType | null
    _avg: UprSnapshotAvgAggregateOutputType | null
    _sum: UprSnapshotSumAggregateOutputType | null
    _min: UprSnapshotMinAggregateOutputType | null
    _max: UprSnapshotMaxAggregateOutputType | null
  }

  export type UprSnapshotAvgAggregateOutputType = {
    year: number | null
    period: number | null
    branchNumber: number | null
    originalPremium: Decimal | null
    uprValue: Decimal | null
    dacGross: Decimal | null
    deferredRIComm: Decimal | null
    ducNet: Decimal | null
  }

  export type UprSnapshotSumAggregateOutputType = {
    year: number | null
    period: number | null
    branchNumber: number | null
    originalPremium: Decimal | null
    uprValue: Decimal | null
    dacGross: Decimal | null
    deferredRIComm: Decimal | null
    ducNet: Decimal | null
  }

  export type UprSnapshotMinAggregateOutputType = {
    id: string | null
    year: number | null
    period: number | null
    periodType: string | null
    branchNumber: number | null
    originalPremium: Decimal | null
    uprValue: Decimal | null
    dacGross: Decimal | null
    deferredRIComm: Decimal | null
    ducNet: Decimal | null
    calculatedAt: Date | null
  }

  export type UprSnapshotMaxAggregateOutputType = {
    id: string | null
    year: number | null
    period: number | null
    periodType: string | null
    branchNumber: number | null
    originalPremium: Decimal | null
    uprValue: Decimal | null
    dacGross: Decimal | null
    deferredRIComm: Decimal | null
    ducNet: Decimal | null
    calculatedAt: Date | null
  }

  export type UprSnapshotCountAggregateOutputType = {
    id: number
    year: number
    period: number
    periodType: number
    branchNumber: number
    originalPremium: number
    uprValue: number
    dacGross: number
    deferredRIComm: number
    ducNet: number
    calculatedAt: number
    _all: number
  }


  export type UprSnapshotAvgAggregateInputType = {
    year?: true
    period?: true
    branchNumber?: true
    originalPremium?: true
    uprValue?: true
    dacGross?: true
    deferredRIComm?: true
    ducNet?: true
  }

  export type UprSnapshotSumAggregateInputType = {
    year?: true
    period?: true
    branchNumber?: true
    originalPremium?: true
    uprValue?: true
    dacGross?: true
    deferredRIComm?: true
    ducNet?: true
  }

  export type UprSnapshotMinAggregateInputType = {
    id?: true
    year?: true
    period?: true
    periodType?: true
    branchNumber?: true
    originalPremium?: true
    uprValue?: true
    dacGross?: true
    deferredRIComm?: true
    ducNet?: true
    calculatedAt?: true
  }

  export type UprSnapshotMaxAggregateInputType = {
    id?: true
    year?: true
    period?: true
    periodType?: true
    branchNumber?: true
    originalPremium?: true
    uprValue?: true
    dacGross?: true
    deferredRIComm?: true
    ducNet?: true
    calculatedAt?: true
  }

  export type UprSnapshotCountAggregateInputType = {
    id?: true
    year?: true
    period?: true
    periodType?: true
    branchNumber?: true
    originalPremium?: true
    uprValue?: true
    dacGross?: true
    deferredRIComm?: true
    ducNet?: true
    calculatedAt?: true
    _all?: true
  }

  export type UprSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UprSnapshot to aggregate.
     */
    where?: UprSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UprSnapshots to fetch.
     */
    orderBy?: UprSnapshotOrderByWithRelationInput | UprSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UprSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UprSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UprSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UprSnapshots
    **/
    _count?: true | UprSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UprSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UprSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UprSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UprSnapshotMaxAggregateInputType
  }

  export type GetUprSnapshotAggregateType<T extends UprSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateUprSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUprSnapshot[P]>
      : GetScalarType<T[P], AggregateUprSnapshot[P]>
  }




  export type UprSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UprSnapshotWhereInput
    orderBy?: UprSnapshotOrderByWithAggregationInput | UprSnapshotOrderByWithAggregationInput[]
    by: UprSnapshotScalarFieldEnum[] | UprSnapshotScalarFieldEnum
    having?: UprSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UprSnapshotCountAggregateInputType | true
    _avg?: UprSnapshotAvgAggregateInputType
    _sum?: UprSnapshotSumAggregateInputType
    _min?: UprSnapshotMinAggregateInputType
    _max?: UprSnapshotMaxAggregateInputType
  }

  export type UprSnapshotGroupByOutputType = {
    id: string
    year: number
    period: number
    periodType: string
    branchNumber: number
    originalPremium: Decimal
    uprValue: Decimal
    dacGross: Decimal
    deferredRIComm: Decimal
    ducNet: Decimal
    calculatedAt: Date
    _count: UprSnapshotCountAggregateOutputType | null
    _avg: UprSnapshotAvgAggregateOutputType | null
    _sum: UprSnapshotSumAggregateOutputType | null
    _min: UprSnapshotMinAggregateOutputType | null
    _max: UprSnapshotMaxAggregateOutputType | null
  }

  type GetUprSnapshotGroupByPayload<T extends UprSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UprSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UprSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UprSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], UprSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type UprSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    period?: boolean
    periodType?: boolean
    branchNumber?: boolean
    originalPremium?: boolean
    uprValue?: boolean
    dacGross?: boolean
    deferredRIComm?: boolean
    ducNet?: boolean
    calculatedAt?: boolean
  }, ExtArgs["result"]["uprSnapshot"]>

  export type UprSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    period?: boolean
    periodType?: boolean
    branchNumber?: boolean
    originalPremium?: boolean
    uprValue?: boolean
    dacGross?: boolean
    deferredRIComm?: boolean
    ducNet?: boolean
    calculatedAt?: boolean
  }, ExtArgs["result"]["uprSnapshot"]>

  export type UprSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    period?: boolean
    periodType?: boolean
    branchNumber?: boolean
    originalPremium?: boolean
    uprValue?: boolean
    dacGross?: boolean
    deferredRIComm?: boolean
    ducNet?: boolean
    calculatedAt?: boolean
  }, ExtArgs["result"]["uprSnapshot"]>

  export type UprSnapshotSelectScalar = {
    id?: boolean
    year?: boolean
    period?: boolean
    periodType?: boolean
    branchNumber?: boolean
    originalPremium?: boolean
    uprValue?: boolean
    dacGross?: boolean
    deferredRIComm?: boolean
    ducNet?: boolean
    calculatedAt?: boolean
  }

  export type UprSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "period" | "periodType" | "branchNumber" | "originalPremium" | "uprValue" | "dacGross" | "deferredRIComm" | "ducNet" | "calculatedAt", ExtArgs["result"]["uprSnapshot"]>

  export type $UprSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UprSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      period: number
      periodType: string
      branchNumber: number
      originalPremium: Prisma.Decimal
      uprValue: Prisma.Decimal
      dacGross: Prisma.Decimal
      deferredRIComm: Prisma.Decimal
      ducNet: Prisma.Decimal
      calculatedAt: Date
    }, ExtArgs["result"]["uprSnapshot"]>
    composites: {}
  }

  type UprSnapshotGetPayload<S extends boolean | null | undefined | UprSnapshotDefaultArgs> = $Result.GetResult<Prisma.$UprSnapshotPayload, S>

  type UprSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UprSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UprSnapshotCountAggregateInputType | true
    }

  export interface UprSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UprSnapshot'], meta: { name: 'UprSnapshot' } }
    /**
     * Find zero or one UprSnapshot that matches the filter.
     * @param {UprSnapshotFindUniqueArgs} args - Arguments to find a UprSnapshot
     * @example
     * // Get one UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UprSnapshotFindUniqueArgs>(args: SelectSubset<T, UprSnapshotFindUniqueArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UprSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UprSnapshotFindUniqueOrThrowArgs} args - Arguments to find a UprSnapshot
     * @example
     * // Get one UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UprSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, UprSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UprSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotFindFirstArgs} args - Arguments to find a UprSnapshot
     * @example
     * // Get one UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UprSnapshotFindFirstArgs>(args?: SelectSubset<T, UprSnapshotFindFirstArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UprSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotFindFirstOrThrowArgs} args - Arguments to find a UprSnapshot
     * @example
     * // Get one UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UprSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, UprSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UprSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UprSnapshots
     * const uprSnapshots = await prisma.uprSnapshot.findMany()
     * 
     * // Get first 10 UprSnapshots
     * const uprSnapshots = await prisma.uprSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uprSnapshotWithIdOnly = await prisma.uprSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UprSnapshotFindManyArgs>(args?: SelectSubset<T, UprSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UprSnapshot.
     * @param {UprSnapshotCreateArgs} args - Arguments to create a UprSnapshot.
     * @example
     * // Create one UprSnapshot
     * const UprSnapshot = await prisma.uprSnapshot.create({
     *   data: {
     *     // ... data to create a UprSnapshot
     *   }
     * })
     * 
     */
    create<T extends UprSnapshotCreateArgs>(args: SelectSubset<T, UprSnapshotCreateArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UprSnapshots.
     * @param {UprSnapshotCreateManyArgs} args - Arguments to create many UprSnapshots.
     * @example
     * // Create many UprSnapshots
     * const uprSnapshot = await prisma.uprSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UprSnapshotCreateManyArgs>(args?: SelectSubset<T, UprSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UprSnapshots and returns the data saved in the database.
     * @param {UprSnapshotCreateManyAndReturnArgs} args - Arguments to create many UprSnapshots.
     * @example
     * // Create many UprSnapshots
     * const uprSnapshot = await prisma.uprSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UprSnapshots and only return the `id`
     * const uprSnapshotWithIdOnly = await prisma.uprSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UprSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, UprSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UprSnapshot.
     * @param {UprSnapshotDeleteArgs} args - Arguments to delete one UprSnapshot.
     * @example
     * // Delete one UprSnapshot
     * const UprSnapshot = await prisma.uprSnapshot.delete({
     *   where: {
     *     // ... filter to delete one UprSnapshot
     *   }
     * })
     * 
     */
    delete<T extends UprSnapshotDeleteArgs>(args: SelectSubset<T, UprSnapshotDeleteArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UprSnapshot.
     * @param {UprSnapshotUpdateArgs} args - Arguments to update one UprSnapshot.
     * @example
     * // Update one UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UprSnapshotUpdateArgs>(args: SelectSubset<T, UprSnapshotUpdateArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UprSnapshots.
     * @param {UprSnapshotDeleteManyArgs} args - Arguments to filter UprSnapshots to delete.
     * @example
     * // Delete a few UprSnapshots
     * const { count } = await prisma.uprSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UprSnapshotDeleteManyArgs>(args?: SelectSubset<T, UprSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UprSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UprSnapshots
     * const uprSnapshot = await prisma.uprSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UprSnapshotUpdateManyArgs>(args: SelectSubset<T, UprSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UprSnapshots and returns the data updated in the database.
     * @param {UprSnapshotUpdateManyAndReturnArgs} args - Arguments to update many UprSnapshots.
     * @example
     * // Update many UprSnapshots
     * const uprSnapshot = await prisma.uprSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UprSnapshots and only return the `id`
     * const uprSnapshotWithIdOnly = await prisma.uprSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UprSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, UprSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UprSnapshot.
     * @param {UprSnapshotUpsertArgs} args - Arguments to update or create a UprSnapshot.
     * @example
     * // Update or create a UprSnapshot
     * const uprSnapshot = await prisma.uprSnapshot.upsert({
     *   create: {
     *     // ... data to create a UprSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UprSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends UprSnapshotUpsertArgs>(args: SelectSubset<T, UprSnapshotUpsertArgs<ExtArgs>>): Prisma__UprSnapshotClient<$Result.GetResult<Prisma.$UprSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UprSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotCountArgs} args - Arguments to filter UprSnapshots to count.
     * @example
     * // Count the number of UprSnapshots
     * const count = await prisma.uprSnapshot.count({
     *   where: {
     *     // ... the filter for the UprSnapshots we want to count
     *   }
     * })
    **/
    count<T extends UprSnapshotCountArgs>(
      args?: Subset<T, UprSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UprSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UprSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UprSnapshotAggregateArgs>(args: Subset<T, UprSnapshotAggregateArgs>): Prisma.PrismaPromise<GetUprSnapshotAggregateType<T>>

    /**
     * Group by UprSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UprSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UprSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UprSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: UprSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UprSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUprSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UprSnapshot model
   */
  readonly fields: UprSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UprSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UprSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UprSnapshot model
   */
  interface UprSnapshotFieldRefs {
    readonly id: FieldRef<"UprSnapshot", 'String'>
    readonly year: FieldRef<"UprSnapshot", 'Int'>
    readonly period: FieldRef<"UprSnapshot", 'Int'>
    readonly periodType: FieldRef<"UprSnapshot", 'String'>
    readonly branchNumber: FieldRef<"UprSnapshot", 'Int'>
    readonly originalPremium: FieldRef<"UprSnapshot", 'Decimal'>
    readonly uprValue: FieldRef<"UprSnapshot", 'Decimal'>
    readonly dacGross: FieldRef<"UprSnapshot", 'Decimal'>
    readonly deferredRIComm: FieldRef<"UprSnapshot", 'Decimal'>
    readonly ducNet: FieldRef<"UprSnapshot", 'Decimal'>
    readonly calculatedAt: FieldRef<"UprSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UprSnapshot findUnique
   */
  export type UprSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which UprSnapshot to fetch.
     */
    where: UprSnapshotWhereUniqueInput
  }

  /**
   * UprSnapshot findUniqueOrThrow
   */
  export type UprSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which UprSnapshot to fetch.
     */
    where: UprSnapshotWhereUniqueInput
  }

  /**
   * UprSnapshot findFirst
   */
  export type UprSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which UprSnapshot to fetch.
     */
    where?: UprSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UprSnapshots to fetch.
     */
    orderBy?: UprSnapshotOrderByWithRelationInput | UprSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UprSnapshots.
     */
    cursor?: UprSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UprSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UprSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UprSnapshots.
     */
    distinct?: UprSnapshotScalarFieldEnum | UprSnapshotScalarFieldEnum[]
  }

  /**
   * UprSnapshot findFirstOrThrow
   */
  export type UprSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which UprSnapshot to fetch.
     */
    where?: UprSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UprSnapshots to fetch.
     */
    orderBy?: UprSnapshotOrderByWithRelationInput | UprSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UprSnapshots.
     */
    cursor?: UprSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UprSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UprSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UprSnapshots.
     */
    distinct?: UprSnapshotScalarFieldEnum | UprSnapshotScalarFieldEnum[]
  }

  /**
   * UprSnapshot findMany
   */
  export type UprSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which UprSnapshots to fetch.
     */
    where?: UprSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UprSnapshots to fetch.
     */
    orderBy?: UprSnapshotOrderByWithRelationInput | UprSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UprSnapshots.
     */
    cursor?: UprSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UprSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UprSnapshots.
     */
    skip?: number
    distinct?: UprSnapshotScalarFieldEnum | UprSnapshotScalarFieldEnum[]
  }

  /**
   * UprSnapshot create
   */
  export type UprSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a UprSnapshot.
     */
    data: XOR<UprSnapshotCreateInput, UprSnapshotUncheckedCreateInput>
  }

  /**
   * UprSnapshot createMany
   */
  export type UprSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UprSnapshots.
     */
    data: UprSnapshotCreateManyInput | UprSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UprSnapshot createManyAndReturn
   */
  export type UprSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many UprSnapshots.
     */
    data: UprSnapshotCreateManyInput | UprSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UprSnapshot update
   */
  export type UprSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a UprSnapshot.
     */
    data: XOR<UprSnapshotUpdateInput, UprSnapshotUncheckedUpdateInput>
    /**
     * Choose, which UprSnapshot to update.
     */
    where: UprSnapshotWhereUniqueInput
  }

  /**
   * UprSnapshot updateMany
   */
  export type UprSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UprSnapshots.
     */
    data: XOR<UprSnapshotUpdateManyMutationInput, UprSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which UprSnapshots to update
     */
    where?: UprSnapshotWhereInput
    /**
     * Limit how many UprSnapshots to update.
     */
    limit?: number
  }

  /**
   * UprSnapshot updateManyAndReturn
   */
  export type UprSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update UprSnapshots.
     */
    data: XOR<UprSnapshotUpdateManyMutationInput, UprSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which UprSnapshots to update
     */
    where?: UprSnapshotWhereInput
    /**
     * Limit how many UprSnapshots to update.
     */
    limit?: number
  }

  /**
   * UprSnapshot upsert
   */
  export type UprSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the UprSnapshot to update in case it exists.
     */
    where: UprSnapshotWhereUniqueInput
    /**
     * In case the UprSnapshot found by the `where` argument doesn't exist, create a new UprSnapshot with this data.
     */
    create: XOR<UprSnapshotCreateInput, UprSnapshotUncheckedCreateInput>
    /**
     * In case the UprSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UprSnapshotUpdateInput, UprSnapshotUncheckedUpdateInput>
  }

  /**
   * UprSnapshot delete
   */
  export type UprSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
    /**
     * Filter which UprSnapshot to delete.
     */
    where: UprSnapshotWhereUniqueInput
  }

  /**
   * UprSnapshot deleteMany
   */
  export type UprSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UprSnapshots to delete
     */
    where?: UprSnapshotWhereInput
    /**
     * Limit how many UprSnapshots to delete.
     */
    limit?: number
  }

  /**
   * UprSnapshot without action
   */
  export type UprSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UprSnapshot
     */
    select?: UprSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UprSnapshot
     */
    omit?: UprSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model AdminExpenseAllocation
   */

  export type AggregateAdminExpenseAllocation = {
    _count: AdminExpenseAllocationCountAggregateOutputType | null
    _avg: AdminExpenseAllocationAvgAggregateOutputType | null
    _sum: AdminExpenseAllocationSumAggregateOutputType | null
    _min: AdminExpenseAllocationMinAggregateOutputType | null
    _max: AdminExpenseAllocationMaxAggregateOutputType | null
  }

  export type AdminExpenseAllocationAvgAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    premiumExpenseShare: number | null
    claimsExpenseShare: number | null
    totalExpenseShare: number | null
    recognizedExpense: number | null
    deferredExpense: number | null
  }

  export type AdminExpenseAllocationSumAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    premiumExpenseShare: number | null
    claimsExpenseShare: number | null
    totalExpenseShare: number | null
    recognizedExpense: number | null
    deferredExpense: number | null
  }

  export type AdminExpenseAllocationMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    premiumExpenseShare: number | null
    claimsExpenseShare: number | null
    totalExpenseShare: number | null
    recognizedExpense: number | null
    deferredExpense: number | null
    updatedAt: Date | null
  }

  export type AdminExpenseAllocationMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    premiumExpenseShare: number | null
    claimsExpenseShare: number | null
    totalExpenseShare: number | null
    recognizedExpense: number | null
    deferredExpense: number | null
    updatedAt: Date | null
  }

  export type AdminExpenseAllocationCountAggregateOutputType = {
    id: number
    year: number
    month: number
    branchNumber: number
    premiumExpenseShare: number
    claimsExpenseShare: number
    totalExpenseShare: number
    recognizedExpense: number
    deferredExpense: number
    updatedAt: number
    _all: number
  }


  export type AdminExpenseAllocationAvgAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    premiumExpenseShare?: true
    claimsExpenseShare?: true
    totalExpenseShare?: true
    recognizedExpense?: true
    deferredExpense?: true
  }

  export type AdminExpenseAllocationSumAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    premiumExpenseShare?: true
    claimsExpenseShare?: true
    totalExpenseShare?: true
    recognizedExpense?: true
    deferredExpense?: true
  }

  export type AdminExpenseAllocationMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    premiumExpenseShare?: true
    claimsExpenseShare?: true
    totalExpenseShare?: true
    recognizedExpense?: true
    deferredExpense?: true
    updatedAt?: true
  }

  export type AdminExpenseAllocationMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    premiumExpenseShare?: true
    claimsExpenseShare?: true
    totalExpenseShare?: true
    recognizedExpense?: true
    deferredExpense?: true
    updatedAt?: true
  }

  export type AdminExpenseAllocationCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    premiumExpenseShare?: true
    claimsExpenseShare?: true
    totalExpenseShare?: true
    recognizedExpense?: true
    deferredExpense?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminExpenseAllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminExpenseAllocation to aggregate.
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenseAllocations to fetch.
     */
    orderBy?: AdminExpenseAllocationOrderByWithRelationInput | AdminExpenseAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminExpenseAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenseAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenseAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminExpenseAllocations
    **/
    _count?: true | AdminExpenseAllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminExpenseAllocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminExpenseAllocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminExpenseAllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminExpenseAllocationMaxAggregateInputType
  }

  export type GetAdminExpenseAllocationAggregateType<T extends AdminExpenseAllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminExpenseAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminExpenseAllocation[P]>
      : GetScalarType<T[P], AggregateAdminExpenseAllocation[P]>
  }




  export type AdminExpenseAllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminExpenseAllocationWhereInput
    orderBy?: AdminExpenseAllocationOrderByWithAggregationInput | AdminExpenseAllocationOrderByWithAggregationInput[]
    by: AdminExpenseAllocationScalarFieldEnum[] | AdminExpenseAllocationScalarFieldEnum
    having?: AdminExpenseAllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminExpenseAllocationCountAggregateInputType | true
    _avg?: AdminExpenseAllocationAvgAggregateInputType
    _sum?: AdminExpenseAllocationSumAggregateInputType
    _min?: AdminExpenseAllocationMinAggregateInputType
    _max?: AdminExpenseAllocationMaxAggregateInputType
  }

  export type AdminExpenseAllocationGroupByOutputType = {
    id: string
    year: number
    month: number
    branchNumber: number
    premiumExpenseShare: number
    claimsExpenseShare: number
    totalExpenseShare: number
    recognizedExpense: number
    deferredExpense: number
    updatedAt: Date
    _count: AdminExpenseAllocationCountAggregateOutputType | null
    _avg: AdminExpenseAllocationAvgAggregateOutputType | null
    _sum: AdminExpenseAllocationSumAggregateOutputType | null
    _min: AdminExpenseAllocationMinAggregateOutputType | null
    _max: AdminExpenseAllocationMaxAggregateOutputType | null
  }

  type GetAdminExpenseAllocationGroupByPayload<T extends AdminExpenseAllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminExpenseAllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminExpenseAllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminExpenseAllocationGroupByOutputType[P]>
            : GetScalarType<T[P], AdminExpenseAllocationGroupByOutputType[P]>
        }
      >
    >


  export type AdminExpenseAllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    premiumExpenseShare?: boolean
    claimsExpenseShare?: boolean
    totalExpenseShare?: boolean
    recognizedExpense?: boolean
    deferredExpense?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpenseAllocation"]>

  export type AdminExpenseAllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    premiumExpenseShare?: boolean
    claimsExpenseShare?: boolean
    totalExpenseShare?: boolean
    recognizedExpense?: boolean
    deferredExpense?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpenseAllocation"]>

  export type AdminExpenseAllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    premiumExpenseShare?: boolean
    claimsExpenseShare?: boolean
    totalExpenseShare?: boolean
    recognizedExpense?: boolean
    deferredExpense?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpenseAllocation"]>

  export type AdminExpenseAllocationSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    premiumExpenseShare?: boolean
    claimsExpenseShare?: boolean
    totalExpenseShare?: boolean
    recognizedExpense?: boolean
    deferredExpense?: boolean
    updatedAt?: boolean
  }

  export type AdminExpenseAllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "branchNumber" | "premiumExpenseShare" | "claimsExpenseShare" | "totalExpenseShare" | "recognizedExpense" | "deferredExpense" | "updatedAt", ExtArgs["result"]["adminExpenseAllocation"]>

  export type $AdminExpenseAllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminExpenseAllocation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      branchNumber: number
      premiumExpenseShare: number
      claimsExpenseShare: number
      totalExpenseShare: number
      recognizedExpense: number
      deferredExpense: number
      updatedAt: Date
    }, ExtArgs["result"]["adminExpenseAllocation"]>
    composites: {}
  }

  type AdminExpenseAllocationGetPayload<S extends boolean | null | undefined | AdminExpenseAllocationDefaultArgs> = $Result.GetResult<Prisma.$AdminExpenseAllocationPayload, S>

  type AdminExpenseAllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminExpenseAllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminExpenseAllocationCountAggregateInputType | true
    }

  export interface AdminExpenseAllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminExpenseAllocation'], meta: { name: 'AdminExpenseAllocation' } }
    /**
     * Find zero or one AdminExpenseAllocation that matches the filter.
     * @param {AdminExpenseAllocationFindUniqueArgs} args - Arguments to find a AdminExpenseAllocation
     * @example
     * // Get one AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminExpenseAllocationFindUniqueArgs>(args: SelectSubset<T, AdminExpenseAllocationFindUniqueArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminExpenseAllocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminExpenseAllocationFindUniqueOrThrowArgs} args - Arguments to find a AdminExpenseAllocation
     * @example
     * // Get one AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminExpenseAllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminExpenseAllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminExpenseAllocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationFindFirstArgs} args - Arguments to find a AdminExpenseAllocation
     * @example
     * // Get one AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminExpenseAllocationFindFirstArgs>(args?: SelectSubset<T, AdminExpenseAllocationFindFirstArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminExpenseAllocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationFindFirstOrThrowArgs} args - Arguments to find a AdminExpenseAllocation
     * @example
     * // Get one AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminExpenseAllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminExpenseAllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminExpenseAllocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminExpenseAllocations
     * const adminExpenseAllocations = await prisma.adminExpenseAllocation.findMany()
     * 
     * // Get first 10 AdminExpenseAllocations
     * const adminExpenseAllocations = await prisma.adminExpenseAllocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminExpenseAllocationWithIdOnly = await prisma.adminExpenseAllocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminExpenseAllocationFindManyArgs>(args?: SelectSubset<T, AdminExpenseAllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminExpenseAllocation.
     * @param {AdminExpenseAllocationCreateArgs} args - Arguments to create a AdminExpenseAllocation.
     * @example
     * // Create one AdminExpenseAllocation
     * const AdminExpenseAllocation = await prisma.adminExpenseAllocation.create({
     *   data: {
     *     // ... data to create a AdminExpenseAllocation
     *   }
     * })
     * 
     */
    create<T extends AdminExpenseAllocationCreateArgs>(args: SelectSubset<T, AdminExpenseAllocationCreateArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminExpenseAllocations.
     * @param {AdminExpenseAllocationCreateManyArgs} args - Arguments to create many AdminExpenseAllocations.
     * @example
     * // Create many AdminExpenseAllocations
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminExpenseAllocationCreateManyArgs>(args?: SelectSubset<T, AdminExpenseAllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminExpenseAllocations and returns the data saved in the database.
     * @param {AdminExpenseAllocationCreateManyAndReturnArgs} args - Arguments to create many AdminExpenseAllocations.
     * @example
     * // Create many AdminExpenseAllocations
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminExpenseAllocations and only return the `id`
     * const adminExpenseAllocationWithIdOnly = await prisma.adminExpenseAllocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminExpenseAllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminExpenseAllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminExpenseAllocation.
     * @param {AdminExpenseAllocationDeleteArgs} args - Arguments to delete one AdminExpenseAllocation.
     * @example
     * // Delete one AdminExpenseAllocation
     * const AdminExpenseAllocation = await prisma.adminExpenseAllocation.delete({
     *   where: {
     *     // ... filter to delete one AdminExpenseAllocation
     *   }
     * })
     * 
     */
    delete<T extends AdminExpenseAllocationDeleteArgs>(args: SelectSubset<T, AdminExpenseAllocationDeleteArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminExpenseAllocation.
     * @param {AdminExpenseAllocationUpdateArgs} args - Arguments to update one AdminExpenseAllocation.
     * @example
     * // Update one AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminExpenseAllocationUpdateArgs>(args: SelectSubset<T, AdminExpenseAllocationUpdateArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminExpenseAllocations.
     * @param {AdminExpenseAllocationDeleteManyArgs} args - Arguments to filter AdminExpenseAllocations to delete.
     * @example
     * // Delete a few AdminExpenseAllocations
     * const { count } = await prisma.adminExpenseAllocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminExpenseAllocationDeleteManyArgs>(args?: SelectSubset<T, AdminExpenseAllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminExpenseAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminExpenseAllocations
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminExpenseAllocationUpdateManyArgs>(args: SelectSubset<T, AdminExpenseAllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminExpenseAllocations and returns the data updated in the database.
     * @param {AdminExpenseAllocationUpdateManyAndReturnArgs} args - Arguments to update many AdminExpenseAllocations.
     * @example
     * // Update many AdminExpenseAllocations
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminExpenseAllocations and only return the `id`
     * const adminExpenseAllocationWithIdOnly = await prisma.adminExpenseAllocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminExpenseAllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminExpenseAllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminExpenseAllocation.
     * @param {AdminExpenseAllocationUpsertArgs} args - Arguments to update or create a AdminExpenseAllocation.
     * @example
     * // Update or create a AdminExpenseAllocation
     * const adminExpenseAllocation = await prisma.adminExpenseAllocation.upsert({
     *   create: {
     *     // ... data to create a AdminExpenseAllocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminExpenseAllocation we want to update
     *   }
     * })
     */
    upsert<T extends AdminExpenseAllocationUpsertArgs>(args: SelectSubset<T, AdminExpenseAllocationUpsertArgs<ExtArgs>>): Prisma__AdminExpenseAllocationClient<$Result.GetResult<Prisma.$AdminExpenseAllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminExpenseAllocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationCountArgs} args - Arguments to filter AdminExpenseAllocations to count.
     * @example
     * // Count the number of AdminExpenseAllocations
     * const count = await prisma.adminExpenseAllocation.count({
     *   where: {
     *     // ... the filter for the AdminExpenseAllocations we want to count
     *   }
     * })
    **/
    count<T extends AdminExpenseAllocationCountArgs>(
      args?: Subset<T, AdminExpenseAllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminExpenseAllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminExpenseAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminExpenseAllocationAggregateArgs>(args: Subset<T, AdminExpenseAllocationAggregateArgs>): Prisma.PrismaPromise<GetAdminExpenseAllocationAggregateType<T>>

    /**
     * Group by AdminExpenseAllocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminExpenseAllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminExpenseAllocationGroupByArgs['orderBy'] }
        : { orderBy?: AdminExpenseAllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminExpenseAllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminExpenseAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminExpenseAllocation model
   */
  readonly fields: AdminExpenseAllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminExpenseAllocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminExpenseAllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminExpenseAllocation model
   */
  interface AdminExpenseAllocationFieldRefs {
    readonly id: FieldRef<"AdminExpenseAllocation", 'String'>
    readonly year: FieldRef<"AdminExpenseAllocation", 'Int'>
    readonly month: FieldRef<"AdminExpenseAllocation", 'Int'>
    readonly branchNumber: FieldRef<"AdminExpenseAllocation", 'Int'>
    readonly premiumExpenseShare: FieldRef<"AdminExpenseAllocation", 'Float'>
    readonly claimsExpenseShare: FieldRef<"AdminExpenseAllocation", 'Float'>
    readonly totalExpenseShare: FieldRef<"AdminExpenseAllocation", 'Float'>
    readonly recognizedExpense: FieldRef<"AdminExpenseAllocation", 'Float'>
    readonly deferredExpense: FieldRef<"AdminExpenseAllocation", 'Float'>
    readonly updatedAt: FieldRef<"AdminExpenseAllocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminExpenseAllocation findUnique
   */
  export type AdminExpenseAllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenseAllocation to fetch.
     */
    where: AdminExpenseAllocationWhereUniqueInput
  }

  /**
   * AdminExpenseAllocation findUniqueOrThrow
   */
  export type AdminExpenseAllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenseAllocation to fetch.
     */
    where: AdminExpenseAllocationWhereUniqueInput
  }

  /**
   * AdminExpenseAllocation findFirst
   */
  export type AdminExpenseAllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenseAllocation to fetch.
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenseAllocations to fetch.
     */
    orderBy?: AdminExpenseAllocationOrderByWithRelationInput | AdminExpenseAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminExpenseAllocations.
     */
    cursor?: AdminExpenseAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenseAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenseAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminExpenseAllocations.
     */
    distinct?: AdminExpenseAllocationScalarFieldEnum | AdminExpenseAllocationScalarFieldEnum[]
  }

  /**
   * AdminExpenseAllocation findFirstOrThrow
   */
  export type AdminExpenseAllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenseAllocation to fetch.
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenseAllocations to fetch.
     */
    orderBy?: AdminExpenseAllocationOrderByWithRelationInput | AdminExpenseAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminExpenseAllocations.
     */
    cursor?: AdminExpenseAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenseAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenseAllocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminExpenseAllocations.
     */
    distinct?: AdminExpenseAllocationScalarFieldEnum | AdminExpenseAllocationScalarFieldEnum[]
  }

  /**
   * AdminExpenseAllocation findMany
   */
  export type AdminExpenseAllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenseAllocations to fetch.
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenseAllocations to fetch.
     */
    orderBy?: AdminExpenseAllocationOrderByWithRelationInput | AdminExpenseAllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminExpenseAllocations.
     */
    cursor?: AdminExpenseAllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenseAllocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenseAllocations.
     */
    skip?: number
    distinct?: AdminExpenseAllocationScalarFieldEnum | AdminExpenseAllocationScalarFieldEnum[]
  }

  /**
   * AdminExpenseAllocation create
   */
  export type AdminExpenseAllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminExpenseAllocation.
     */
    data: XOR<AdminExpenseAllocationCreateInput, AdminExpenseAllocationUncheckedCreateInput>
  }

  /**
   * AdminExpenseAllocation createMany
   */
  export type AdminExpenseAllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminExpenseAllocations.
     */
    data: AdminExpenseAllocationCreateManyInput | AdminExpenseAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminExpenseAllocation createManyAndReturn
   */
  export type AdminExpenseAllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * The data used to create many AdminExpenseAllocations.
     */
    data: AdminExpenseAllocationCreateManyInput | AdminExpenseAllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminExpenseAllocation update
   */
  export type AdminExpenseAllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminExpenseAllocation.
     */
    data: XOR<AdminExpenseAllocationUpdateInput, AdminExpenseAllocationUncheckedUpdateInput>
    /**
     * Choose, which AdminExpenseAllocation to update.
     */
    where: AdminExpenseAllocationWhereUniqueInput
  }

  /**
   * AdminExpenseAllocation updateMany
   */
  export type AdminExpenseAllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminExpenseAllocations.
     */
    data: XOR<AdminExpenseAllocationUpdateManyMutationInput, AdminExpenseAllocationUncheckedUpdateManyInput>
    /**
     * Filter which AdminExpenseAllocations to update
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * Limit how many AdminExpenseAllocations to update.
     */
    limit?: number
  }

  /**
   * AdminExpenseAllocation updateManyAndReturn
   */
  export type AdminExpenseAllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * The data used to update AdminExpenseAllocations.
     */
    data: XOR<AdminExpenseAllocationUpdateManyMutationInput, AdminExpenseAllocationUncheckedUpdateManyInput>
    /**
     * Filter which AdminExpenseAllocations to update
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * Limit how many AdminExpenseAllocations to update.
     */
    limit?: number
  }

  /**
   * AdminExpenseAllocation upsert
   */
  export type AdminExpenseAllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminExpenseAllocation to update in case it exists.
     */
    where: AdminExpenseAllocationWhereUniqueInput
    /**
     * In case the AdminExpenseAllocation found by the `where` argument doesn't exist, create a new AdminExpenseAllocation with this data.
     */
    create: XOR<AdminExpenseAllocationCreateInput, AdminExpenseAllocationUncheckedCreateInput>
    /**
     * In case the AdminExpenseAllocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminExpenseAllocationUpdateInput, AdminExpenseAllocationUncheckedUpdateInput>
  }

  /**
   * AdminExpenseAllocation delete
   */
  export type AdminExpenseAllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
    /**
     * Filter which AdminExpenseAllocation to delete.
     */
    where: AdminExpenseAllocationWhereUniqueInput
  }

  /**
   * AdminExpenseAllocation deleteMany
   */
  export type AdminExpenseAllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminExpenseAllocations to delete
     */
    where?: AdminExpenseAllocationWhereInput
    /**
     * Limit how many AdminExpenseAllocations to delete.
     */
    limit?: number
  }

  /**
   * AdminExpenseAllocation without action
   */
  export type AdminExpenseAllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpenseAllocation
     */
    select?: AdminExpenseAllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpenseAllocation
     */
    omit?: AdminExpenseAllocationOmit<ExtArgs> | null
  }


  /**
   * Model BranchParameters
   */

  export type AggregateBranchParameters = {
    _count: BranchParametersCountAggregateOutputType | null
    _avg: BranchParametersAvgAggregateOutputType | null
    _sum: BranchParametersSumAggregateOutputType | null
    _min: BranchParametersMinAggregateOutputType | null
    _max: BranchParametersMaxAggregateOutputType | null
  }

  export type BranchParametersAvgAggregateOutputType = {
    year: number | null
    branchNumber: number | null
    expectedGrossPremium: number | null
    agentCommPct: number | null
    reinsurancePct: number | null
    reinsuranceCommPct: number | null
    expectedLrPct: number | null
  }

  export type BranchParametersSumAggregateOutputType = {
    year: number | null
    branchNumber: number | null
    expectedGrossPremium: number | null
    agentCommPct: number | null
    reinsurancePct: number | null
    reinsuranceCommPct: number | null
    expectedLrPct: number | null
  }

  export type BranchParametersMinAggregateOutputType = {
    id: string | null
    year: number | null
    branchNumber: number | null
    expectedGrossPremium: number | null
    agentCommPct: number | null
    reinsurancePct: number | null
    reinsuranceCommPct: number | null
    expectedLrPct: number | null
    updatedAt: Date | null
  }

  export type BranchParametersMaxAggregateOutputType = {
    id: string | null
    year: number | null
    branchNumber: number | null
    expectedGrossPremium: number | null
    agentCommPct: number | null
    reinsurancePct: number | null
    reinsuranceCommPct: number | null
    expectedLrPct: number | null
    updatedAt: Date | null
  }

  export type BranchParametersCountAggregateOutputType = {
    id: number
    year: number
    branchNumber: number
    expectedGrossPremium: number
    agentCommPct: number
    reinsurancePct: number
    reinsuranceCommPct: number
    expectedLrPct: number
    updatedAt: number
    _all: number
  }


  export type BranchParametersAvgAggregateInputType = {
    year?: true
    branchNumber?: true
    expectedGrossPremium?: true
    agentCommPct?: true
    reinsurancePct?: true
    reinsuranceCommPct?: true
    expectedLrPct?: true
  }

  export type BranchParametersSumAggregateInputType = {
    year?: true
    branchNumber?: true
    expectedGrossPremium?: true
    agentCommPct?: true
    reinsurancePct?: true
    reinsuranceCommPct?: true
    expectedLrPct?: true
  }

  export type BranchParametersMinAggregateInputType = {
    id?: true
    year?: true
    branchNumber?: true
    expectedGrossPremium?: true
    agentCommPct?: true
    reinsurancePct?: true
    reinsuranceCommPct?: true
    expectedLrPct?: true
    updatedAt?: true
  }

  export type BranchParametersMaxAggregateInputType = {
    id?: true
    year?: true
    branchNumber?: true
    expectedGrossPremium?: true
    agentCommPct?: true
    reinsurancePct?: true
    reinsuranceCommPct?: true
    expectedLrPct?: true
    updatedAt?: true
  }

  export type BranchParametersCountAggregateInputType = {
    id?: true
    year?: true
    branchNumber?: true
    expectedGrossPremium?: true
    agentCommPct?: true
    reinsurancePct?: true
    reinsuranceCommPct?: true
    expectedLrPct?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchParametersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchParameters to aggregate.
     */
    where?: BranchParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchParameters to fetch.
     */
    orderBy?: BranchParametersOrderByWithRelationInput | BranchParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchParameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchParameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BranchParameters
    **/
    _count?: true | BranchParametersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchParametersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchParametersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchParametersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchParametersMaxAggregateInputType
  }

  export type GetBranchParametersAggregateType<T extends BranchParametersAggregateArgs> = {
        [P in keyof T & keyof AggregateBranchParameters]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranchParameters[P]>
      : GetScalarType<T[P], AggregateBranchParameters[P]>
  }




  export type BranchParametersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchParametersWhereInput
    orderBy?: BranchParametersOrderByWithAggregationInput | BranchParametersOrderByWithAggregationInput[]
    by: BranchParametersScalarFieldEnum[] | BranchParametersScalarFieldEnum
    having?: BranchParametersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchParametersCountAggregateInputType | true
    _avg?: BranchParametersAvgAggregateInputType
    _sum?: BranchParametersSumAggregateInputType
    _min?: BranchParametersMinAggregateInputType
    _max?: BranchParametersMaxAggregateInputType
  }

  export type BranchParametersGroupByOutputType = {
    id: string
    year: number
    branchNumber: number
    expectedGrossPremium: number
    agentCommPct: number
    reinsurancePct: number
    reinsuranceCommPct: number
    expectedLrPct: number
    updatedAt: Date
    _count: BranchParametersCountAggregateOutputType | null
    _avg: BranchParametersAvgAggregateOutputType | null
    _sum: BranchParametersSumAggregateOutputType | null
    _min: BranchParametersMinAggregateOutputType | null
    _max: BranchParametersMaxAggregateOutputType | null
  }

  type GetBranchParametersGroupByPayload<T extends BranchParametersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchParametersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchParametersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchParametersGroupByOutputType[P]>
            : GetScalarType<T[P], BranchParametersGroupByOutputType[P]>
        }
      >
    >


  export type BranchParametersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    branchNumber?: boolean
    expectedGrossPremium?: boolean
    agentCommPct?: boolean
    reinsurancePct?: boolean
    reinsuranceCommPct?: boolean
    expectedLrPct?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchParameters"]>

  export type BranchParametersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    branchNumber?: boolean
    expectedGrossPremium?: boolean
    agentCommPct?: boolean
    reinsurancePct?: boolean
    reinsuranceCommPct?: boolean
    expectedLrPct?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchParameters"]>

  export type BranchParametersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    branchNumber?: boolean
    expectedGrossPremium?: boolean
    agentCommPct?: boolean
    reinsurancePct?: boolean
    reinsuranceCommPct?: boolean
    expectedLrPct?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branchParameters"]>

  export type BranchParametersSelectScalar = {
    id?: boolean
    year?: boolean
    branchNumber?: boolean
    expectedGrossPremium?: boolean
    agentCommPct?: boolean
    reinsurancePct?: boolean
    reinsuranceCommPct?: boolean
    expectedLrPct?: boolean
    updatedAt?: boolean
  }

  export type BranchParametersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "branchNumber" | "expectedGrossPremium" | "agentCommPct" | "reinsurancePct" | "reinsuranceCommPct" | "expectedLrPct" | "updatedAt", ExtArgs["result"]["branchParameters"]>

  export type $BranchParametersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BranchParameters"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      branchNumber: number
      expectedGrossPremium: number
      agentCommPct: number
      reinsurancePct: number
      reinsuranceCommPct: number
      expectedLrPct: number
      updatedAt: Date
    }, ExtArgs["result"]["branchParameters"]>
    composites: {}
  }

  type BranchParametersGetPayload<S extends boolean | null | undefined | BranchParametersDefaultArgs> = $Result.GetResult<Prisma.$BranchParametersPayload, S>

  type BranchParametersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchParametersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchParametersCountAggregateInputType | true
    }

  export interface BranchParametersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BranchParameters'], meta: { name: 'BranchParameters' } }
    /**
     * Find zero or one BranchParameters that matches the filter.
     * @param {BranchParametersFindUniqueArgs} args - Arguments to find a BranchParameters
     * @example
     * // Get one BranchParameters
     * const branchParameters = await prisma.branchParameters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchParametersFindUniqueArgs>(args: SelectSubset<T, BranchParametersFindUniqueArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BranchParameters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchParametersFindUniqueOrThrowArgs} args - Arguments to find a BranchParameters
     * @example
     * // Get one BranchParameters
     * const branchParameters = await prisma.branchParameters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchParametersFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchParametersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchParameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersFindFirstArgs} args - Arguments to find a BranchParameters
     * @example
     * // Get one BranchParameters
     * const branchParameters = await prisma.branchParameters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchParametersFindFirstArgs>(args?: SelectSubset<T, BranchParametersFindFirstArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchParameters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersFindFirstOrThrowArgs} args - Arguments to find a BranchParameters
     * @example
     * // Get one BranchParameters
     * const branchParameters = await prisma.branchParameters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchParametersFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchParametersFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BranchParameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BranchParameters
     * const branchParameters = await prisma.branchParameters.findMany()
     * 
     * // Get first 10 BranchParameters
     * const branchParameters = await prisma.branchParameters.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchParametersWithIdOnly = await prisma.branchParameters.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchParametersFindManyArgs>(args?: SelectSubset<T, BranchParametersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BranchParameters.
     * @param {BranchParametersCreateArgs} args - Arguments to create a BranchParameters.
     * @example
     * // Create one BranchParameters
     * const BranchParameters = await prisma.branchParameters.create({
     *   data: {
     *     // ... data to create a BranchParameters
     *   }
     * })
     * 
     */
    create<T extends BranchParametersCreateArgs>(args: SelectSubset<T, BranchParametersCreateArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BranchParameters.
     * @param {BranchParametersCreateManyArgs} args - Arguments to create many BranchParameters.
     * @example
     * // Create many BranchParameters
     * const branchParameters = await prisma.branchParameters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchParametersCreateManyArgs>(args?: SelectSubset<T, BranchParametersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BranchParameters and returns the data saved in the database.
     * @param {BranchParametersCreateManyAndReturnArgs} args - Arguments to create many BranchParameters.
     * @example
     * // Create many BranchParameters
     * const branchParameters = await prisma.branchParameters.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BranchParameters and only return the `id`
     * const branchParametersWithIdOnly = await prisma.branchParameters.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchParametersCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchParametersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BranchParameters.
     * @param {BranchParametersDeleteArgs} args - Arguments to delete one BranchParameters.
     * @example
     * // Delete one BranchParameters
     * const BranchParameters = await prisma.branchParameters.delete({
     *   where: {
     *     // ... filter to delete one BranchParameters
     *   }
     * })
     * 
     */
    delete<T extends BranchParametersDeleteArgs>(args: SelectSubset<T, BranchParametersDeleteArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BranchParameters.
     * @param {BranchParametersUpdateArgs} args - Arguments to update one BranchParameters.
     * @example
     * // Update one BranchParameters
     * const branchParameters = await prisma.branchParameters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchParametersUpdateArgs>(args: SelectSubset<T, BranchParametersUpdateArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BranchParameters.
     * @param {BranchParametersDeleteManyArgs} args - Arguments to filter BranchParameters to delete.
     * @example
     * // Delete a few BranchParameters
     * const { count } = await prisma.branchParameters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchParametersDeleteManyArgs>(args?: SelectSubset<T, BranchParametersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchParameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BranchParameters
     * const branchParameters = await prisma.branchParameters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchParametersUpdateManyArgs>(args: SelectSubset<T, BranchParametersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchParameters and returns the data updated in the database.
     * @param {BranchParametersUpdateManyAndReturnArgs} args - Arguments to update many BranchParameters.
     * @example
     * // Update many BranchParameters
     * const branchParameters = await prisma.branchParameters.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BranchParameters and only return the `id`
     * const branchParametersWithIdOnly = await prisma.branchParameters.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchParametersUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchParametersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BranchParameters.
     * @param {BranchParametersUpsertArgs} args - Arguments to update or create a BranchParameters.
     * @example
     * // Update or create a BranchParameters
     * const branchParameters = await prisma.branchParameters.upsert({
     *   create: {
     *     // ... data to create a BranchParameters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BranchParameters we want to update
     *   }
     * })
     */
    upsert<T extends BranchParametersUpsertArgs>(args: SelectSubset<T, BranchParametersUpsertArgs<ExtArgs>>): Prisma__BranchParametersClient<$Result.GetResult<Prisma.$BranchParametersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BranchParameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersCountArgs} args - Arguments to filter BranchParameters to count.
     * @example
     * // Count the number of BranchParameters
     * const count = await prisma.branchParameters.count({
     *   where: {
     *     // ... the filter for the BranchParameters we want to count
     *   }
     * })
    **/
    count<T extends BranchParametersCountArgs>(
      args?: Subset<T, BranchParametersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchParametersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BranchParameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchParametersAggregateArgs>(args: Subset<T, BranchParametersAggregateArgs>): Prisma.PrismaPromise<GetBranchParametersAggregateType<T>>

    /**
     * Group by BranchParameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchParametersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchParametersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchParametersGroupByArgs['orderBy'] }
        : { orderBy?: BranchParametersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchParametersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchParametersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BranchParameters model
   */
  readonly fields: BranchParametersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BranchParameters.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchParametersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BranchParameters model
   */
  interface BranchParametersFieldRefs {
    readonly id: FieldRef<"BranchParameters", 'String'>
    readonly year: FieldRef<"BranchParameters", 'Int'>
    readonly branchNumber: FieldRef<"BranchParameters", 'Int'>
    readonly expectedGrossPremium: FieldRef<"BranchParameters", 'Float'>
    readonly agentCommPct: FieldRef<"BranchParameters", 'Float'>
    readonly reinsurancePct: FieldRef<"BranchParameters", 'Float'>
    readonly reinsuranceCommPct: FieldRef<"BranchParameters", 'Float'>
    readonly expectedLrPct: FieldRef<"BranchParameters", 'Float'>
    readonly updatedAt: FieldRef<"BranchParameters", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BranchParameters findUnique
   */
  export type BranchParametersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter, which BranchParameters to fetch.
     */
    where: BranchParametersWhereUniqueInput
  }

  /**
   * BranchParameters findUniqueOrThrow
   */
  export type BranchParametersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter, which BranchParameters to fetch.
     */
    where: BranchParametersWhereUniqueInput
  }

  /**
   * BranchParameters findFirst
   */
  export type BranchParametersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter, which BranchParameters to fetch.
     */
    where?: BranchParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchParameters to fetch.
     */
    orderBy?: BranchParametersOrderByWithRelationInput | BranchParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchParameters.
     */
    cursor?: BranchParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchParameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchParameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchParameters.
     */
    distinct?: BranchParametersScalarFieldEnum | BranchParametersScalarFieldEnum[]
  }

  /**
   * BranchParameters findFirstOrThrow
   */
  export type BranchParametersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter, which BranchParameters to fetch.
     */
    where?: BranchParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchParameters to fetch.
     */
    orderBy?: BranchParametersOrderByWithRelationInput | BranchParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchParameters.
     */
    cursor?: BranchParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchParameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchParameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchParameters.
     */
    distinct?: BranchParametersScalarFieldEnum | BranchParametersScalarFieldEnum[]
  }

  /**
   * BranchParameters findMany
   */
  export type BranchParametersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter, which BranchParameters to fetch.
     */
    where?: BranchParametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchParameters to fetch.
     */
    orderBy?: BranchParametersOrderByWithRelationInput | BranchParametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BranchParameters.
     */
    cursor?: BranchParametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchParameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchParameters.
     */
    skip?: number
    distinct?: BranchParametersScalarFieldEnum | BranchParametersScalarFieldEnum[]
  }

  /**
   * BranchParameters create
   */
  export type BranchParametersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * The data needed to create a BranchParameters.
     */
    data: XOR<BranchParametersCreateInput, BranchParametersUncheckedCreateInput>
  }

  /**
   * BranchParameters createMany
   */
  export type BranchParametersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BranchParameters.
     */
    data: BranchParametersCreateManyInput | BranchParametersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BranchParameters createManyAndReturn
   */
  export type BranchParametersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * The data used to create many BranchParameters.
     */
    data: BranchParametersCreateManyInput | BranchParametersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BranchParameters update
   */
  export type BranchParametersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * The data needed to update a BranchParameters.
     */
    data: XOR<BranchParametersUpdateInput, BranchParametersUncheckedUpdateInput>
    /**
     * Choose, which BranchParameters to update.
     */
    where: BranchParametersWhereUniqueInput
  }

  /**
   * BranchParameters updateMany
   */
  export type BranchParametersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BranchParameters.
     */
    data: XOR<BranchParametersUpdateManyMutationInput, BranchParametersUncheckedUpdateManyInput>
    /**
     * Filter which BranchParameters to update
     */
    where?: BranchParametersWhereInput
    /**
     * Limit how many BranchParameters to update.
     */
    limit?: number
  }

  /**
   * BranchParameters updateManyAndReturn
   */
  export type BranchParametersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * The data used to update BranchParameters.
     */
    data: XOR<BranchParametersUpdateManyMutationInput, BranchParametersUncheckedUpdateManyInput>
    /**
     * Filter which BranchParameters to update
     */
    where?: BranchParametersWhereInput
    /**
     * Limit how many BranchParameters to update.
     */
    limit?: number
  }

  /**
   * BranchParameters upsert
   */
  export type BranchParametersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * The filter to search for the BranchParameters to update in case it exists.
     */
    where: BranchParametersWhereUniqueInput
    /**
     * In case the BranchParameters found by the `where` argument doesn't exist, create a new BranchParameters with this data.
     */
    create: XOR<BranchParametersCreateInput, BranchParametersUncheckedCreateInput>
    /**
     * In case the BranchParameters was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchParametersUpdateInput, BranchParametersUncheckedUpdateInput>
  }

  /**
   * BranchParameters delete
   */
  export type BranchParametersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
    /**
     * Filter which BranchParameters to delete.
     */
    where: BranchParametersWhereUniqueInput
  }

  /**
   * BranchParameters deleteMany
   */
  export type BranchParametersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchParameters to delete
     */
    where?: BranchParametersWhereInput
    /**
     * Limit how many BranchParameters to delete.
     */
    limit?: number
  }

  /**
   * BranchParameters without action
   */
  export type BranchParametersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchParameters
     */
    select?: BranchParametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchParameters
     */
    omit?: BranchParametersOmit<ExtArgs> | null
  }


  /**
   * Model PremiumActuals
   */

  export type AggregatePremiumActuals = {
    _count: PremiumActualsCountAggregateOutputType | null
    _avg: PremiumActualsAvgAggregateOutputType | null
    _sum: PremiumActualsSumAggregateOutputType | null
    _min: PremiumActualsMinAggregateOutputType | null
    _max: PremiumActualsMaxAggregateOutputType | null
  }

  export type PremiumActualsAvgAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    grossPremium: number | null
    agentComm: number | null
    reinsurancePremium: number | null
    reinsuranceComm: number | null
  }

  export type PremiumActualsSumAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    grossPremium: number | null
    agentComm: number | null
    reinsurancePremium: number | null
    reinsuranceComm: number | null
  }

  export type PremiumActualsMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    startDate: Date | null
    endDate: Date | null
    grossPremium: number | null
    agentComm: number | null
    reinsurancePremium: number | null
    reinsuranceComm: number | null
    updatedAt: Date | null
  }

  export type PremiumActualsMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    startDate: Date | null
    endDate: Date | null
    grossPremium: number | null
    agentComm: number | null
    reinsurancePremium: number | null
    reinsuranceComm: number | null
    updatedAt: Date | null
  }

  export type PremiumActualsCountAggregateOutputType = {
    id: number
    year: number
    month: number
    branchNumber: number
    startDate: number
    endDate: number
    grossPremium: number
    agentComm: number
    reinsurancePremium: number
    reinsuranceComm: number
    updatedAt: number
    _all: number
  }


  export type PremiumActualsAvgAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    grossPremium?: true
    agentComm?: true
    reinsurancePremium?: true
    reinsuranceComm?: true
  }

  export type PremiumActualsSumAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    grossPremium?: true
    agentComm?: true
    reinsurancePremium?: true
    reinsuranceComm?: true
  }

  export type PremiumActualsMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    startDate?: true
    endDate?: true
    grossPremium?: true
    agentComm?: true
    reinsurancePremium?: true
    reinsuranceComm?: true
    updatedAt?: true
  }

  export type PremiumActualsMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    startDate?: true
    endDate?: true
    grossPremium?: true
    agentComm?: true
    reinsurancePremium?: true
    reinsuranceComm?: true
    updatedAt?: true
  }

  export type PremiumActualsCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    startDate?: true
    endDate?: true
    grossPremium?: true
    agentComm?: true
    reinsurancePremium?: true
    reinsuranceComm?: true
    updatedAt?: true
    _all?: true
  }

  export type PremiumActualsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremiumActuals to aggregate.
     */
    where?: PremiumActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumActuals to fetch.
     */
    orderBy?: PremiumActualsOrderByWithRelationInput | PremiumActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremiumActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PremiumActuals
    **/
    _count?: true | PremiumActualsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremiumActualsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremiumActualsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremiumActualsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremiumActualsMaxAggregateInputType
  }

  export type GetPremiumActualsAggregateType<T extends PremiumActualsAggregateArgs> = {
        [P in keyof T & keyof AggregatePremiumActuals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremiumActuals[P]>
      : GetScalarType<T[P], AggregatePremiumActuals[P]>
  }




  export type PremiumActualsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremiumActualsWhereInput
    orderBy?: PremiumActualsOrderByWithAggregationInput | PremiumActualsOrderByWithAggregationInput[]
    by: PremiumActualsScalarFieldEnum[] | PremiumActualsScalarFieldEnum
    having?: PremiumActualsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremiumActualsCountAggregateInputType | true
    _avg?: PremiumActualsAvgAggregateInputType
    _sum?: PremiumActualsSumAggregateInputType
    _min?: PremiumActualsMinAggregateInputType
    _max?: PremiumActualsMaxAggregateInputType
  }

  export type PremiumActualsGroupByOutputType = {
    id: string
    year: number
    month: number
    branchNumber: number
    startDate: Date
    endDate: Date
    grossPremium: number
    agentComm: number
    reinsurancePremium: number
    reinsuranceComm: number
    updatedAt: Date
    _count: PremiumActualsCountAggregateOutputType | null
    _avg: PremiumActualsAvgAggregateOutputType | null
    _sum: PremiumActualsSumAggregateOutputType | null
    _min: PremiumActualsMinAggregateOutputType | null
    _max: PremiumActualsMaxAggregateOutputType | null
  }

  type GetPremiumActualsGroupByPayload<T extends PremiumActualsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremiumActualsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremiumActualsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremiumActualsGroupByOutputType[P]>
            : GetScalarType<T[P], PremiumActualsGroupByOutputType[P]>
        }
      >
    >


  export type PremiumActualsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    grossPremium?: boolean
    agentComm?: boolean
    reinsurancePremium?: boolean
    reinsuranceComm?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumActuals"]>

  export type PremiumActualsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    grossPremium?: boolean
    agentComm?: boolean
    reinsurancePremium?: boolean
    reinsuranceComm?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumActuals"]>

  export type PremiumActualsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    grossPremium?: boolean
    agentComm?: boolean
    reinsurancePremium?: boolean
    reinsuranceComm?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumActuals"]>

  export type PremiumActualsSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    grossPremium?: boolean
    agentComm?: boolean
    reinsurancePremium?: boolean
    reinsuranceComm?: boolean
    updatedAt?: boolean
  }

  export type PremiumActualsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "branchNumber" | "startDate" | "endDate" | "grossPremium" | "agentComm" | "reinsurancePremium" | "reinsuranceComm" | "updatedAt", ExtArgs["result"]["premiumActuals"]>

  export type $PremiumActualsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PremiumActuals"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      branchNumber: number
      startDate: Date
      endDate: Date
      grossPremium: number
      agentComm: number
      reinsurancePremium: number
      reinsuranceComm: number
      updatedAt: Date
    }, ExtArgs["result"]["premiumActuals"]>
    composites: {}
  }

  type PremiumActualsGetPayload<S extends boolean | null | undefined | PremiumActualsDefaultArgs> = $Result.GetResult<Prisma.$PremiumActualsPayload, S>

  type PremiumActualsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremiumActualsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PremiumActualsCountAggregateInputType | true
    }

  export interface PremiumActualsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PremiumActuals'], meta: { name: 'PremiumActuals' } }
    /**
     * Find zero or one PremiumActuals that matches the filter.
     * @param {PremiumActualsFindUniqueArgs} args - Arguments to find a PremiumActuals
     * @example
     * // Get one PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremiumActualsFindUniqueArgs>(args: SelectSubset<T, PremiumActualsFindUniqueArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PremiumActuals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremiumActualsFindUniqueOrThrowArgs} args - Arguments to find a PremiumActuals
     * @example
     * // Get one PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremiumActualsFindUniqueOrThrowArgs>(args: SelectSubset<T, PremiumActualsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremiumActuals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsFindFirstArgs} args - Arguments to find a PremiumActuals
     * @example
     * // Get one PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremiumActualsFindFirstArgs>(args?: SelectSubset<T, PremiumActualsFindFirstArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremiumActuals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsFindFirstOrThrowArgs} args - Arguments to find a PremiumActuals
     * @example
     * // Get one PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremiumActualsFindFirstOrThrowArgs>(args?: SelectSubset<T, PremiumActualsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PremiumActuals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findMany()
     * 
     * // Get first 10 PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const premiumActualsWithIdOnly = await prisma.premiumActuals.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PremiumActualsFindManyArgs>(args?: SelectSubset<T, PremiumActualsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PremiumActuals.
     * @param {PremiumActualsCreateArgs} args - Arguments to create a PremiumActuals.
     * @example
     * // Create one PremiumActuals
     * const PremiumActuals = await prisma.premiumActuals.create({
     *   data: {
     *     // ... data to create a PremiumActuals
     *   }
     * })
     * 
     */
    create<T extends PremiumActualsCreateArgs>(args: SelectSubset<T, PremiumActualsCreateArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PremiumActuals.
     * @param {PremiumActualsCreateManyArgs} args - Arguments to create many PremiumActuals.
     * @example
     * // Create many PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremiumActualsCreateManyArgs>(args?: SelectSubset<T, PremiumActualsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PremiumActuals and returns the data saved in the database.
     * @param {PremiumActualsCreateManyAndReturnArgs} args - Arguments to create many PremiumActuals.
     * @example
     * // Create many PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PremiumActuals and only return the `id`
     * const premiumActualsWithIdOnly = await prisma.premiumActuals.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PremiumActualsCreateManyAndReturnArgs>(args?: SelectSubset<T, PremiumActualsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PremiumActuals.
     * @param {PremiumActualsDeleteArgs} args - Arguments to delete one PremiumActuals.
     * @example
     * // Delete one PremiumActuals
     * const PremiumActuals = await prisma.premiumActuals.delete({
     *   where: {
     *     // ... filter to delete one PremiumActuals
     *   }
     * })
     * 
     */
    delete<T extends PremiumActualsDeleteArgs>(args: SelectSubset<T, PremiumActualsDeleteArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PremiumActuals.
     * @param {PremiumActualsUpdateArgs} args - Arguments to update one PremiumActuals.
     * @example
     * // Update one PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremiumActualsUpdateArgs>(args: SelectSubset<T, PremiumActualsUpdateArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PremiumActuals.
     * @param {PremiumActualsDeleteManyArgs} args - Arguments to filter PremiumActuals to delete.
     * @example
     * // Delete a few PremiumActuals
     * const { count } = await prisma.premiumActuals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremiumActualsDeleteManyArgs>(args?: SelectSubset<T, PremiumActualsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremiumActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremiumActualsUpdateManyArgs>(args: SelectSubset<T, PremiumActualsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremiumActuals and returns the data updated in the database.
     * @param {PremiumActualsUpdateManyAndReturnArgs} args - Arguments to update many PremiumActuals.
     * @example
     * // Update many PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PremiumActuals and only return the `id`
     * const premiumActualsWithIdOnly = await prisma.premiumActuals.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PremiumActualsUpdateManyAndReturnArgs>(args: SelectSubset<T, PremiumActualsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PremiumActuals.
     * @param {PremiumActualsUpsertArgs} args - Arguments to update or create a PremiumActuals.
     * @example
     * // Update or create a PremiumActuals
     * const premiumActuals = await prisma.premiumActuals.upsert({
     *   create: {
     *     // ... data to create a PremiumActuals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PremiumActuals we want to update
     *   }
     * })
     */
    upsert<T extends PremiumActualsUpsertArgs>(args: SelectSubset<T, PremiumActualsUpsertArgs<ExtArgs>>): Prisma__PremiumActualsClient<$Result.GetResult<Prisma.$PremiumActualsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PremiumActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsCountArgs} args - Arguments to filter PremiumActuals to count.
     * @example
     * // Count the number of PremiumActuals
     * const count = await prisma.premiumActuals.count({
     *   where: {
     *     // ... the filter for the PremiumActuals we want to count
     *   }
     * })
    **/
    count<T extends PremiumActualsCountArgs>(
      args?: Subset<T, PremiumActualsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremiumActualsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PremiumActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremiumActualsAggregateArgs>(args: Subset<T, PremiumActualsAggregateArgs>): Prisma.PrismaPromise<GetPremiumActualsAggregateType<T>>

    /**
     * Group by PremiumActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumActualsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremiumActualsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremiumActualsGroupByArgs['orderBy'] }
        : { orderBy?: PremiumActualsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremiumActualsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremiumActualsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PremiumActuals model
   */
  readonly fields: PremiumActualsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PremiumActuals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremiumActualsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PremiumActuals model
   */
  interface PremiumActualsFieldRefs {
    readonly id: FieldRef<"PremiumActuals", 'String'>
    readonly year: FieldRef<"PremiumActuals", 'Int'>
    readonly month: FieldRef<"PremiumActuals", 'Int'>
    readonly branchNumber: FieldRef<"PremiumActuals", 'Int'>
    readonly startDate: FieldRef<"PremiumActuals", 'DateTime'>
    readonly endDate: FieldRef<"PremiumActuals", 'DateTime'>
    readonly grossPremium: FieldRef<"PremiumActuals", 'Float'>
    readonly agentComm: FieldRef<"PremiumActuals", 'Float'>
    readonly reinsurancePremium: FieldRef<"PremiumActuals", 'Float'>
    readonly reinsuranceComm: FieldRef<"PremiumActuals", 'Float'>
    readonly updatedAt: FieldRef<"PremiumActuals", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PremiumActuals findUnique
   */
  export type PremiumActualsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter, which PremiumActuals to fetch.
     */
    where: PremiumActualsWhereUniqueInput
  }

  /**
   * PremiumActuals findUniqueOrThrow
   */
  export type PremiumActualsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter, which PremiumActuals to fetch.
     */
    where: PremiumActualsWhereUniqueInput
  }

  /**
   * PremiumActuals findFirst
   */
  export type PremiumActualsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter, which PremiumActuals to fetch.
     */
    where?: PremiumActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumActuals to fetch.
     */
    orderBy?: PremiumActualsOrderByWithRelationInput | PremiumActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremiumActuals.
     */
    cursor?: PremiumActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremiumActuals.
     */
    distinct?: PremiumActualsScalarFieldEnum | PremiumActualsScalarFieldEnum[]
  }

  /**
   * PremiumActuals findFirstOrThrow
   */
  export type PremiumActualsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter, which PremiumActuals to fetch.
     */
    where?: PremiumActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumActuals to fetch.
     */
    orderBy?: PremiumActualsOrderByWithRelationInput | PremiumActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremiumActuals.
     */
    cursor?: PremiumActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremiumActuals.
     */
    distinct?: PremiumActualsScalarFieldEnum | PremiumActualsScalarFieldEnum[]
  }

  /**
   * PremiumActuals findMany
   */
  export type PremiumActualsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter, which PremiumActuals to fetch.
     */
    where?: PremiumActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumActuals to fetch.
     */
    orderBy?: PremiumActualsOrderByWithRelationInput | PremiumActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PremiumActuals.
     */
    cursor?: PremiumActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumActuals.
     */
    skip?: number
    distinct?: PremiumActualsScalarFieldEnum | PremiumActualsScalarFieldEnum[]
  }

  /**
   * PremiumActuals create
   */
  export type PremiumActualsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * The data needed to create a PremiumActuals.
     */
    data: XOR<PremiumActualsCreateInput, PremiumActualsUncheckedCreateInput>
  }

  /**
   * PremiumActuals createMany
   */
  export type PremiumActualsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PremiumActuals.
     */
    data: PremiumActualsCreateManyInput | PremiumActualsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremiumActuals createManyAndReturn
   */
  export type PremiumActualsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * The data used to create many PremiumActuals.
     */
    data: PremiumActualsCreateManyInput | PremiumActualsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremiumActuals update
   */
  export type PremiumActualsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * The data needed to update a PremiumActuals.
     */
    data: XOR<PremiumActualsUpdateInput, PremiumActualsUncheckedUpdateInput>
    /**
     * Choose, which PremiumActuals to update.
     */
    where: PremiumActualsWhereUniqueInput
  }

  /**
   * PremiumActuals updateMany
   */
  export type PremiumActualsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PremiumActuals.
     */
    data: XOR<PremiumActualsUpdateManyMutationInput, PremiumActualsUncheckedUpdateManyInput>
    /**
     * Filter which PremiumActuals to update
     */
    where?: PremiumActualsWhereInput
    /**
     * Limit how many PremiumActuals to update.
     */
    limit?: number
  }

  /**
   * PremiumActuals updateManyAndReturn
   */
  export type PremiumActualsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * The data used to update PremiumActuals.
     */
    data: XOR<PremiumActualsUpdateManyMutationInput, PremiumActualsUncheckedUpdateManyInput>
    /**
     * Filter which PremiumActuals to update
     */
    where?: PremiumActualsWhereInput
    /**
     * Limit how many PremiumActuals to update.
     */
    limit?: number
  }

  /**
   * PremiumActuals upsert
   */
  export type PremiumActualsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * The filter to search for the PremiumActuals to update in case it exists.
     */
    where: PremiumActualsWhereUniqueInput
    /**
     * In case the PremiumActuals found by the `where` argument doesn't exist, create a new PremiumActuals with this data.
     */
    create: XOR<PremiumActualsCreateInput, PremiumActualsUncheckedCreateInput>
    /**
     * In case the PremiumActuals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremiumActualsUpdateInput, PremiumActualsUncheckedUpdateInput>
  }

  /**
   * PremiumActuals delete
   */
  export type PremiumActualsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
    /**
     * Filter which PremiumActuals to delete.
     */
    where: PremiumActualsWhereUniqueInput
  }

  /**
   * PremiumActuals deleteMany
   */
  export type PremiumActualsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremiumActuals to delete
     */
    where?: PremiumActualsWhereInput
    /**
     * Limit how many PremiumActuals to delete.
     */
    limit?: number
  }

  /**
   * PremiumActuals without action
   */
  export type PremiumActualsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumActuals
     */
    select?: PremiumActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumActuals
     */
    omit?: PremiumActualsOmit<ExtArgs> | null
  }


  /**
   * Model ClaimsActuals
   */

  export type AggregateClaimsActuals = {
    _count: ClaimsActualsCountAggregateOutputType | null
    _avg: ClaimsActualsAvgAggregateOutputType | null
    _sum: ClaimsActualsSumAggregateOutputType | null
    _min: ClaimsActualsMinAggregateOutputType | null
    _max: ClaimsActualsMaxAggregateOutputType | null
  }

  export type ClaimsActualsAvgAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    claimsPaidGross: number | null
    claimsPaidRi: number | null
  }

  export type ClaimsActualsSumAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    claimsPaidGross: number | null
    claimsPaidRi: number | null
  }

  export type ClaimsActualsMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    claimsPaidGross: number | null
    claimsPaidRi: number | null
    updatedAt: Date | null
  }

  export type ClaimsActualsMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    claimsPaidGross: number | null
    claimsPaidRi: number | null
    updatedAt: Date | null
  }

  export type ClaimsActualsCountAggregateOutputType = {
    id: number
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    claimsPaidGross: number
    claimsPaidRi: number
    updatedAt: number
    _all: number
  }


  export type ClaimsActualsAvgAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    claimsPaidGross?: true
    claimsPaidRi?: true
  }

  export type ClaimsActualsSumAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    claimsPaidGross?: true
    claimsPaidRi?: true
  }

  export type ClaimsActualsMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    claimsPaidGross?: true
    claimsPaidRi?: true
    updatedAt?: true
  }

  export type ClaimsActualsMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    claimsPaidGross?: true
    claimsPaidRi?: true
    updatedAt?: true
  }

  export type ClaimsActualsCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    claimsPaidGross?: true
    claimsPaidRi?: true
    updatedAt?: true
    _all?: true
  }

  export type ClaimsActualsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimsActuals to aggregate.
     */
    where?: ClaimsActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimsActuals to fetch.
     */
    orderBy?: ClaimsActualsOrderByWithRelationInput | ClaimsActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimsActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimsActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimsActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimsActuals
    **/
    _count?: true | ClaimsActualsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimsActualsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimsActualsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimsActualsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimsActualsMaxAggregateInputType
  }

  export type GetClaimsActualsAggregateType<T extends ClaimsActualsAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimsActuals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimsActuals[P]>
      : GetScalarType<T[P], AggregateClaimsActuals[P]>
  }




  export type ClaimsActualsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimsActualsWhereInput
    orderBy?: ClaimsActualsOrderByWithAggregationInput | ClaimsActualsOrderByWithAggregationInput[]
    by: ClaimsActualsScalarFieldEnum[] | ClaimsActualsScalarFieldEnum
    having?: ClaimsActualsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimsActualsCountAggregateInputType | true
    _avg?: ClaimsActualsAvgAggregateInputType
    _sum?: ClaimsActualsSumAggregateInputType
    _min?: ClaimsActualsMinAggregateInputType
    _max?: ClaimsActualsMaxAggregateInputType
  }

  export type ClaimsActualsGroupByOutputType = {
    id: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    claimsPaidGross: number
    claimsPaidRi: number
    updatedAt: Date
    _count: ClaimsActualsCountAggregateOutputType | null
    _avg: ClaimsActualsAvgAggregateOutputType | null
    _sum: ClaimsActualsSumAggregateOutputType | null
    _min: ClaimsActualsMinAggregateOutputType | null
    _max: ClaimsActualsMaxAggregateOutputType | null
  }

  type GetClaimsActualsGroupByPayload<T extends ClaimsActualsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimsActualsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimsActualsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimsActualsGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimsActualsGroupByOutputType[P]>
        }
      >
    >


  export type ClaimsActualsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    claimsPaidGross?: boolean
    claimsPaidRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["claimsActuals"]>

  export type ClaimsActualsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    claimsPaidGross?: boolean
    claimsPaidRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["claimsActuals"]>

  export type ClaimsActualsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    claimsPaidGross?: boolean
    claimsPaidRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["claimsActuals"]>

  export type ClaimsActualsSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    claimsPaidGross?: boolean
    claimsPaidRi?: boolean
    updatedAt?: boolean
  }

  export type ClaimsActualsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "branchNumber" | "underwritingYear" | "lossYear" | "claimsPaidGross" | "claimsPaidRi" | "updatedAt", ExtArgs["result"]["claimsActuals"]>

  export type $ClaimsActualsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimsActuals"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      branchNumber: number
      underwritingYear: number
      lossYear: number
      claimsPaidGross: number
      claimsPaidRi: number
      updatedAt: Date
    }, ExtArgs["result"]["claimsActuals"]>
    composites: {}
  }

  type ClaimsActualsGetPayload<S extends boolean | null | undefined | ClaimsActualsDefaultArgs> = $Result.GetResult<Prisma.$ClaimsActualsPayload, S>

  type ClaimsActualsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimsActualsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimsActualsCountAggregateInputType | true
    }

  export interface ClaimsActualsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimsActuals'], meta: { name: 'ClaimsActuals' } }
    /**
     * Find zero or one ClaimsActuals that matches the filter.
     * @param {ClaimsActualsFindUniqueArgs} args - Arguments to find a ClaimsActuals
     * @example
     * // Get one ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimsActualsFindUniqueArgs>(args: SelectSubset<T, ClaimsActualsFindUniqueArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimsActuals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimsActualsFindUniqueOrThrowArgs} args - Arguments to find a ClaimsActuals
     * @example
     * // Get one ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimsActualsFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimsActualsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimsActuals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsFindFirstArgs} args - Arguments to find a ClaimsActuals
     * @example
     * // Get one ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimsActualsFindFirstArgs>(args?: SelectSubset<T, ClaimsActualsFindFirstArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimsActuals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsFindFirstOrThrowArgs} args - Arguments to find a ClaimsActuals
     * @example
     * // Get one ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimsActualsFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimsActualsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimsActuals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findMany()
     * 
     * // Get first 10 ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimsActualsWithIdOnly = await prisma.claimsActuals.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimsActualsFindManyArgs>(args?: SelectSubset<T, ClaimsActualsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimsActuals.
     * @param {ClaimsActualsCreateArgs} args - Arguments to create a ClaimsActuals.
     * @example
     * // Create one ClaimsActuals
     * const ClaimsActuals = await prisma.claimsActuals.create({
     *   data: {
     *     // ... data to create a ClaimsActuals
     *   }
     * })
     * 
     */
    create<T extends ClaimsActualsCreateArgs>(args: SelectSubset<T, ClaimsActualsCreateArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimsActuals.
     * @param {ClaimsActualsCreateManyArgs} args - Arguments to create many ClaimsActuals.
     * @example
     * // Create many ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimsActualsCreateManyArgs>(args?: SelectSubset<T, ClaimsActualsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimsActuals and returns the data saved in the database.
     * @param {ClaimsActualsCreateManyAndReturnArgs} args - Arguments to create many ClaimsActuals.
     * @example
     * // Create many ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimsActuals and only return the `id`
     * const claimsActualsWithIdOnly = await prisma.claimsActuals.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimsActualsCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimsActualsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimsActuals.
     * @param {ClaimsActualsDeleteArgs} args - Arguments to delete one ClaimsActuals.
     * @example
     * // Delete one ClaimsActuals
     * const ClaimsActuals = await prisma.claimsActuals.delete({
     *   where: {
     *     // ... filter to delete one ClaimsActuals
     *   }
     * })
     * 
     */
    delete<T extends ClaimsActualsDeleteArgs>(args: SelectSubset<T, ClaimsActualsDeleteArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimsActuals.
     * @param {ClaimsActualsUpdateArgs} args - Arguments to update one ClaimsActuals.
     * @example
     * // Update one ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimsActualsUpdateArgs>(args: SelectSubset<T, ClaimsActualsUpdateArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimsActuals.
     * @param {ClaimsActualsDeleteManyArgs} args - Arguments to filter ClaimsActuals to delete.
     * @example
     * // Delete a few ClaimsActuals
     * const { count } = await prisma.claimsActuals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimsActualsDeleteManyArgs>(args?: SelectSubset<T, ClaimsActualsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimsActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimsActualsUpdateManyArgs>(args: SelectSubset<T, ClaimsActualsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimsActuals and returns the data updated in the database.
     * @param {ClaimsActualsUpdateManyAndReturnArgs} args - Arguments to update many ClaimsActuals.
     * @example
     * // Update many ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimsActuals and only return the `id`
     * const claimsActualsWithIdOnly = await prisma.claimsActuals.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaimsActualsUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimsActualsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimsActuals.
     * @param {ClaimsActualsUpsertArgs} args - Arguments to update or create a ClaimsActuals.
     * @example
     * // Update or create a ClaimsActuals
     * const claimsActuals = await prisma.claimsActuals.upsert({
     *   create: {
     *     // ... data to create a ClaimsActuals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimsActuals we want to update
     *   }
     * })
     */
    upsert<T extends ClaimsActualsUpsertArgs>(args: SelectSubset<T, ClaimsActualsUpsertArgs<ExtArgs>>): Prisma__ClaimsActualsClient<$Result.GetResult<Prisma.$ClaimsActualsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimsActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsCountArgs} args - Arguments to filter ClaimsActuals to count.
     * @example
     * // Count the number of ClaimsActuals
     * const count = await prisma.claimsActuals.count({
     *   where: {
     *     // ... the filter for the ClaimsActuals we want to count
     *   }
     * })
    **/
    count<T extends ClaimsActualsCountArgs>(
      args?: Subset<T, ClaimsActualsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimsActualsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimsActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimsActualsAggregateArgs>(args: Subset<T, ClaimsActualsAggregateArgs>): Prisma.PrismaPromise<GetClaimsActualsAggregateType<T>>

    /**
     * Group by ClaimsActuals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimsActualsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimsActualsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimsActualsGroupByArgs['orderBy'] }
        : { orderBy?: ClaimsActualsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimsActualsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimsActualsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimsActuals model
   */
  readonly fields: ClaimsActualsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimsActuals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimsActualsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaimsActuals model
   */
  interface ClaimsActualsFieldRefs {
    readonly id: FieldRef<"ClaimsActuals", 'String'>
    readonly year: FieldRef<"ClaimsActuals", 'Int'>
    readonly month: FieldRef<"ClaimsActuals", 'Int'>
    readonly branchNumber: FieldRef<"ClaimsActuals", 'Int'>
    readonly underwritingYear: FieldRef<"ClaimsActuals", 'Int'>
    readonly lossYear: FieldRef<"ClaimsActuals", 'Int'>
    readonly claimsPaidGross: FieldRef<"ClaimsActuals", 'Float'>
    readonly claimsPaidRi: FieldRef<"ClaimsActuals", 'Float'>
    readonly updatedAt: FieldRef<"ClaimsActuals", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaimsActuals findUnique
   */
  export type ClaimsActualsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter, which ClaimsActuals to fetch.
     */
    where: ClaimsActualsWhereUniqueInput
  }

  /**
   * ClaimsActuals findUniqueOrThrow
   */
  export type ClaimsActualsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter, which ClaimsActuals to fetch.
     */
    where: ClaimsActualsWhereUniqueInput
  }

  /**
   * ClaimsActuals findFirst
   */
  export type ClaimsActualsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter, which ClaimsActuals to fetch.
     */
    where?: ClaimsActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimsActuals to fetch.
     */
    orderBy?: ClaimsActualsOrderByWithRelationInput | ClaimsActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimsActuals.
     */
    cursor?: ClaimsActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimsActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimsActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimsActuals.
     */
    distinct?: ClaimsActualsScalarFieldEnum | ClaimsActualsScalarFieldEnum[]
  }

  /**
   * ClaimsActuals findFirstOrThrow
   */
  export type ClaimsActualsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter, which ClaimsActuals to fetch.
     */
    where?: ClaimsActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimsActuals to fetch.
     */
    orderBy?: ClaimsActualsOrderByWithRelationInput | ClaimsActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimsActuals.
     */
    cursor?: ClaimsActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimsActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimsActuals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimsActuals.
     */
    distinct?: ClaimsActualsScalarFieldEnum | ClaimsActualsScalarFieldEnum[]
  }

  /**
   * ClaimsActuals findMany
   */
  export type ClaimsActualsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter, which ClaimsActuals to fetch.
     */
    where?: ClaimsActualsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimsActuals to fetch.
     */
    orderBy?: ClaimsActualsOrderByWithRelationInput | ClaimsActualsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimsActuals.
     */
    cursor?: ClaimsActualsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimsActuals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimsActuals.
     */
    skip?: number
    distinct?: ClaimsActualsScalarFieldEnum | ClaimsActualsScalarFieldEnum[]
  }

  /**
   * ClaimsActuals create
   */
  export type ClaimsActualsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * The data needed to create a ClaimsActuals.
     */
    data: XOR<ClaimsActualsCreateInput, ClaimsActualsUncheckedCreateInput>
  }

  /**
   * ClaimsActuals createMany
   */
  export type ClaimsActualsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimsActuals.
     */
    data: ClaimsActualsCreateManyInput | ClaimsActualsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimsActuals createManyAndReturn
   */
  export type ClaimsActualsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimsActuals.
     */
    data: ClaimsActualsCreateManyInput | ClaimsActualsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimsActuals update
   */
  export type ClaimsActualsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * The data needed to update a ClaimsActuals.
     */
    data: XOR<ClaimsActualsUpdateInput, ClaimsActualsUncheckedUpdateInput>
    /**
     * Choose, which ClaimsActuals to update.
     */
    where: ClaimsActualsWhereUniqueInput
  }

  /**
   * ClaimsActuals updateMany
   */
  export type ClaimsActualsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimsActuals.
     */
    data: XOR<ClaimsActualsUpdateManyMutationInput, ClaimsActualsUncheckedUpdateManyInput>
    /**
     * Filter which ClaimsActuals to update
     */
    where?: ClaimsActualsWhereInput
    /**
     * Limit how many ClaimsActuals to update.
     */
    limit?: number
  }

  /**
   * ClaimsActuals updateManyAndReturn
   */
  export type ClaimsActualsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * The data used to update ClaimsActuals.
     */
    data: XOR<ClaimsActualsUpdateManyMutationInput, ClaimsActualsUncheckedUpdateManyInput>
    /**
     * Filter which ClaimsActuals to update
     */
    where?: ClaimsActualsWhereInput
    /**
     * Limit how many ClaimsActuals to update.
     */
    limit?: number
  }

  /**
   * ClaimsActuals upsert
   */
  export type ClaimsActualsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * The filter to search for the ClaimsActuals to update in case it exists.
     */
    where: ClaimsActualsWhereUniqueInput
    /**
     * In case the ClaimsActuals found by the `where` argument doesn't exist, create a new ClaimsActuals with this data.
     */
    create: XOR<ClaimsActualsCreateInput, ClaimsActualsUncheckedCreateInput>
    /**
     * In case the ClaimsActuals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimsActualsUpdateInput, ClaimsActualsUncheckedUpdateInput>
  }

  /**
   * ClaimsActuals delete
   */
  export type ClaimsActualsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
    /**
     * Filter which ClaimsActuals to delete.
     */
    where: ClaimsActualsWhereUniqueInput
  }

  /**
   * ClaimsActuals deleteMany
   */
  export type ClaimsActualsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimsActuals to delete
     */
    where?: ClaimsActualsWhereInput
    /**
     * Limit how many ClaimsActuals to delete.
     */
    limit?: number
  }

  /**
   * ClaimsActuals without action
   */
  export type ClaimsActualsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimsActuals
     */
    select?: ClaimsActualsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimsActuals
     */
    omit?: ClaimsActualsOmit<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchAvgAggregateOutputType = {
    branchNumber: number | null
  }

  export type BranchSumAggregateOutputType = {
    branchNumber: number | null
  }

  export type BranchMinAggregateOutputType = {
    branchNumber: number | null
    branchName: string | null
    groupCode: string | null
    groupName: string | null
    updatedAt: Date | null
  }

  export type BranchMaxAggregateOutputType = {
    branchNumber: number | null
    branchName: string | null
    groupCode: string | null
    groupName: string | null
    updatedAt: Date | null
  }

  export type BranchCountAggregateOutputType = {
    branchNumber: number
    branchName: number
    groupCode: number
    groupName: number
    updatedAt: number
    _all: number
  }


  export type BranchAvgAggregateInputType = {
    branchNumber?: true
  }

  export type BranchSumAggregateInputType = {
    branchNumber?: true
  }

  export type BranchMinAggregateInputType = {
    branchNumber?: true
    branchName?: true
    groupCode?: true
    groupName?: true
    updatedAt?: true
  }

  export type BranchMaxAggregateInputType = {
    branchNumber?: true
    branchName?: true
    groupCode?: true
    groupName?: true
    updatedAt?: true
  }

  export type BranchCountAggregateInputType = {
    branchNumber?: true
    branchName?: true
    groupCode?: true
    groupName?: true
    updatedAt?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BranchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BranchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _avg?: BranchAvgAggregateInputType
    _sum?: BranchSumAggregateInputType
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    branchNumber: number
    branchName: string
    groupCode: string
    groupName: string
    updatedAt: Date
    _count: BranchCountAggregateOutputType | null
    _avg: BranchAvgAggregateOutputType | null
    _sum: BranchSumAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branchNumber?: boolean
    branchName?: boolean
    groupCode?: boolean
    groupName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branchNumber?: boolean
    branchName?: boolean
    groupCode?: boolean
    groupName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    branchNumber?: boolean
    branchName?: boolean
    groupCode?: boolean
    groupName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    branchNumber?: boolean
    branchName?: boolean
    groupCode?: boolean
    groupName?: boolean
    updatedAt?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"branchNumber" | "branchName" | "groupCode" | "groupName" | "updatedAt", ExtArgs["result"]["branch"]>

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      branchNumber: number
      branchName: string
      groupCode: string
      groupName: string
      updatedAt: Date
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `branchNumber`
     * const branchWithBranchNumberOnly = await prisma.branch.findMany({ select: { branchNumber: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `branchNumber`
     * const branchWithBranchNumberOnly = await prisma.branch.createManyAndReturn({
     *   select: { branchNumber: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `branchNumber`
     * const branchWithBranchNumberOnly = await prisma.branch.updateManyAndReturn({
     *   select: { branchNumber: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly branchNumber: FieldRef<"Branch", 'Int'>
    readonly branchName: FieldRef<"Branch", 'String'>
    readonly groupCode: FieldRef<"Branch", 'String'>
    readonly groupName: FieldRef<"Branch", 'String'>
    readonly updatedAt: FieldRef<"Branch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
  }


  /**
   * Model AdminExpense
   */

  export type AggregateAdminExpense = {
    _count: AdminExpenseCountAggregateOutputType | null
    _avg: AdminExpenseAvgAggregateOutputType | null
    _sum: AdminExpenseSumAggregateOutputType | null
    _min: AdminExpenseMinAggregateOutputType | null
    _max: AdminExpenseMaxAggregateOutputType | null
  }

  export type AdminExpenseAvgAggregateOutputType = {
    year: number | null
    month: number | null
    premiumExpense: number | null
    claimsExpense: number | null
  }

  export type AdminExpenseSumAggregateOutputType = {
    year: number | null
    month: number | null
    premiumExpense: number | null
    claimsExpense: number | null
  }

  export type AdminExpenseMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    premiumExpense: number | null
    claimsExpense: number | null
    description: string | null
    updatedAt: Date | null
  }

  export type AdminExpenseMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    premiumExpense: number | null
    claimsExpense: number | null
    description: string | null
    updatedAt: Date | null
  }

  export type AdminExpenseCountAggregateOutputType = {
    id: number
    year: number
    month: number
    premiumExpense: number
    claimsExpense: number
    description: number
    updatedAt: number
    _all: number
  }


  export type AdminExpenseAvgAggregateInputType = {
    year?: true
    month?: true
    premiumExpense?: true
    claimsExpense?: true
  }

  export type AdminExpenseSumAggregateInputType = {
    year?: true
    month?: true
    premiumExpense?: true
    claimsExpense?: true
  }

  export type AdminExpenseMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    premiumExpense?: true
    claimsExpense?: true
    description?: true
    updatedAt?: true
  }

  export type AdminExpenseMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    premiumExpense?: true
    claimsExpense?: true
    description?: true
    updatedAt?: true
  }

  export type AdminExpenseCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    premiumExpense?: true
    claimsExpense?: true
    description?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminExpense to aggregate.
     */
    where?: AdminExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenses to fetch.
     */
    orderBy?: AdminExpenseOrderByWithRelationInput | AdminExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminExpenses
    **/
    _count?: true | AdminExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminExpenseMaxAggregateInputType
  }

  export type GetAdminExpenseAggregateType<T extends AdminExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminExpense[P]>
      : GetScalarType<T[P], AggregateAdminExpense[P]>
  }




  export type AdminExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminExpenseWhereInput
    orderBy?: AdminExpenseOrderByWithAggregationInput | AdminExpenseOrderByWithAggregationInput[]
    by: AdminExpenseScalarFieldEnum[] | AdminExpenseScalarFieldEnum
    having?: AdminExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminExpenseCountAggregateInputType | true
    _avg?: AdminExpenseAvgAggregateInputType
    _sum?: AdminExpenseSumAggregateInputType
    _min?: AdminExpenseMinAggregateInputType
    _max?: AdminExpenseMaxAggregateInputType
  }

  export type AdminExpenseGroupByOutputType = {
    id: string
    year: number
    month: number
    premiumExpense: number
    claimsExpense: number
    description: string | null
    updatedAt: Date
    _count: AdminExpenseCountAggregateOutputType | null
    _avg: AdminExpenseAvgAggregateOutputType | null
    _sum: AdminExpenseSumAggregateOutputType | null
    _min: AdminExpenseMinAggregateOutputType | null
    _max: AdminExpenseMaxAggregateOutputType | null
  }

  type GetAdminExpenseGroupByPayload<T extends AdminExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], AdminExpenseGroupByOutputType[P]>
        }
      >
    >


  export type AdminExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    premiumExpense?: boolean
    claimsExpense?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpense"]>

  export type AdminExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    premiumExpense?: boolean
    claimsExpense?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpense"]>

  export type AdminExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    premiumExpense?: boolean
    claimsExpense?: boolean
    description?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminExpense"]>

  export type AdminExpenseSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    premiumExpense?: boolean
    claimsExpense?: boolean
    description?: boolean
    updatedAt?: boolean
  }

  export type AdminExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "premiumExpense" | "claimsExpense" | "description" | "updatedAt", ExtArgs["result"]["adminExpense"]>

  export type $AdminExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminExpense"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      premiumExpense: number
      claimsExpense: number
      description: string | null
      updatedAt: Date
    }, ExtArgs["result"]["adminExpense"]>
    composites: {}
  }

  type AdminExpenseGetPayload<S extends boolean | null | undefined | AdminExpenseDefaultArgs> = $Result.GetResult<Prisma.$AdminExpensePayload, S>

  type AdminExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminExpenseCountAggregateInputType | true
    }

  export interface AdminExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminExpense'], meta: { name: 'AdminExpense' } }
    /**
     * Find zero or one AdminExpense that matches the filter.
     * @param {AdminExpenseFindUniqueArgs} args - Arguments to find a AdminExpense
     * @example
     * // Get one AdminExpense
     * const adminExpense = await prisma.adminExpense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminExpenseFindUniqueArgs>(args: SelectSubset<T, AdminExpenseFindUniqueArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminExpense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminExpenseFindUniqueOrThrowArgs} args - Arguments to find a AdminExpense
     * @example
     * // Get one AdminExpense
     * const adminExpense = await prisma.adminExpense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminExpense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseFindFirstArgs} args - Arguments to find a AdminExpense
     * @example
     * // Get one AdminExpense
     * const adminExpense = await prisma.adminExpense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminExpenseFindFirstArgs>(args?: SelectSubset<T, AdminExpenseFindFirstArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminExpense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseFindFirstOrThrowArgs} args - Arguments to find a AdminExpense
     * @example
     * // Get one AdminExpense
     * const adminExpense = await prisma.adminExpense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminExpenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminExpenses
     * const adminExpenses = await prisma.adminExpense.findMany()
     * 
     * // Get first 10 AdminExpenses
     * const adminExpenses = await prisma.adminExpense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminExpenseWithIdOnly = await prisma.adminExpense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminExpenseFindManyArgs>(args?: SelectSubset<T, AdminExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminExpense.
     * @param {AdminExpenseCreateArgs} args - Arguments to create a AdminExpense.
     * @example
     * // Create one AdminExpense
     * const AdminExpense = await prisma.adminExpense.create({
     *   data: {
     *     // ... data to create a AdminExpense
     *   }
     * })
     * 
     */
    create<T extends AdminExpenseCreateArgs>(args: SelectSubset<T, AdminExpenseCreateArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminExpenses.
     * @param {AdminExpenseCreateManyArgs} args - Arguments to create many AdminExpenses.
     * @example
     * // Create many AdminExpenses
     * const adminExpense = await prisma.adminExpense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminExpenseCreateManyArgs>(args?: SelectSubset<T, AdminExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminExpenses and returns the data saved in the database.
     * @param {AdminExpenseCreateManyAndReturnArgs} args - Arguments to create many AdminExpenses.
     * @example
     * // Create many AdminExpenses
     * const adminExpense = await prisma.adminExpense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminExpenses and only return the `id`
     * const adminExpenseWithIdOnly = await prisma.adminExpense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminExpense.
     * @param {AdminExpenseDeleteArgs} args - Arguments to delete one AdminExpense.
     * @example
     * // Delete one AdminExpense
     * const AdminExpense = await prisma.adminExpense.delete({
     *   where: {
     *     // ... filter to delete one AdminExpense
     *   }
     * })
     * 
     */
    delete<T extends AdminExpenseDeleteArgs>(args: SelectSubset<T, AdminExpenseDeleteArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminExpense.
     * @param {AdminExpenseUpdateArgs} args - Arguments to update one AdminExpense.
     * @example
     * // Update one AdminExpense
     * const adminExpense = await prisma.adminExpense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminExpenseUpdateArgs>(args: SelectSubset<T, AdminExpenseUpdateArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminExpenses.
     * @param {AdminExpenseDeleteManyArgs} args - Arguments to filter AdminExpenses to delete.
     * @example
     * // Delete a few AdminExpenses
     * const { count } = await prisma.adminExpense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminExpenseDeleteManyArgs>(args?: SelectSubset<T, AdminExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminExpenses
     * const adminExpense = await prisma.adminExpense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminExpenseUpdateManyArgs>(args: SelectSubset<T, AdminExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminExpenses and returns the data updated in the database.
     * @param {AdminExpenseUpdateManyAndReturnArgs} args - Arguments to update many AdminExpenses.
     * @example
     * // Update many AdminExpenses
     * const adminExpense = await prisma.adminExpense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminExpenses and only return the `id`
     * const adminExpenseWithIdOnly = await prisma.adminExpense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminExpense.
     * @param {AdminExpenseUpsertArgs} args - Arguments to update or create a AdminExpense.
     * @example
     * // Update or create a AdminExpense
     * const adminExpense = await prisma.adminExpense.upsert({
     *   create: {
     *     // ... data to create a AdminExpense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminExpense we want to update
     *   }
     * })
     */
    upsert<T extends AdminExpenseUpsertArgs>(args: SelectSubset<T, AdminExpenseUpsertArgs<ExtArgs>>): Prisma__AdminExpenseClient<$Result.GetResult<Prisma.$AdminExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminExpenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseCountArgs} args - Arguments to filter AdminExpenses to count.
     * @example
     * // Count the number of AdminExpenses
     * const count = await prisma.adminExpense.count({
     *   where: {
     *     // ... the filter for the AdminExpenses we want to count
     *   }
     * })
    **/
    count<T extends AdminExpenseCountArgs>(
      args?: Subset<T, AdminExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminExpenseAggregateArgs>(args: Subset<T, AdminExpenseAggregateArgs>): Prisma.PrismaPromise<GetAdminExpenseAggregateType<T>>

    /**
     * Group by AdminExpense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminExpenseGroupByArgs['orderBy'] }
        : { orderBy?: AdminExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminExpense model
   */
  readonly fields: AdminExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminExpense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminExpense model
   */
  interface AdminExpenseFieldRefs {
    readonly id: FieldRef<"AdminExpense", 'String'>
    readonly year: FieldRef<"AdminExpense", 'Int'>
    readonly month: FieldRef<"AdminExpense", 'Int'>
    readonly premiumExpense: FieldRef<"AdminExpense", 'Float'>
    readonly claimsExpense: FieldRef<"AdminExpense", 'Float'>
    readonly description: FieldRef<"AdminExpense", 'String'>
    readonly updatedAt: FieldRef<"AdminExpense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminExpense findUnique
   */
  export type AdminExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpense to fetch.
     */
    where: AdminExpenseWhereUniqueInput
  }

  /**
   * AdminExpense findUniqueOrThrow
   */
  export type AdminExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpense to fetch.
     */
    where: AdminExpenseWhereUniqueInput
  }

  /**
   * AdminExpense findFirst
   */
  export type AdminExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpense to fetch.
     */
    where?: AdminExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenses to fetch.
     */
    orderBy?: AdminExpenseOrderByWithRelationInput | AdminExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminExpenses.
     */
    cursor?: AdminExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminExpenses.
     */
    distinct?: AdminExpenseScalarFieldEnum | AdminExpenseScalarFieldEnum[]
  }

  /**
   * AdminExpense findFirstOrThrow
   */
  export type AdminExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpense to fetch.
     */
    where?: AdminExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenses to fetch.
     */
    orderBy?: AdminExpenseOrderByWithRelationInput | AdminExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminExpenses.
     */
    cursor?: AdminExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminExpenses.
     */
    distinct?: AdminExpenseScalarFieldEnum | AdminExpenseScalarFieldEnum[]
  }

  /**
   * AdminExpense findMany
   */
  export type AdminExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter, which AdminExpenses to fetch.
     */
    where?: AdminExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminExpenses to fetch.
     */
    orderBy?: AdminExpenseOrderByWithRelationInput | AdminExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminExpenses.
     */
    cursor?: AdminExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminExpenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminExpenses.
     */
    skip?: number
    distinct?: AdminExpenseScalarFieldEnum | AdminExpenseScalarFieldEnum[]
  }

  /**
   * AdminExpense create
   */
  export type AdminExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminExpense.
     */
    data: XOR<AdminExpenseCreateInput, AdminExpenseUncheckedCreateInput>
  }

  /**
   * AdminExpense createMany
   */
  export type AdminExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminExpenses.
     */
    data: AdminExpenseCreateManyInput | AdminExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminExpense createManyAndReturn
   */
  export type AdminExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many AdminExpenses.
     */
    data: AdminExpenseCreateManyInput | AdminExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminExpense update
   */
  export type AdminExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminExpense.
     */
    data: XOR<AdminExpenseUpdateInput, AdminExpenseUncheckedUpdateInput>
    /**
     * Choose, which AdminExpense to update.
     */
    where: AdminExpenseWhereUniqueInput
  }

  /**
   * AdminExpense updateMany
   */
  export type AdminExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminExpenses.
     */
    data: XOR<AdminExpenseUpdateManyMutationInput, AdminExpenseUncheckedUpdateManyInput>
    /**
     * Filter which AdminExpenses to update
     */
    where?: AdminExpenseWhereInput
    /**
     * Limit how many AdminExpenses to update.
     */
    limit?: number
  }

  /**
   * AdminExpense updateManyAndReturn
   */
  export type AdminExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * The data used to update AdminExpenses.
     */
    data: XOR<AdminExpenseUpdateManyMutationInput, AdminExpenseUncheckedUpdateManyInput>
    /**
     * Filter which AdminExpenses to update
     */
    where?: AdminExpenseWhereInput
    /**
     * Limit how many AdminExpenses to update.
     */
    limit?: number
  }

  /**
   * AdminExpense upsert
   */
  export type AdminExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminExpense to update in case it exists.
     */
    where: AdminExpenseWhereUniqueInput
    /**
     * In case the AdminExpense found by the `where` argument doesn't exist, create a new AdminExpense with this data.
     */
    create: XOR<AdminExpenseCreateInput, AdminExpenseUncheckedCreateInput>
    /**
     * In case the AdminExpense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminExpenseUpdateInput, AdminExpenseUncheckedUpdateInput>
  }

  /**
   * AdminExpense delete
   */
  export type AdminExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
    /**
     * Filter which AdminExpense to delete.
     */
    where: AdminExpenseWhereUniqueInput
  }

  /**
   * AdminExpense deleteMany
   */
  export type AdminExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminExpenses to delete
     */
    where?: AdminExpenseWhereInput
    /**
     * Limit how many AdminExpenses to delete.
     */
    limit?: number
  }

  /**
   * AdminExpense without action
   */
  export type AdminExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminExpense
     */
    select?: AdminExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminExpense
     */
    omit?: AdminExpenseOmit<ExtArgs> | null
  }


  /**
   * Model ActuarialEstimate
   */

  export type AggregateActuarialEstimate = {
    _count: ActuarialEstimateCountAggregateOutputType | null
    _avg: ActuarialEstimateAvgAggregateOutputType | null
    _sum: ActuarialEstimateSumAggregateOutputType | null
    _min: ActuarialEstimateMinAggregateOutputType | null
    _max: ActuarialEstimateMaxAggregateOutputType | null
  }

  export type ActuarialEstimateAvgAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    outstandingClaimsGross: number | null
    outstandingClaimsRi: number | null
    ibnrGross: number | null
    ibnrRi: number | null
    actuarialEstimateGross: number | null
    actuarialEstimateRi: number | null
  }

  export type ActuarialEstimateSumAggregateOutputType = {
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    outstandingClaimsGross: number | null
    outstandingClaimsRi: number | null
    ibnrGross: number | null
    ibnrRi: number | null
    actuarialEstimateGross: number | null
    actuarialEstimateRi: number | null
  }

  export type ActuarialEstimateMinAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    outstandingClaimsGross: number | null
    outstandingClaimsRi: number | null
    ibnrGross: number | null
    ibnrRi: number | null
    actuarialEstimateGross: number | null
    actuarialEstimateRi: number | null
    updatedAt: Date | null
  }

  export type ActuarialEstimateMaxAggregateOutputType = {
    id: string | null
    year: number | null
    month: number | null
    branchNumber: number | null
    underwritingYear: number | null
    lossYear: number | null
    outstandingClaimsGross: number | null
    outstandingClaimsRi: number | null
    ibnrGross: number | null
    ibnrRi: number | null
    actuarialEstimateGross: number | null
    actuarialEstimateRi: number | null
    updatedAt: Date | null
  }

  export type ActuarialEstimateCountAggregateOutputType = {
    id: number
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    outstandingClaimsGross: number
    outstandingClaimsRi: number
    ibnrGross: number
    ibnrRi: number
    actuarialEstimateGross: number
    actuarialEstimateRi: number
    updatedAt: number
    _all: number
  }


  export type ActuarialEstimateAvgAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    outstandingClaimsGross?: true
    outstandingClaimsRi?: true
    ibnrGross?: true
    ibnrRi?: true
    actuarialEstimateGross?: true
    actuarialEstimateRi?: true
  }

  export type ActuarialEstimateSumAggregateInputType = {
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    outstandingClaimsGross?: true
    outstandingClaimsRi?: true
    ibnrGross?: true
    ibnrRi?: true
    actuarialEstimateGross?: true
    actuarialEstimateRi?: true
  }

  export type ActuarialEstimateMinAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    outstandingClaimsGross?: true
    outstandingClaimsRi?: true
    ibnrGross?: true
    ibnrRi?: true
    actuarialEstimateGross?: true
    actuarialEstimateRi?: true
    updatedAt?: true
  }

  export type ActuarialEstimateMaxAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    outstandingClaimsGross?: true
    outstandingClaimsRi?: true
    ibnrGross?: true
    ibnrRi?: true
    actuarialEstimateGross?: true
    actuarialEstimateRi?: true
    updatedAt?: true
  }

  export type ActuarialEstimateCountAggregateInputType = {
    id?: true
    year?: true
    month?: true
    branchNumber?: true
    underwritingYear?: true
    lossYear?: true
    outstandingClaimsGross?: true
    outstandingClaimsRi?: true
    ibnrGross?: true
    ibnrRi?: true
    actuarialEstimateGross?: true
    actuarialEstimateRi?: true
    updatedAt?: true
    _all?: true
  }

  export type ActuarialEstimateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActuarialEstimate to aggregate.
     */
    where?: ActuarialEstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActuarialEstimates to fetch.
     */
    orderBy?: ActuarialEstimateOrderByWithRelationInput | ActuarialEstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActuarialEstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActuarialEstimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActuarialEstimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActuarialEstimates
    **/
    _count?: true | ActuarialEstimateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActuarialEstimateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActuarialEstimateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActuarialEstimateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActuarialEstimateMaxAggregateInputType
  }

  export type GetActuarialEstimateAggregateType<T extends ActuarialEstimateAggregateArgs> = {
        [P in keyof T & keyof AggregateActuarialEstimate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActuarialEstimate[P]>
      : GetScalarType<T[P], AggregateActuarialEstimate[P]>
  }




  export type ActuarialEstimateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActuarialEstimateWhereInput
    orderBy?: ActuarialEstimateOrderByWithAggregationInput | ActuarialEstimateOrderByWithAggregationInput[]
    by: ActuarialEstimateScalarFieldEnum[] | ActuarialEstimateScalarFieldEnum
    having?: ActuarialEstimateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActuarialEstimateCountAggregateInputType | true
    _avg?: ActuarialEstimateAvgAggregateInputType
    _sum?: ActuarialEstimateSumAggregateInputType
    _min?: ActuarialEstimateMinAggregateInputType
    _max?: ActuarialEstimateMaxAggregateInputType
  }

  export type ActuarialEstimateGroupByOutputType = {
    id: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    outstandingClaimsGross: number
    outstandingClaimsRi: number
    ibnrGross: number
    ibnrRi: number
    actuarialEstimateGross: number
    actuarialEstimateRi: number
    updatedAt: Date
    _count: ActuarialEstimateCountAggregateOutputType | null
    _avg: ActuarialEstimateAvgAggregateOutputType | null
    _sum: ActuarialEstimateSumAggregateOutputType | null
    _min: ActuarialEstimateMinAggregateOutputType | null
    _max: ActuarialEstimateMaxAggregateOutputType | null
  }

  type GetActuarialEstimateGroupByPayload<T extends ActuarialEstimateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActuarialEstimateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActuarialEstimateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActuarialEstimateGroupByOutputType[P]>
            : GetScalarType<T[P], ActuarialEstimateGroupByOutputType[P]>
        }
      >
    >


  export type ActuarialEstimateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    outstandingClaimsGross?: boolean
    outstandingClaimsRi?: boolean
    ibnrGross?: boolean
    ibnrRi?: boolean
    actuarialEstimateGross?: boolean
    actuarialEstimateRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["actuarialEstimate"]>

  export type ActuarialEstimateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    outstandingClaimsGross?: boolean
    outstandingClaimsRi?: boolean
    ibnrGross?: boolean
    ibnrRi?: boolean
    actuarialEstimateGross?: boolean
    actuarialEstimateRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["actuarialEstimate"]>

  export type ActuarialEstimateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    outstandingClaimsGross?: boolean
    outstandingClaimsRi?: boolean
    ibnrGross?: boolean
    ibnrRi?: boolean
    actuarialEstimateGross?: boolean
    actuarialEstimateRi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["actuarialEstimate"]>

  export type ActuarialEstimateSelectScalar = {
    id?: boolean
    year?: boolean
    month?: boolean
    branchNumber?: boolean
    underwritingYear?: boolean
    lossYear?: boolean
    outstandingClaimsGross?: boolean
    outstandingClaimsRi?: boolean
    ibnrGross?: boolean
    ibnrRi?: boolean
    actuarialEstimateGross?: boolean
    actuarialEstimateRi?: boolean
    updatedAt?: boolean
  }

  export type ActuarialEstimateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "month" | "branchNumber" | "underwritingYear" | "lossYear" | "outstandingClaimsGross" | "outstandingClaimsRi" | "ibnrGross" | "ibnrRi" | "actuarialEstimateGross" | "actuarialEstimateRi" | "updatedAt", ExtArgs["result"]["actuarialEstimate"]>

  export type $ActuarialEstimatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActuarialEstimate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: number
      month: number
      branchNumber: number
      underwritingYear: number
      lossYear: number
      outstandingClaimsGross: number
      outstandingClaimsRi: number
      ibnrGross: number
      ibnrRi: number
      actuarialEstimateGross: number
      actuarialEstimateRi: number
      updatedAt: Date
    }, ExtArgs["result"]["actuarialEstimate"]>
    composites: {}
  }

  type ActuarialEstimateGetPayload<S extends boolean | null | undefined | ActuarialEstimateDefaultArgs> = $Result.GetResult<Prisma.$ActuarialEstimatePayload, S>

  type ActuarialEstimateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActuarialEstimateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActuarialEstimateCountAggregateInputType | true
    }

  export interface ActuarialEstimateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActuarialEstimate'], meta: { name: 'ActuarialEstimate' } }
    /**
     * Find zero or one ActuarialEstimate that matches the filter.
     * @param {ActuarialEstimateFindUniqueArgs} args - Arguments to find a ActuarialEstimate
     * @example
     * // Get one ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActuarialEstimateFindUniqueArgs>(args: SelectSubset<T, ActuarialEstimateFindUniqueArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActuarialEstimate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActuarialEstimateFindUniqueOrThrowArgs} args - Arguments to find a ActuarialEstimate
     * @example
     * // Get one ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActuarialEstimateFindUniqueOrThrowArgs>(args: SelectSubset<T, ActuarialEstimateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActuarialEstimate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateFindFirstArgs} args - Arguments to find a ActuarialEstimate
     * @example
     * // Get one ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActuarialEstimateFindFirstArgs>(args?: SelectSubset<T, ActuarialEstimateFindFirstArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActuarialEstimate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateFindFirstOrThrowArgs} args - Arguments to find a ActuarialEstimate
     * @example
     * // Get one ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActuarialEstimateFindFirstOrThrowArgs>(args?: SelectSubset<T, ActuarialEstimateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActuarialEstimates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActuarialEstimates
     * const actuarialEstimates = await prisma.actuarialEstimate.findMany()
     * 
     * // Get first 10 ActuarialEstimates
     * const actuarialEstimates = await prisma.actuarialEstimate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actuarialEstimateWithIdOnly = await prisma.actuarialEstimate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActuarialEstimateFindManyArgs>(args?: SelectSubset<T, ActuarialEstimateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActuarialEstimate.
     * @param {ActuarialEstimateCreateArgs} args - Arguments to create a ActuarialEstimate.
     * @example
     * // Create one ActuarialEstimate
     * const ActuarialEstimate = await prisma.actuarialEstimate.create({
     *   data: {
     *     // ... data to create a ActuarialEstimate
     *   }
     * })
     * 
     */
    create<T extends ActuarialEstimateCreateArgs>(args: SelectSubset<T, ActuarialEstimateCreateArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActuarialEstimates.
     * @param {ActuarialEstimateCreateManyArgs} args - Arguments to create many ActuarialEstimates.
     * @example
     * // Create many ActuarialEstimates
     * const actuarialEstimate = await prisma.actuarialEstimate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActuarialEstimateCreateManyArgs>(args?: SelectSubset<T, ActuarialEstimateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActuarialEstimates and returns the data saved in the database.
     * @param {ActuarialEstimateCreateManyAndReturnArgs} args - Arguments to create many ActuarialEstimates.
     * @example
     * // Create many ActuarialEstimates
     * const actuarialEstimate = await prisma.actuarialEstimate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActuarialEstimates and only return the `id`
     * const actuarialEstimateWithIdOnly = await prisma.actuarialEstimate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActuarialEstimateCreateManyAndReturnArgs>(args?: SelectSubset<T, ActuarialEstimateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActuarialEstimate.
     * @param {ActuarialEstimateDeleteArgs} args - Arguments to delete one ActuarialEstimate.
     * @example
     * // Delete one ActuarialEstimate
     * const ActuarialEstimate = await prisma.actuarialEstimate.delete({
     *   where: {
     *     // ... filter to delete one ActuarialEstimate
     *   }
     * })
     * 
     */
    delete<T extends ActuarialEstimateDeleteArgs>(args: SelectSubset<T, ActuarialEstimateDeleteArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActuarialEstimate.
     * @param {ActuarialEstimateUpdateArgs} args - Arguments to update one ActuarialEstimate.
     * @example
     * // Update one ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActuarialEstimateUpdateArgs>(args: SelectSubset<T, ActuarialEstimateUpdateArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActuarialEstimates.
     * @param {ActuarialEstimateDeleteManyArgs} args - Arguments to filter ActuarialEstimates to delete.
     * @example
     * // Delete a few ActuarialEstimates
     * const { count } = await prisma.actuarialEstimate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActuarialEstimateDeleteManyArgs>(args?: SelectSubset<T, ActuarialEstimateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActuarialEstimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActuarialEstimates
     * const actuarialEstimate = await prisma.actuarialEstimate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActuarialEstimateUpdateManyArgs>(args: SelectSubset<T, ActuarialEstimateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActuarialEstimates and returns the data updated in the database.
     * @param {ActuarialEstimateUpdateManyAndReturnArgs} args - Arguments to update many ActuarialEstimates.
     * @example
     * // Update many ActuarialEstimates
     * const actuarialEstimate = await prisma.actuarialEstimate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActuarialEstimates and only return the `id`
     * const actuarialEstimateWithIdOnly = await prisma.actuarialEstimate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActuarialEstimateUpdateManyAndReturnArgs>(args: SelectSubset<T, ActuarialEstimateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActuarialEstimate.
     * @param {ActuarialEstimateUpsertArgs} args - Arguments to update or create a ActuarialEstimate.
     * @example
     * // Update or create a ActuarialEstimate
     * const actuarialEstimate = await prisma.actuarialEstimate.upsert({
     *   create: {
     *     // ... data to create a ActuarialEstimate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActuarialEstimate we want to update
     *   }
     * })
     */
    upsert<T extends ActuarialEstimateUpsertArgs>(args: SelectSubset<T, ActuarialEstimateUpsertArgs<ExtArgs>>): Prisma__ActuarialEstimateClient<$Result.GetResult<Prisma.$ActuarialEstimatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActuarialEstimates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateCountArgs} args - Arguments to filter ActuarialEstimates to count.
     * @example
     * // Count the number of ActuarialEstimates
     * const count = await prisma.actuarialEstimate.count({
     *   where: {
     *     // ... the filter for the ActuarialEstimates we want to count
     *   }
     * })
    **/
    count<T extends ActuarialEstimateCountArgs>(
      args?: Subset<T, ActuarialEstimateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActuarialEstimateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActuarialEstimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActuarialEstimateAggregateArgs>(args: Subset<T, ActuarialEstimateAggregateArgs>): Prisma.PrismaPromise<GetActuarialEstimateAggregateType<T>>

    /**
     * Group by ActuarialEstimate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActuarialEstimateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActuarialEstimateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActuarialEstimateGroupByArgs['orderBy'] }
        : { orderBy?: ActuarialEstimateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActuarialEstimateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActuarialEstimateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActuarialEstimate model
   */
  readonly fields: ActuarialEstimateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActuarialEstimate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActuarialEstimateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActuarialEstimate model
   */
  interface ActuarialEstimateFieldRefs {
    readonly id: FieldRef<"ActuarialEstimate", 'String'>
    readonly year: FieldRef<"ActuarialEstimate", 'Int'>
    readonly month: FieldRef<"ActuarialEstimate", 'Int'>
    readonly branchNumber: FieldRef<"ActuarialEstimate", 'Int'>
    readonly underwritingYear: FieldRef<"ActuarialEstimate", 'Int'>
    readonly lossYear: FieldRef<"ActuarialEstimate", 'Int'>
    readonly outstandingClaimsGross: FieldRef<"ActuarialEstimate", 'Float'>
    readonly outstandingClaimsRi: FieldRef<"ActuarialEstimate", 'Float'>
    readonly ibnrGross: FieldRef<"ActuarialEstimate", 'Float'>
    readonly ibnrRi: FieldRef<"ActuarialEstimate", 'Float'>
    readonly actuarialEstimateGross: FieldRef<"ActuarialEstimate", 'Float'>
    readonly actuarialEstimateRi: FieldRef<"ActuarialEstimate", 'Float'>
    readonly updatedAt: FieldRef<"ActuarialEstimate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActuarialEstimate findUnique
   */
  export type ActuarialEstimateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter, which ActuarialEstimate to fetch.
     */
    where: ActuarialEstimateWhereUniqueInput
  }

  /**
   * ActuarialEstimate findUniqueOrThrow
   */
  export type ActuarialEstimateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter, which ActuarialEstimate to fetch.
     */
    where: ActuarialEstimateWhereUniqueInput
  }

  /**
   * ActuarialEstimate findFirst
   */
  export type ActuarialEstimateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter, which ActuarialEstimate to fetch.
     */
    where?: ActuarialEstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActuarialEstimates to fetch.
     */
    orderBy?: ActuarialEstimateOrderByWithRelationInput | ActuarialEstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActuarialEstimates.
     */
    cursor?: ActuarialEstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActuarialEstimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActuarialEstimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActuarialEstimates.
     */
    distinct?: ActuarialEstimateScalarFieldEnum | ActuarialEstimateScalarFieldEnum[]
  }

  /**
   * ActuarialEstimate findFirstOrThrow
   */
  export type ActuarialEstimateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter, which ActuarialEstimate to fetch.
     */
    where?: ActuarialEstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActuarialEstimates to fetch.
     */
    orderBy?: ActuarialEstimateOrderByWithRelationInput | ActuarialEstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActuarialEstimates.
     */
    cursor?: ActuarialEstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActuarialEstimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActuarialEstimates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActuarialEstimates.
     */
    distinct?: ActuarialEstimateScalarFieldEnum | ActuarialEstimateScalarFieldEnum[]
  }

  /**
   * ActuarialEstimate findMany
   */
  export type ActuarialEstimateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter, which ActuarialEstimates to fetch.
     */
    where?: ActuarialEstimateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActuarialEstimates to fetch.
     */
    orderBy?: ActuarialEstimateOrderByWithRelationInput | ActuarialEstimateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActuarialEstimates.
     */
    cursor?: ActuarialEstimateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActuarialEstimates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActuarialEstimates.
     */
    skip?: number
    distinct?: ActuarialEstimateScalarFieldEnum | ActuarialEstimateScalarFieldEnum[]
  }

  /**
   * ActuarialEstimate create
   */
  export type ActuarialEstimateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * The data needed to create a ActuarialEstimate.
     */
    data: XOR<ActuarialEstimateCreateInput, ActuarialEstimateUncheckedCreateInput>
  }

  /**
   * ActuarialEstimate createMany
   */
  export type ActuarialEstimateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActuarialEstimates.
     */
    data: ActuarialEstimateCreateManyInput | ActuarialEstimateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActuarialEstimate createManyAndReturn
   */
  export type ActuarialEstimateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * The data used to create many ActuarialEstimates.
     */
    data: ActuarialEstimateCreateManyInput | ActuarialEstimateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActuarialEstimate update
   */
  export type ActuarialEstimateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * The data needed to update a ActuarialEstimate.
     */
    data: XOR<ActuarialEstimateUpdateInput, ActuarialEstimateUncheckedUpdateInput>
    /**
     * Choose, which ActuarialEstimate to update.
     */
    where: ActuarialEstimateWhereUniqueInput
  }

  /**
   * ActuarialEstimate updateMany
   */
  export type ActuarialEstimateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActuarialEstimates.
     */
    data: XOR<ActuarialEstimateUpdateManyMutationInput, ActuarialEstimateUncheckedUpdateManyInput>
    /**
     * Filter which ActuarialEstimates to update
     */
    where?: ActuarialEstimateWhereInput
    /**
     * Limit how many ActuarialEstimates to update.
     */
    limit?: number
  }

  /**
   * ActuarialEstimate updateManyAndReturn
   */
  export type ActuarialEstimateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * The data used to update ActuarialEstimates.
     */
    data: XOR<ActuarialEstimateUpdateManyMutationInput, ActuarialEstimateUncheckedUpdateManyInput>
    /**
     * Filter which ActuarialEstimates to update
     */
    where?: ActuarialEstimateWhereInput
    /**
     * Limit how many ActuarialEstimates to update.
     */
    limit?: number
  }

  /**
   * ActuarialEstimate upsert
   */
  export type ActuarialEstimateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * The filter to search for the ActuarialEstimate to update in case it exists.
     */
    where: ActuarialEstimateWhereUniqueInput
    /**
     * In case the ActuarialEstimate found by the `where` argument doesn't exist, create a new ActuarialEstimate with this data.
     */
    create: XOR<ActuarialEstimateCreateInput, ActuarialEstimateUncheckedCreateInput>
    /**
     * In case the ActuarialEstimate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActuarialEstimateUpdateInput, ActuarialEstimateUncheckedUpdateInput>
  }

  /**
   * ActuarialEstimate delete
   */
  export type ActuarialEstimateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
    /**
     * Filter which ActuarialEstimate to delete.
     */
    where: ActuarialEstimateWhereUniqueInput
  }

  /**
   * ActuarialEstimate deleteMany
   */
  export type ActuarialEstimateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActuarialEstimates to delete
     */
    where?: ActuarialEstimateWhereInput
    /**
     * Limit how many ActuarialEstimates to delete.
     */
    limit?: number
  }

  /**
   * ActuarialEstimate without action
   */
  export type ActuarialEstimateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActuarialEstimate
     */
    select?: ActuarialEstimateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActuarialEstimate
     */
    omit?: ActuarialEstimateOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PolicyScalarFieldEnum: {
    id: 'id',
    policyNumber: 'policyNumber',
    branchNumber: 'branchNumber',
    premiumAmount: 'premiumAmount',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type PolicyScalarFieldEnum = (typeof PolicyScalarFieldEnum)[keyof typeof PolicyScalarFieldEnum]


  export const UprSnapshotScalarFieldEnum: {
    id: 'id',
    year: 'year',
    period: 'period',
    periodType: 'periodType',
    branchNumber: 'branchNumber',
    originalPremium: 'originalPremium',
    uprValue: 'uprValue',
    dacGross: 'dacGross',
    deferredRIComm: 'deferredRIComm',
    ducNet: 'ducNet',
    calculatedAt: 'calculatedAt'
  };

  export type UprSnapshotScalarFieldEnum = (typeof UprSnapshotScalarFieldEnum)[keyof typeof UprSnapshotScalarFieldEnum]


  export const AdminExpenseAllocationScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    branchNumber: 'branchNumber',
    premiumExpenseShare: 'premiumExpenseShare',
    claimsExpenseShare: 'claimsExpenseShare',
    totalExpenseShare: 'totalExpenseShare',
    recognizedExpense: 'recognizedExpense',
    deferredExpense: 'deferredExpense',
    updatedAt: 'updatedAt'
  };

  export type AdminExpenseAllocationScalarFieldEnum = (typeof AdminExpenseAllocationScalarFieldEnum)[keyof typeof AdminExpenseAllocationScalarFieldEnum]


  export const BranchParametersScalarFieldEnum: {
    id: 'id',
    year: 'year',
    branchNumber: 'branchNumber',
    expectedGrossPremium: 'expectedGrossPremium',
    agentCommPct: 'agentCommPct',
    reinsurancePct: 'reinsurancePct',
    reinsuranceCommPct: 'reinsuranceCommPct',
    expectedLrPct: 'expectedLrPct',
    updatedAt: 'updatedAt'
  };

  export type BranchParametersScalarFieldEnum = (typeof BranchParametersScalarFieldEnum)[keyof typeof BranchParametersScalarFieldEnum]


  export const PremiumActualsScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    branchNumber: 'branchNumber',
    startDate: 'startDate',
    endDate: 'endDate',
    grossPremium: 'grossPremium',
    agentComm: 'agentComm',
    reinsurancePremium: 'reinsurancePremium',
    reinsuranceComm: 'reinsuranceComm',
    updatedAt: 'updatedAt'
  };

  export type PremiumActualsScalarFieldEnum = (typeof PremiumActualsScalarFieldEnum)[keyof typeof PremiumActualsScalarFieldEnum]


  export const ClaimsActualsScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    branchNumber: 'branchNumber',
    underwritingYear: 'underwritingYear',
    lossYear: 'lossYear',
    claimsPaidGross: 'claimsPaidGross',
    claimsPaidRi: 'claimsPaidRi',
    updatedAt: 'updatedAt'
  };

  export type ClaimsActualsScalarFieldEnum = (typeof ClaimsActualsScalarFieldEnum)[keyof typeof ClaimsActualsScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    branchNumber: 'branchNumber',
    branchName: 'branchName',
    groupCode: 'groupCode',
    groupName: 'groupName',
    updatedAt: 'updatedAt'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const AdminExpenseScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    premiumExpense: 'premiumExpense',
    claimsExpense: 'claimsExpense',
    description: 'description',
    updatedAt: 'updatedAt'
  };

  export type AdminExpenseScalarFieldEnum = (typeof AdminExpenseScalarFieldEnum)[keyof typeof AdminExpenseScalarFieldEnum]


  export const ActuarialEstimateScalarFieldEnum: {
    id: 'id',
    year: 'year',
    month: 'month',
    branchNumber: 'branchNumber',
    underwritingYear: 'underwritingYear',
    lossYear: 'lossYear',
    outstandingClaimsGross: 'outstandingClaimsGross',
    outstandingClaimsRi: 'outstandingClaimsRi',
    ibnrGross: 'ibnrGross',
    ibnrRi: 'ibnrRi',
    actuarialEstimateGross: 'actuarialEstimateGross',
    actuarialEstimateRi: 'actuarialEstimateRi',
    updatedAt: 'updatedAt'
  };

  export type ActuarialEstimateScalarFieldEnum = (typeof ActuarialEstimateScalarFieldEnum)[keyof typeof ActuarialEstimateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PolicyWhereInput = {
    AND?: PolicyWhereInput | PolicyWhereInput[]
    OR?: PolicyWhereInput[]
    NOT?: PolicyWhereInput | PolicyWhereInput[]
    id?: StringFilter<"Policy"> | string
    policyNumber?: StringFilter<"Policy"> | string
    branchNumber?: IntFilter<"Policy"> | number
    premiumAmount?: DecimalFilter<"Policy"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Policy"> | Date | string
    endDate?: DateTimeFilter<"Policy"> | Date | string
    status?: StringFilter<"Policy"> | string
    createdAt?: DateTimeFilter<"Policy"> | Date | string
  }

  export type PolicyOrderByWithRelationInput = {
    id?: SortOrder
    policyNumber?: SortOrder
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    policyNumber?: string
    AND?: PolicyWhereInput | PolicyWhereInput[]
    OR?: PolicyWhereInput[]
    NOT?: PolicyWhereInput | PolicyWhereInput[]
    branchNumber?: IntFilter<"Policy"> | number
    premiumAmount?: DecimalFilter<"Policy"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Policy"> | Date | string
    endDate?: DateTimeFilter<"Policy"> | Date | string
    status?: StringFilter<"Policy"> | string
    createdAt?: DateTimeFilter<"Policy"> | Date | string
  }, "id" | "policyNumber">

  export type PolicyOrderByWithAggregationInput = {
    id?: SortOrder
    policyNumber?: SortOrder
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: PolicyCountOrderByAggregateInput
    _avg?: PolicyAvgOrderByAggregateInput
    _max?: PolicyMaxOrderByAggregateInput
    _min?: PolicyMinOrderByAggregateInput
    _sum?: PolicySumOrderByAggregateInput
  }

  export type PolicyScalarWhereWithAggregatesInput = {
    AND?: PolicyScalarWhereWithAggregatesInput | PolicyScalarWhereWithAggregatesInput[]
    OR?: PolicyScalarWhereWithAggregatesInput[]
    NOT?: PolicyScalarWhereWithAggregatesInput | PolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Policy"> | string
    policyNumber?: StringWithAggregatesFilter<"Policy"> | string
    branchNumber?: IntWithAggregatesFilter<"Policy"> | number
    premiumAmount?: DecimalWithAggregatesFilter<"Policy"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeWithAggregatesFilter<"Policy"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Policy"> | Date | string
    status?: StringWithAggregatesFilter<"Policy"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Policy"> | Date | string
  }

  export type UprSnapshotWhereInput = {
    AND?: UprSnapshotWhereInput | UprSnapshotWhereInput[]
    OR?: UprSnapshotWhereInput[]
    NOT?: UprSnapshotWhereInput | UprSnapshotWhereInput[]
    id?: StringFilter<"UprSnapshot"> | string
    year?: IntFilter<"UprSnapshot"> | number
    period?: IntFilter<"UprSnapshot"> | number
    periodType?: StringFilter<"UprSnapshot"> | string
    branchNumber?: IntFilter<"UprSnapshot"> | number
    originalPremium?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFilter<"UprSnapshot"> | Date | string
  }

  export type UprSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    period?: SortOrder
    periodType?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
    calculatedAt?: SortOrder
  }

  export type UprSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_period_periodType_branchNumber?: UprSnapshotYearPeriodPeriodTypeBranchNumberCompoundUniqueInput
    AND?: UprSnapshotWhereInput | UprSnapshotWhereInput[]
    OR?: UprSnapshotWhereInput[]
    NOT?: UprSnapshotWhereInput | UprSnapshotWhereInput[]
    year?: IntFilter<"UprSnapshot"> | number
    period?: IntFilter<"UprSnapshot"> | number
    periodType?: StringFilter<"UprSnapshot"> | string
    branchNumber?: IntFilter<"UprSnapshot"> | number
    originalPremium?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFilter<"UprSnapshot"> | Date | string
  }, "id" | "year_period_periodType_branchNumber">

  export type UprSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    period?: SortOrder
    periodType?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
    calculatedAt?: SortOrder
    _count?: UprSnapshotCountOrderByAggregateInput
    _avg?: UprSnapshotAvgOrderByAggregateInput
    _max?: UprSnapshotMaxOrderByAggregateInput
    _min?: UprSnapshotMinOrderByAggregateInput
    _sum?: UprSnapshotSumOrderByAggregateInput
  }

  export type UprSnapshotScalarWhereWithAggregatesInput = {
    AND?: UprSnapshotScalarWhereWithAggregatesInput | UprSnapshotScalarWhereWithAggregatesInput[]
    OR?: UprSnapshotScalarWhereWithAggregatesInput[]
    NOT?: UprSnapshotScalarWhereWithAggregatesInput | UprSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UprSnapshot"> | string
    year?: IntWithAggregatesFilter<"UprSnapshot"> | number
    period?: IntWithAggregatesFilter<"UprSnapshot"> | number
    periodType?: StringWithAggregatesFilter<"UprSnapshot"> | string
    branchNumber?: IntWithAggregatesFilter<"UprSnapshot"> | number
    originalPremium?: DecimalWithAggregatesFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalWithAggregatesFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalWithAggregatesFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalWithAggregatesFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalWithAggregatesFilter<"UprSnapshot"> | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeWithAggregatesFilter<"UprSnapshot"> | Date | string
  }

  export type AdminExpenseAllocationWhereInput = {
    AND?: AdminExpenseAllocationWhereInput | AdminExpenseAllocationWhereInput[]
    OR?: AdminExpenseAllocationWhereInput[]
    NOT?: AdminExpenseAllocationWhereInput | AdminExpenseAllocationWhereInput[]
    id?: StringFilter<"AdminExpenseAllocation"> | string
    year?: IntFilter<"AdminExpenseAllocation"> | number
    month?: IntFilter<"AdminExpenseAllocation"> | number
    branchNumber?: IntFilter<"AdminExpenseAllocation"> | number
    premiumExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    claimsExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    totalExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    recognizedExpense?: FloatFilter<"AdminExpenseAllocation"> | number
    deferredExpense?: FloatFilter<"AdminExpenseAllocation"> | number
    updatedAt?: DateTimeFilter<"AdminExpenseAllocation"> | Date | string
  }

  export type AdminExpenseAllocationOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseAllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month_branchNumber?: AdminExpenseAllocationYearMonthBranchNumberCompoundUniqueInput
    AND?: AdminExpenseAllocationWhereInput | AdminExpenseAllocationWhereInput[]
    OR?: AdminExpenseAllocationWhereInput[]
    NOT?: AdminExpenseAllocationWhereInput | AdminExpenseAllocationWhereInput[]
    year?: IntFilter<"AdminExpenseAllocation"> | number
    month?: IntFilter<"AdminExpenseAllocation"> | number
    branchNumber?: IntFilter<"AdminExpenseAllocation"> | number
    premiumExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    claimsExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    totalExpenseShare?: FloatFilter<"AdminExpenseAllocation"> | number
    recognizedExpense?: FloatFilter<"AdminExpenseAllocation"> | number
    deferredExpense?: FloatFilter<"AdminExpenseAllocation"> | number
    updatedAt?: DateTimeFilter<"AdminExpenseAllocation"> | Date | string
  }, "id" | "year_month_branchNumber">

  export type AdminExpenseAllocationOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminExpenseAllocationCountOrderByAggregateInput
    _avg?: AdminExpenseAllocationAvgOrderByAggregateInput
    _max?: AdminExpenseAllocationMaxOrderByAggregateInput
    _min?: AdminExpenseAllocationMinOrderByAggregateInput
    _sum?: AdminExpenseAllocationSumOrderByAggregateInput
  }

  export type AdminExpenseAllocationScalarWhereWithAggregatesInput = {
    AND?: AdminExpenseAllocationScalarWhereWithAggregatesInput | AdminExpenseAllocationScalarWhereWithAggregatesInput[]
    OR?: AdminExpenseAllocationScalarWhereWithAggregatesInput[]
    NOT?: AdminExpenseAllocationScalarWhereWithAggregatesInput | AdminExpenseAllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminExpenseAllocation"> | string
    year?: IntWithAggregatesFilter<"AdminExpenseAllocation"> | number
    month?: IntWithAggregatesFilter<"AdminExpenseAllocation"> | number
    branchNumber?: IntWithAggregatesFilter<"AdminExpenseAllocation"> | number
    premiumExpenseShare?: FloatWithAggregatesFilter<"AdminExpenseAllocation"> | number
    claimsExpenseShare?: FloatWithAggregatesFilter<"AdminExpenseAllocation"> | number
    totalExpenseShare?: FloatWithAggregatesFilter<"AdminExpenseAllocation"> | number
    recognizedExpense?: FloatWithAggregatesFilter<"AdminExpenseAllocation"> | number
    deferredExpense?: FloatWithAggregatesFilter<"AdminExpenseAllocation"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"AdminExpenseAllocation"> | Date | string
  }

  export type BranchParametersWhereInput = {
    AND?: BranchParametersWhereInput | BranchParametersWhereInput[]
    OR?: BranchParametersWhereInput[]
    NOT?: BranchParametersWhereInput | BranchParametersWhereInput[]
    id?: StringFilter<"BranchParameters"> | string
    year?: IntFilter<"BranchParameters"> | number
    branchNumber?: IntFilter<"BranchParameters"> | number
    expectedGrossPremium?: FloatFilter<"BranchParameters"> | number
    agentCommPct?: FloatFilter<"BranchParameters"> | number
    reinsurancePct?: FloatFilter<"BranchParameters"> | number
    reinsuranceCommPct?: FloatFilter<"BranchParameters"> | number
    expectedLrPct?: FloatFilter<"BranchParameters"> | number
    updatedAt?: DateTimeFilter<"BranchParameters"> | Date | string
  }

  export type BranchParametersOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchParametersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_branchNumber?: BranchParametersYearBranchNumberCompoundUniqueInput
    AND?: BranchParametersWhereInput | BranchParametersWhereInput[]
    OR?: BranchParametersWhereInput[]
    NOT?: BranchParametersWhereInput | BranchParametersWhereInput[]
    year?: IntFilter<"BranchParameters"> | number
    branchNumber?: IntFilter<"BranchParameters"> | number
    expectedGrossPremium?: FloatFilter<"BranchParameters"> | number
    agentCommPct?: FloatFilter<"BranchParameters"> | number
    reinsurancePct?: FloatFilter<"BranchParameters"> | number
    reinsuranceCommPct?: FloatFilter<"BranchParameters"> | number
    expectedLrPct?: FloatFilter<"BranchParameters"> | number
    updatedAt?: DateTimeFilter<"BranchParameters"> | Date | string
  }, "id" | "year_branchNumber">

  export type BranchParametersOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
    updatedAt?: SortOrder
    _count?: BranchParametersCountOrderByAggregateInput
    _avg?: BranchParametersAvgOrderByAggregateInput
    _max?: BranchParametersMaxOrderByAggregateInput
    _min?: BranchParametersMinOrderByAggregateInput
    _sum?: BranchParametersSumOrderByAggregateInput
  }

  export type BranchParametersScalarWhereWithAggregatesInput = {
    AND?: BranchParametersScalarWhereWithAggregatesInput | BranchParametersScalarWhereWithAggregatesInput[]
    OR?: BranchParametersScalarWhereWithAggregatesInput[]
    NOT?: BranchParametersScalarWhereWithAggregatesInput | BranchParametersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BranchParameters"> | string
    year?: IntWithAggregatesFilter<"BranchParameters"> | number
    branchNumber?: IntWithAggregatesFilter<"BranchParameters"> | number
    expectedGrossPremium?: FloatWithAggregatesFilter<"BranchParameters"> | number
    agentCommPct?: FloatWithAggregatesFilter<"BranchParameters"> | number
    reinsurancePct?: FloatWithAggregatesFilter<"BranchParameters"> | number
    reinsuranceCommPct?: FloatWithAggregatesFilter<"BranchParameters"> | number
    expectedLrPct?: FloatWithAggregatesFilter<"BranchParameters"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"BranchParameters"> | Date | string
  }

  export type PremiumActualsWhereInput = {
    AND?: PremiumActualsWhereInput | PremiumActualsWhereInput[]
    OR?: PremiumActualsWhereInput[]
    NOT?: PremiumActualsWhereInput | PremiumActualsWhereInput[]
    id?: StringFilter<"PremiumActuals"> | string
    year?: IntFilter<"PremiumActuals"> | number
    month?: IntFilter<"PremiumActuals"> | number
    branchNumber?: IntFilter<"PremiumActuals"> | number
    startDate?: DateTimeFilter<"PremiumActuals"> | Date | string
    endDate?: DateTimeFilter<"PremiumActuals"> | Date | string
    grossPremium?: FloatFilter<"PremiumActuals"> | number
    agentComm?: FloatFilter<"PremiumActuals"> | number
    reinsurancePremium?: FloatFilter<"PremiumActuals"> | number
    reinsuranceComm?: FloatFilter<"PremiumActuals"> | number
    updatedAt?: DateTimeFilter<"PremiumActuals"> | Date | string
  }

  export type PremiumActualsOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumActualsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month_branchNumber?: PremiumActualsYearMonthBranchNumberCompoundUniqueInput
    AND?: PremiumActualsWhereInput | PremiumActualsWhereInput[]
    OR?: PremiumActualsWhereInput[]
    NOT?: PremiumActualsWhereInput | PremiumActualsWhereInput[]
    year?: IntFilter<"PremiumActuals"> | number
    month?: IntFilter<"PremiumActuals"> | number
    branchNumber?: IntFilter<"PremiumActuals"> | number
    startDate?: DateTimeFilter<"PremiumActuals"> | Date | string
    endDate?: DateTimeFilter<"PremiumActuals"> | Date | string
    grossPremium?: FloatFilter<"PremiumActuals"> | number
    agentComm?: FloatFilter<"PremiumActuals"> | number
    reinsurancePremium?: FloatFilter<"PremiumActuals"> | number
    reinsuranceComm?: FloatFilter<"PremiumActuals"> | number
    updatedAt?: DateTimeFilter<"PremiumActuals"> | Date | string
  }, "id" | "year_month_branchNumber">

  export type PremiumActualsOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
    updatedAt?: SortOrder
    _count?: PremiumActualsCountOrderByAggregateInput
    _avg?: PremiumActualsAvgOrderByAggregateInput
    _max?: PremiumActualsMaxOrderByAggregateInput
    _min?: PremiumActualsMinOrderByAggregateInput
    _sum?: PremiumActualsSumOrderByAggregateInput
  }

  export type PremiumActualsScalarWhereWithAggregatesInput = {
    AND?: PremiumActualsScalarWhereWithAggregatesInput | PremiumActualsScalarWhereWithAggregatesInput[]
    OR?: PremiumActualsScalarWhereWithAggregatesInput[]
    NOT?: PremiumActualsScalarWhereWithAggregatesInput | PremiumActualsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PremiumActuals"> | string
    year?: IntWithAggregatesFilter<"PremiumActuals"> | number
    month?: IntWithAggregatesFilter<"PremiumActuals"> | number
    branchNumber?: IntWithAggregatesFilter<"PremiumActuals"> | number
    startDate?: DateTimeWithAggregatesFilter<"PremiumActuals"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"PremiumActuals"> | Date | string
    grossPremium?: FloatWithAggregatesFilter<"PremiumActuals"> | number
    agentComm?: FloatWithAggregatesFilter<"PremiumActuals"> | number
    reinsurancePremium?: FloatWithAggregatesFilter<"PremiumActuals"> | number
    reinsuranceComm?: FloatWithAggregatesFilter<"PremiumActuals"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"PremiumActuals"> | Date | string
  }

  export type ClaimsActualsWhereInput = {
    AND?: ClaimsActualsWhereInput | ClaimsActualsWhereInput[]
    OR?: ClaimsActualsWhereInput[]
    NOT?: ClaimsActualsWhereInput | ClaimsActualsWhereInput[]
    id?: StringFilter<"ClaimsActuals"> | string
    year?: IntFilter<"ClaimsActuals"> | number
    month?: IntFilter<"ClaimsActuals"> | number
    branchNumber?: IntFilter<"ClaimsActuals"> | number
    underwritingYear?: IntFilter<"ClaimsActuals"> | number
    lossYear?: IntFilter<"ClaimsActuals"> | number
    claimsPaidGross?: FloatFilter<"ClaimsActuals"> | number
    claimsPaidRi?: FloatFilter<"ClaimsActuals"> | number
    updatedAt?: DateTimeFilter<"ClaimsActuals"> | Date | string
  }

  export type ClaimsActualsOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimsActualsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month_branchNumber_underwritingYear_lossYear?: ClaimsActualsYearMonthBranchNumberUnderwritingYearLossYearCompoundUniqueInput
    AND?: ClaimsActualsWhereInput | ClaimsActualsWhereInput[]
    OR?: ClaimsActualsWhereInput[]
    NOT?: ClaimsActualsWhereInput | ClaimsActualsWhereInput[]
    year?: IntFilter<"ClaimsActuals"> | number
    month?: IntFilter<"ClaimsActuals"> | number
    branchNumber?: IntFilter<"ClaimsActuals"> | number
    underwritingYear?: IntFilter<"ClaimsActuals"> | number
    lossYear?: IntFilter<"ClaimsActuals"> | number
    claimsPaidGross?: FloatFilter<"ClaimsActuals"> | number
    claimsPaidRi?: FloatFilter<"ClaimsActuals"> | number
    updatedAt?: DateTimeFilter<"ClaimsActuals"> | Date | string
  }, "id" | "year_month_branchNumber_underwritingYear_lossYear">

  export type ClaimsActualsOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
    updatedAt?: SortOrder
    _count?: ClaimsActualsCountOrderByAggregateInput
    _avg?: ClaimsActualsAvgOrderByAggregateInput
    _max?: ClaimsActualsMaxOrderByAggregateInput
    _min?: ClaimsActualsMinOrderByAggregateInput
    _sum?: ClaimsActualsSumOrderByAggregateInput
  }

  export type ClaimsActualsScalarWhereWithAggregatesInput = {
    AND?: ClaimsActualsScalarWhereWithAggregatesInput | ClaimsActualsScalarWhereWithAggregatesInput[]
    OR?: ClaimsActualsScalarWhereWithAggregatesInput[]
    NOT?: ClaimsActualsScalarWhereWithAggregatesInput | ClaimsActualsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClaimsActuals"> | string
    year?: IntWithAggregatesFilter<"ClaimsActuals"> | number
    month?: IntWithAggregatesFilter<"ClaimsActuals"> | number
    branchNumber?: IntWithAggregatesFilter<"ClaimsActuals"> | number
    underwritingYear?: IntWithAggregatesFilter<"ClaimsActuals"> | number
    lossYear?: IntWithAggregatesFilter<"ClaimsActuals"> | number
    claimsPaidGross?: FloatWithAggregatesFilter<"ClaimsActuals"> | number
    claimsPaidRi?: FloatWithAggregatesFilter<"ClaimsActuals"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ClaimsActuals"> | Date | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    branchNumber?: IntFilter<"Branch"> | number
    branchName?: StringFilter<"Branch"> | string
    groupCode?: StringFilter<"Branch"> | string
    groupName?: StringFilter<"Branch"> | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
  }

  export type BranchOrderByWithRelationInput = {
    branchNumber?: SortOrder
    branchName?: SortOrder
    groupCode?: SortOrder
    groupName?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    branchNumber?: number
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    branchName?: StringFilter<"Branch"> | string
    groupCode?: StringFilter<"Branch"> | string
    groupName?: StringFilter<"Branch"> | string
    updatedAt?: DateTimeFilter<"Branch"> | Date | string
  }, "branchNumber">

  export type BranchOrderByWithAggregationInput = {
    branchNumber?: SortOrder
    branchName?: SortOrder
    groupCode?: SortOrder
    groupName?: SortOrder
    updatedAt?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _avg?: BranchAvgOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
    _sum?: BranchSumOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    branchNumber?: IntWithAggregatesFilter<"Branch"> | number
    branchName?: StringWithAggregatesFilter<"Branch"> | string
    groupCode?: StringWithAggregatesFilter<"Branch"> | string
    groupName?: StringWithAggregatesFilter<"Branch"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
  }

  export type AdminExpenseWhereInput = {
    AND?: AdminExpenseWhereInput | AdminExpenseWhereInput[]
    OR?: AdminExpenseWhereInput[]
    NOT?: AdminExpenseWhereInput | AdminExpenseWhereInput[]
    id?: StringFilter<"AdminExpense"> | string
    year?: IntFilter<"AdminExpense"> | number
    month?: IntFilter<"AdminExpense"> | number
    premiumExpense?: FloatFilter<"AdminExpense"> | number
    claimsExpense?: FloatFilter<"AdminExpense"> | number
    description?: StringNullableFilter<"AdminExpense"> | string | null
    updatedAt?: DateTimeFilter<"AdminExpense"> | Date | string
  }

  export type AdminExpenseOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month?: AdminExpenseYearMonthCompoundUniqueInput
    AND?: AdminExpenseWhereInput | AdminExpenseWhereInput[]
    OR?: AdminExpenseWhereInput[]
    NOT?: AdminExpenseWhereInput | AdminExpenseWhereInput[]
    year?: IntFilter<"AdminExpense"> | number
    month?: IntFilter<"AdminExpense"> | number
    premiumExpense?: FloatFilter<"AdminExpense"> | number
    claimsExpense?: FloatFilter<"AdminExpense"> | number
    description?: StringNullableFilter<"AdminExpense"> | string | null
    updatedAt?: DateTimeFilter<"AdminExpense"> | Date | string
  }, "id" | "year_month">

  export type AdminExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
    description?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: AdminExpenseCountOrderByAggregateInput
    _avg?: AdminExpenseAvgOrderByAggregateInput
    _max?: AdminExpenseMaxOrderByAggregateInput
    _min?: AdminExpenseMinOrderByAggregateInput
    _sum?: AdminExpenseSumOrderByAggregateInput
  }

  export type AdminExpenseScalarWhereWithAggregatesInput = {
    AND?: AdminExpenseScalarWhereWithAggregatesInput | AdminExpenseScalarWhereWithAggregatesInput[]
    OR?: AdminExpenseScalarWhereWithAggregatesInput[]
    NOT?: AdminExpenseScalarWhereWithAggregatesInput | AdminExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminExpense"> | string
    year?: IntWithAggregatesFilter<"AdminExpense"> | number
    month?: IntWithAggregatesFilter<"AdminExpense"> | number
    premiumExpense?: FloatWithAggregatesFilter<"AdminExpense"> | number
    claimsExpense?: FloatWithAggregatesFilter<"AdminExpense"> | number
    description?: StringNullableWithAggregatesFilter<"AdminExpense"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"AdminExpense"> | Date | string
  }

  export type ActuarialEstimateWhereInput = {
    AND?: ActuarialEstimateWhereInput | ActuarialEstimateWhereInput[]
    OR?: ActuarialEstimateWhereInput[]
    NOT?: ActuarialEstimateWhereInput | ActuarialEstimateWhereInput[]
    id?: StringFilter<"ActuarialEstimate"> | string
    year?: IntFilter<"ActuarialEstimate"> | number
    month?: IntFilter<"ActuarialEstimate"> | number
    branchNumber?: IntFilter<"ActuarialEstimate"> | number
    underwritingYear?: IntFilter<"ActuarialEstimate"> | number
    lossYear?: IntFilter<"ActuarialEstimate"> | number
    outstandingClaimsGross?: FloatFilter<"ActuarialEstimate"> | number
    outstandingClaimsRi?: FloatFilter<"ActuarialEstimate"> | number
    ibnrGross?: FloatFilter<"ActuarialEstimate"> | number
    ibnrRi?: FloatFilter<"ActuarialEstimate"> | number
    actuarialEstimateGross?: FloatFilter<"ActuarialEstimate"> | number
    actuarialEstimateRi?: FloatFilter<"ActuarialEstimate"> | number
    updatedAt?: DateTimeFilter<"ActuarialEstimate"> | Date | string
  }

  export type ActuarialEstimateOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActuarialEstimateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_month_branchNumber_underwritingYear_lossYear?: ActuarialEstimateYearMonthBranchNumberUnderwritingYearLossYearCompoundUniqueInput
    AND?: ActuarialEstimateWhereInput | ActuarialEstimateWhereInput[]
    OR?: ActuarialEstimateWhereInput[]
    NOT?: ActuarialEstimateWhereInput | ActuarialEstimateWhereInput[]
    year?: IntFilter<"ActuarialEstimate"> | number
    month?: IntFilter<"ActuarialEstimate"> | number
    branchNumber?: IntFilter<"ActuarialEstimate"> | number
    underwritingYear?: IntFilter<"ActuarialEstimate"> | number
    lossYear?: IntFilter<"ActuarialEstimate"> | number
    outstandingClaimsGross?: FloatFilter<"ActuarialEstimate"> | number
    outstandingClaimsRi?: FloatFilter<"ActuarialEstimate"> | number
    ibnrGross?: FloatFilter<"ActuarialEstimate"> | number
    ibnrRi?: FloatFilter<"ActuarialEstimate"> | number
    actuarialEstimateGross?: FloatFilter<"ActuarialEstimate"> | number
    actuarialEstimateRi?: FloatFilter<"ActuarialEstimate"> | number
    updatedAt?: DateTimeFilter<"ActuarialEstimate"> | Date | string
  }, "id" | "year_month_branchNumber_underwritingYear_lossYear">

  export type ActuarialEstimateOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
    updatedAt?: SortOrder
    _count?: ActuarialEstimateCountOrderByAggregateInput
    _avg?: ActuarialEstimateAvgOrderByAggregateInput
    _max?: ActuarialEstimateMaxOrderByAggregateInput
    _min?: ActuarialEstimateMinOrderByAggregateInput
    _sum?: ActuarialEstimateSumOrderByAggregateInput
  }

  export type ActuarialEstimateScalarWhereWithAggregatesInput = {
    AND?: ActuarialEstimateScalarWhereWithAggregatesInput | ActuarialEstimateScalarWhereWithAggregatesInput[]
    OR?: ActuarialEstimateScalarWhereWithAggregatesInput[]
    NOT?: ActuarialEstimateScalarWhereWithAggregatesInput | ActuarialEstimateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActuarialEstimate"> | string
    year?: IntWithAggregatesFilter<"ActuarialEstimate"> | number
    month?: IntWithAggregatesFilter<"ActuarialEstimate"> | number
    branchNumber?: IntWithAggregatesFilter<"ActuarialEstimate"> | number
    underwritingYear?: IntWithAggregatesFilter<"ActuarialEstimate"> | number
    lossYear?: IntWithAggregatesFilter<"ActuarialEstimate"> | number
    outstandingClaimsGross?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    outstandingClaimsRi?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    ibnrGross?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    ibnrRi?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    actuarialEstimateGross?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    actuarialEstimateRi?: FloatWithAggregatesFilter<"ActuarialEstimate"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"ActuarialEstimate"> | Date | string
  }

  export type PolicyCreateInput = {
    id?: string
    policyNumber: string
    branchNumber: number
    premiumAmount: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type PolicyUncheckedCreateInput = {
    id?: string
    policyNumber: string
    branchNumber: number
    premiumAmount: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type PolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCreateManyInput = {
    id?: string
    policyNumber: string
    branchNumber: number
    premiumAmount: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    status?: string
    createdAt?: Date | string
  }

  export type PolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    policyNumber?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UprSnapshotCreateInput = {
    id?: string
    year: number
    period: number
    periodType?: string
    branchNumber: number
    originalPremium?: Decimal | DecimalJsLike | number | string
    uprValue: Decimal | DecimalJsLike | number | string
    dacGross?: Decimal | DecimalJsLike | number | string
    deferredRIComm?: Decimal | DecimalJsLike | number | string
    ducNet?: Decimal | DecimalJsLike | number | string
    calculatedAt?: Date | string
  }

  export type UprSnapshotUncheckedCreateInput = {
    id?: string
    year: number
    period: number
    periodType?: string
    branchNumber: number
    originalPremium?: Decimal | DecimalJsLike | number | string
    uprValue: Decimal | DecimalJsLike | number | string
    dacGross?: Decimal | DecimalJsLike | number | string
    deferredRIComm?: Decimal | DecimalJsLike | number | string
    ducNet?: Decimal | DecimalJsLike | number | string
    calculatedAt?: Date | string
  }

  export type UprSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    periodType?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    originalPremium?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UprSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    periodType?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    originalPremium?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UprSnapshotCreateManyInput = {
    id?: string
    year: number
    period: number
    periodType?: string
    branchNumber: number
    originalPremium?: Decimal | DecimalJsLike | number | string
    uprValue: Decimal | DecimalJsLike | number | string
    dacGross?: Decimal | DecimalJsLike | number | string
    deferredRIComm?: Decimal | DecimalJsLike | number | string
    ducNet?: Decimal | DecimalJsLike | number | string
    calculatedAt?: Date | string
  }

  export type UprSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    periodType?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    originalPremium?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UprSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    periodType?: StringFieldUpdateOperationsInput | string
    branchNumber?: IntFieldUpdateOperationsInput | number
    originalPremium?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    uprValue?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dacGross?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deferredRIComm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ducNet?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    calculatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseAllocationCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    premiumExpenseShare: number
    claimsExpenseShare: number
    totalExpenseShare: number
    recognizedExpense: number
    deferredExpense: number
    updatedAt?: Date | string
  }

  export type AdminExpenseAllocationUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    premiumExpenseShare: number
    claimsExpenseShare: number
    totalExpenseShare: number
    recognizedExpense: number
    deferredExpense: number
    updatedAt?: Date | string
  }

  export type AdminExpenseAllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumExpenseShare?: FloatFieldUpdateOperationsInput | number
    claimsExpenseShare?: FloatFieldUpdateOperationsInput | number
    totalExpenseShare?: FloatFieldUpdateOperationsInput | number
    recognizedExpense?: FloatFieldUpdateOperationsInput | number
    deferredExpense?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseAllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumExpenseShare?: FloatFieldUpdateOperationsInput | number
    claimsExpenseShare?: FloatFieldUpdateOperationsInput | number
    totalExpenseShare?: FloatFieldUpdateOperationsInput | number
    recognizedExpense?: FloatFieldUpdateOperationsInput | number
    deferredExpense?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseAllocationCreateManyInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    premiumExpenseShare: number
    claimsExpenseShare: number
    totalExpenseShare: number
    recognizedExpense: number
    deferredExpense: number
    updatedAt?: Date | string
  }

  export type AdminExpenseAllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumExpenseShare?: FloatFieldUpdateOperationsInput | number
    claimsExpenseShare?: FloatFieldUpdateOperationsInput | number
    totalExpenseShare?: FloatFieldUpdateOperationsInput | number
    recognizedExpense?: FloatFieldUpdateOperationsInput | number
    deferredExpense?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseAllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    premiumExpenseShare?: FloatFieldUpdateOperationsInput | number
    claimsExpenseShare?: FloatFieldUpdateOperationsInput | number
    totalExpenseShare?: FloatFieldUpdateOperationsInput | number
    recognizedExpense?: FloatFieldUpdateOperationsInput | number
    deferredExpense?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchParametersCreateInput = {
    id?: string
    year: number
    branchNumber: number
    expectedGrossPremium: number
    agentCommPct: number
    reinsurancePct: number
    reinsuranceCommPct: number
    expectedLrPct: number
    updatedAt?: Date | string
  }

  export type BranchParametersUncheckedCreateInput = {
    id?: string
    year: number
    branchNumber: number
    expectedGrossPremium: number
    agentCommPct: number
    reinsurancePct: number
    reinsuranceCommPct: number
    expectedLrPct: number
    updatedAt?: Date | string
  }

  export type BranchParametersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    expectedGrossPremium?: FloatFieldUpdateOperationsInput | number
    agentCommPct?: FloatFieldUpdateOperationsInput | number
    reinsurancePct?: FloatFieldUpdateOperationsInput | number
    reinsuranceCommPct?: FloatFieldUpdateOperationsInput | number
    expectedLrPct?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchParametersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    expectedGrossPremium?: FloatFieldUpdateOperationsInput | number
    agentCommPct?: FloatFieldUpdateOperationsInput | number
    reinsurancePct?: FloatFieldUpdateOperationsInput | number
    reinsuranceCommPct?: FloatFieldUpdateOperationsInput | number
    expectedLrPct?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchParametersCreateManyInput = {
    id?: string
    year: number
    branchNumber: number
    expectedGrossPremium: number
    agentCommPct: number
    reinsurancePct: number
    reinsuranceCommPct: number
    expectedLrPct: number
    updatedAt?: Date | string
  }

  export type BranchParametersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    expectedGrossPremium?: FloatFieldUpdateOperationsInput | number
    agentCommPct?: FloatFieldUpdateOperationsInput | number
    reinsurancePct?: FloatFieldUpdateOperationsInput | number
    reinsuranceCommPct?: FloatFieldUpdateOperationsInput | number
    expectedLrPct?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchParametersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    expectedGrossPremium?: FloatFieldUpdateOperationsInput | number
    agentCommPct?: FloatFieldUpdateOperationsInput | number
    reinsurancePct?: FloatFieldUpdateOperationsInput | number
    reinsuranceCommPct?: FloatFieldUpdateOperationsInput | number
    expectedLrPct?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumActualsCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    startDate: Date | string
    endDate: Date | string
    grossPremium: number
    agentComm: number
    reinsurancePremium: number
    reinsuranceComm: number
    updatedAt?: Date | string
  }

  export type PremiumActualsUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    startDate: Date | string
    endDate: Date | string
    grossPremium: number
    agentComm: number
    reinsurancePremium: number
    reinsuranceComm: number
    updatedAt?: Date | string
  }

  export type PremiumActualsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    grossPremium?: FloatFieldUpdateOperationsInput | number
    agentComm?: FloatFieldUpdateOperationsInput | number
    reinsurancePremium?: FloatFieldUpdateOperationsInput | number
    reinsuranceComm?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumActualsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    grossPremium?: FloatFieldUpdateOperationsInput | number
    agentComm?: FloatFieldUpdateOperationsInput | number
    reinsurancePremium?: FloatFieldUpdateOperationsInput | number
    reinsuranceComm?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumActualsCreateManyInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    startDate: Date | string
    endDate: Date | string
    grossPremium: number
    agentComm: number
    reinsurancePremium: number
    reinsuranceComm: number
    updatedAt?: Date | string
  }

  export type PremiumActualsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    grossPremium?: FloatFieldUpdateOperationsInput | number
    agentComm?: FloatFieldUpdateOperationsInput | number
    reinsurancePremium?: FloatFieldUpdateOperationsInput | number
    reinsuranceComm?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumActualsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    grossPremium?: FloatFieldUpdateOperationsInput | number
    agentComm?: FloatFieldUpdateOperationsInput | number
    reinsurancePremium?: FloatFieldUpdateOperationsInput | number
    reinsuranceComm?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimsActualsCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    claimsPaidGross: number
    claimsPaidRi: number
    updatedAt?: Date | string
  }

  export type ClaimsActualsUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    claimsPaidGross: number
    claimsPaidRi: number
    updatedAt?: Date | string
  }

  export type ClaimsActualsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    claimsPaidGross?: FloatFieldUpdateOperationsInput | number
    claimsPaidRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimsActualsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    claimsPaidGross?: FloatFieldUpdateOperationsInput | number
    claimsPaidRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimsActualsCreateManyInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    claimsPaidGross: number
    claimsPaidRi: number
    updatedAt?: Date | string
  }

  export type ClaimsActualsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    claimsPaidGross?: FloatFieldUpdateOperationsInput | number
    claimsPaidRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimsActualsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    claimsPaidGross?: FloatFieldUpdateOperationsInput | number
    claimsPaidRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateInput = {
    branchNumber: number
    branchName: string
    groupCode: string
    groupName: string
    updatedAt?: Date | string
  }

  export type BranchUncheckedCreateInput = {
    branchNumber: number
    branchName: string
    groupCode: string
    groupName: string
    updatedAt?: Date | string
  }

  export type BranchUpdateInput = {
    branchNumber?: IntFieldUpdateOperationsInput | number
    branchName?: StringFieldUpdateOperationsInput | string
    groupCode?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateInput = {
    branchNumber?: IntFieldUpdateOperationsInput | number
    branchName?: StringFieldUpdateOperationsInput | string
    groupCode?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchCreateManyInput = {
    branchNumber: number
    branchName: string
    groupCode: string
    groupName: string
    updatedAt?: Date | string
  }

  export type BranchUpdateManyMutationInput = {
    branchNumber?: IntFieldUpdateOperationsInput | number
    branchName?: StringFieldUpdateOperationsInput | string
    groupCode?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchUncheckedUpdateManyInput = {
    branchNumber?: IntFieldUpdateOperationsInput | number
    branchName?: StringFieldUpdateOperationsInput | string
    groupCode?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseCreateInput = {
    id?: string
    year: number
    month: number
    premiumExpense: number
    claimsExpense: number
    description?: string | null
    updatedAt?: Date | string
  }

  export type AdminExpenseUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    premiumExpense: number
    claimsExpense: number
    description?: string | null
    updatedAt?: Date | string
  }

  export type AdminExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    premiumExpense?: FloatFieldUpdateOperationsInput | number
    claimsExpense?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    premiumExpense?: FloatFieldUpdateOperationsInput | number
    claimsExpense?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseCreateManyInput = {
    id?: string
    year: number
    month: number
    premiumExpense: number
    claimsExpense: number
    description?: string | null
    updatedAt?: Date | string
  }

  export type AdminExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    premiumExpense?: FloatFieldUpdateOperationsInput | number
    claimsExpense?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    premiumExpense?: FloatFieldUpdateOperationsInput | number
    claimsExpense?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActuarialEstimateCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    outstandingClaimsGross: number
    outstandingClaimsRi: number
    ibnrGross: number
    ibnrRi: number
    actuarialEstimateGross?: number
    actuarialEstimateRi?: number
    updatedAt?: Date | string
  }

  export type ActuarialEstimateUncheckedCreateInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    outstandingClaimsGross: number
    outstandingClaimsRi: number
    ibnrGross: number
    ibnrRi: number
    actuarialEstimateGross?: number
    actuarialEstimateRi?: number
    updatedAt?: Date | string
  }

  export type ActuarialEstimateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    outstandingClaimsGross?: FloatFieldUpdateOperationsInput | number
    outstandingClaimsRi?: FloatFieldUpdateOperationsInput | number
    ibnrGross?: FloatFieldUpdateOperationsInput | number
    ibnrRi?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateGross?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActuarialEstimateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    outstandingClaimsGross?: FloatFieldUpdateOperationsInput | number
    outstandingClaimsRi?: FloatFieldUpdateOperationsInput | number
    ibnrGross?: FloatFieldUpdateOperationsInput | number
    ibnrRi?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateGross?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActuarialEstimateCreateManyInput = {
    id?: string
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
    outstandingClaimsGross: number
    outstandingClaimsRi: number
    ibnrGross: number
    ibnrRi: number
    actuarialEstimateGross?: number
    actuarialEstimateRi?: number
    updatedAt?: Date | string
  }

  export type ActuarialEstimateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    outstandingClaimsGross?: FloatFieldUpdateOperationsInput | number
    outstandingClaimsRi?: FloatFieldUpdateOperationsInput | number
    ibnrGross?: FloatFieldUpdateOperationsInput | number
    ibnrRi?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateGross?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActuarialEstimateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    branchNumber?: IntFieldUpdateOperationsInput | number
    underwritingYear?: IntFieldUpdateOperationsInput | number
    lossYear?: IntFieldUpdateOperationsInput | number
    outstandingClaimsGross?: FloatFieldUpdateOperationsInput | number
    outstandingClaimsRi?: FloatFieldUpdateOperationsInput | number
    ibnrGross?: FloatFieldUpdateOperationsInput | number
    ibnrRi?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateGross?: FloatFieldUpdateOperationsInput | number
    actuarialEstimateRi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PolicyCountOrderByAggregateInput = {
    id?: SortOrder
    policyNumber?: SortOrder
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PolicyAvgOrderByAggregateInput = {
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
  }

  export type PolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    policyNumber?: SortOrder
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PolicyMinOrderByAggregateInput = {
    id?: SortOrder
    policyNumber?: SortOrder
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type PolicySumOrderByAggregateInput = {
    branchNumber?: SortOrder
    premiumAmount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UprSnapshotYearPeriodPeriodTypeBranchNumberCompoundUniqueInput = {
    year: number
    period: number
    periodType: string
    branchNumber: number
  }

  export type UprSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    period?: SortOrder
    periodType?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
    calculatedAt?: SortOrder
  }

  export type UprSnapshotAvgOrderByAggregateInput = {
    year?: SortOrder
    period?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
  }

  export type UprSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    period?: SortOrder
    periodType?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
    calculatedAt?: SortOrder
  }

  export type UprSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    period?: SortOrder
    periodType?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
    calculatedAt?: SortOrder
  }

  export type UprSnapshotSumOrderByAggregateInput = {
    year?: SortOrder
    period?: SortOrder
    branchNumber?: SortOrder
    originalPremium?: SortOrder
    uprValue?: SortOrder
    dacGross?: SortOrder
    deferredRIComm?: SortOrder
    ducNet?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AdminExpenseAllocationYearMonthBranchNumberCompoundUniqueInput = {
    year: number
    month: number
    branchNumber: number
  }

  export type AdminExpenseAllocationCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseAllocationAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
  }

  export type AdminExpenseAllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseAllocationMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseAllocationSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    premiumExpenseShare?: SortOrder
    claimsExpenseShare?: SortOrder
    totalExpenseShare?: SortOrder
    recognizedExpense?: SortOrder
    deferredExpense?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BranchParametersYearBranchNumberCompoundUniqueInput = {
    year: number
    branchNumber: number
  }

  export type BranchParametersCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchParametersAvgOrderByAggregateInput = {
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
  }

  export type BranchParametersMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchParametersMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchParametersSumOrderByAggregateInput = {
    year?: SortOrder
    branchNumber?: SortOrder
    expectedGrossPremium?: SortOrder
    agentCommPct?: SortOrder
    reinsurancePct?: SortOrder
    reinsuranceCommPct?: SortOrder
    expectedLrPct?: SortOrder
  }

  export type PremiumActualsYearMonthBranchNumberCompoundUniqueInput = {
    year: number
    month: number
    branchNumber: number
  }

  export type PremiumActualsCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumActualsAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
  }

  export type PremiumActualsMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumActualsMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumActualsSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    grossPremium?: SortOrder
    agentComm?: SortOrder
    reinsurancePremium?: SortOrder
    reinsuranceComm?: SortOrder
  }

  export type ClaimsActualsYearMonthBranchNumberUnderwritingYearLossYearCompoundUniqueInput = {
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
  }

  export type ClaimsActualsCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimsActualsAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
  }

  export type ClaimsActualsMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimsActualsMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClaimsActualsSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    claimsPaidGross?: SortOrder
    claimsPaidRi?: SortOrder
  }

  export type BranchCountOrderByAggregateInput = {
    branchNumber?: SortOrder
    branchName?: SortOrder
    groupCode?: SortOrder
    groupName?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchAvgOrderByAggregateInput = {
    branchNumber?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    branchNumber?: SortOrder
    branchName?: SortOrder
    groupCode?: SortOrder
    groupName?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    branchNumber?: SortOrder
    branchName?: SortOrder
    groupCode?: SortOrder
    groupName?: SortOrder
    updatedAt?: SortOrder
  }

  export type BranchSumOrderByAggregateInput = {
    branchNumber?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminExpenseYearMonthCompoundUniqueInput = {
    year: number
    month: number
  }

  export type AdminExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
  }

  export type AdminExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
    description?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminExpenseSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    premiumExpense?: SortOrder
    claimsExpense?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ActuarialEstimateYearMonthBranchNumberUnderwritingYearLossYearCompoundUniqueInput = {
    year: number
    month: number
    branchNumber: number
    underwritingYear: number
    lossYear: number
  }

  export type ActuarialEstimateCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActuarialEstimateAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
  }

  export type ActuarialEstimateMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActuarialEstimateMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActuarialEstimateSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    branchNumber?: SortOrder
    underwritingYear?: SortOrder
    lossYear?: SortOrder
    outstandingClaimsGross?: SortOrder
    outstandingClaimsRi?: SortOrder
    ibnrGross?: SortOrder
    ibnrRi?: SortOrder
    actuarialEstimateGross?: SortOrder
    actuarialEstimateRi?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}