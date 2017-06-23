import gql from 'graphql-tag';

export const query = gql`
{
        profile{
            id
            nickName
            name
            email
            group{
                id
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
              }
            }
        }
    }
`;