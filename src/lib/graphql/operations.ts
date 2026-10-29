import { graphql } from "@/gql";

export const MeQuery = graphql(`
  query AdminMe {
    me {
      id
      name
      email
      roles
      permissions
    }
  }
`);

export const AdminLoginMutation = graphql(`
  mutation AdminLogin($input: LoginInput!) {
    adminLogin(input: $input) {
      token
    }
  }
`);

export const LogoutMutation = graphql(`
  mutation AdminLogout {
    logout
  }
`);

export const AdminUsersQuery = graphql(`
  query AdminUsers($search: String, $page: Int, $first: Int!) {
    adminUsers(search: $search, page: $page, first: $first) {
      data {
        id
        name
        email
        roles
        createdAt
      }
      paginatorInfo {
        currentPage
        lastPage
        total
        perPage
      }
    }
  }
`);

export const AdminActivitiesQuery = graphql(`
  query AdminActivities($logName: String, $page: Int, $first: Int!) {
    adminActivities(logName: $logName, page: $page, first: $first) {
      data {
        id
        logName
        event
        description
        subjectType
        subjectId
        properties
        createdAt
        causer {
          id
          name
          email
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        total
        perPage
      }
    }
  }
`);

export const AdminAssignRoleMutation = graphql(`
  mutation AdminAssignRole($userId: ID!, $role: Role!) {
    adminAssignRole(userId: $userId, role: $role) {
      id
      roles
    }
  }
`);
