import gql from 'graphql-tag';

export const addGroup = gql`
    mutation AddGroup($name: String){
        addSong(name: $name) {
            id
            name
        }
    }
`;