

export type LogLevel = 'info' | 'query' | 'warn' | 'error'

export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type QueryEvent = {
    timestamp: Date
    query: string // Query sent to the database
    params: string // Query parameters
    duration: number // Time elapsed (in milliseconds) between client issuing query and database responding - not only time taken to run query
    target: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export type UserCreateArgs = {
    select?: XOR<UserSelect, null>
    include?: XOR<UserInclude, null>
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
}

export type UserUpdateArgs = {
    select?: XOR<UserSelect, null>
    include?: XOR<UserInclude, null>
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    where: UserWhereUniqueInput
}

export type UserFindManyArgs = {
    select?: XOR<UserSelect, null>
    include?: XOR<UserInclude, null>
    where?: UserWhereInput
    orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserDistinctFieldEnum>
}
