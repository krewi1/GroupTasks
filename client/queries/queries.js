import gql from 'graphql-tag';

export const profile = gql`{
        profile{
            id
            nickName
            name
            email
        }
    }`;