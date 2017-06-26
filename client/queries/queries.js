import gql from 'graphql-tag';

export const query = gql`
query Profile($userId: ID){
        profile(userId: $userId){
            id
            nickName
            name
            email
            group{
                id
                budgetInfo
                budget{
                  id
                  expDate
                  value
                }
              leader{
                id
              }
              users{
                id
                nickName
              }
              events{
                id
                name
                expDate
                value
                user {
                  id
                }
              }
            }
        }
    }
`;