/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query AdminMe {\n    me {\n      id\n      name\n      email\n      roles\n      permissions\n    }\n  }\n": typeof types.AdminMeDocument,
    "\n  mutation AdminLogin($input: LoginInput!) {\n    adminLogin(input: $input) {\n      token\n    }\n  }\n": typeof types.AdminLoginDocument,
    "\n  mutation AdminLogout {\n    logout\n  }\n": typeof types.AdminLogoutDocument,
    "\n  query AdminUsers($search: String, $page: Int, $first: Int!) {\n    adminUsers(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n        email\n        roles\n        createdAt\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n": typeof types.AdminUsersDocument,
    "\n  query AdminActivities($logName: String, $page: Int, $first: Int!) {\n    adminActivities(logName: $logName, page: $page, first: $first) {\n      data {\n        id\n        logName\n        event\n        description\n        subjectType\n        subjectId\n        properties\n        createdAt\n        causer {\n          id\n          name\n          email\n        }\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n": typeof types.AdminActivitiesDocument,
    "\n  mutation AdminAssignRole($userId: ID!, $role: Role!) {\n    adminAssignRole(userId: $userId, role: $role) {\n      id\n      roles\n    }\n  }\n": typeof types.AdminAssignRoleDocument,
};
const documents: Documents = {
    "\n  query AdminMe {\n    me {\n      id\n      name\n      email\n      roles\n      permissions\n    }\n  }\n": types.AdminMeDocument,
    "\n  mutation AdminLogin($input: LoginInput!) {\n    adminLogin(input: $input) {\n      token\n    }\n  }\n": types.AdminLoginDocument,
    "\n  mutation AdminLogout {\n    logout\n  }\n": types.AdminLogoutDocument,
    "\n  query AdminUsers($search: String, $page: Int, $first: Int!) {\n    adminUsers(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n        email\n        roles\n        createdAt\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n": types.AdminUsersDocument,
    "\n  query AdminActivities($logName: String, $page: Int, $first: Int!) {\n    adminActivities(logName: $logName, page: $page, first: $first) {\n      data {\n        id\n        logName\n        event\n        description\n        subjectType\n        subjectId\n        properties\n        createdAt\n        causer {\n          id\n          name\n          email\n        }\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n": types.AdminActivitiesDocument,
    "\n  mutation AdminAssignRole($userId: ID!, $role: Role!) {\n    adminAssignRole(userId: $userId, role: $role) {\n      id\n      roles\n    }\n  }\n": types.AdminAssignRoleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminMe {\n    me {\n      id\n      name\n      email\n      roles\n      permissions\n    }\n  }\n"): (typeof documents)["\n  query AdminMe {\n    me {\n      id\n      name\n      email\n      roles\n      permissions\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AdminLogin($input: LoginInput!) {\n    adminLogin(input: $input) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation AdminLogin($input: LoginInput!) {\n    adminLogin(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AdminLogout {\n    logout\n  }\n"): (typeof documents)["\n  mutation AdminLogout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminUsers($search: String, $page: Int, $first: Int!) {\n    adminUsers(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n        email\n        roles\n        createdAt\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminUsers($search: String, $page: Int, $first: Int!) {\n    adminUsers(search: $search, page: $page, first: $first) {\n      data {\n        id\n        name\n        email\n        roles\n        createdAt\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminActivities($logName: String, $page: Int, $first: Int!) {\n    adminActivities(logName: $logName, page: $page, first: $first) {\n      data {\n        id\n        logName\n        event\n        description\n        subjectType\n        subjectId\n        properties\n        createdAt\n        causer {\n          id\n          name\n          email\n        }\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminActivities($logName: String, $page: Int, $first: Int!) {\n    adminActivities(logName: $logName, page: $page, first: $first) {\n      data {\n        id\n        logName\n        event\n        description\n        subjectType\n        subjectId\n        properties\n        createdAt\n        causer {\n          id\n          name\n          email\n        }\n      }\n      paginatorInfo {\n        currentPage\n        lastPage\n        total\n        perPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AdminAssignRole($userId: ID!, $role: Role!) {\n    adminAssignRole(userId: $userId, role: $role) {\n      id\n      roles\n    }\n  }\n"): (typeof documents)["\n  mutation AdminAssignRole($userId: ID!, $role: Role!) {\n    adminAssignRole(userId: $userId, role: $role) {\n      id\n      roles\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;