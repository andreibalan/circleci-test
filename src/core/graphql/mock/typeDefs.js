export default `
  type User {
    id: String
    name: String    
  }
  
  type Query {
     viewer: User
     users: [User]
  }
`;
