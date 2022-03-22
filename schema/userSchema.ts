const userSchema = `
type UserData {
  username : String,
  lastLogin : String,
  createdAt : String
}
input Sort {
  lastLogin : Int,
  createdAt : Int
}

type Users {
  create(username : String , password : String, roles : [String]) : String,
  login(username : String , password : String, roles : [String]) : String,
  read (skip : Int, limit : Int, lastLogin : String , createdAt : String  , sort : Sort): [UserData]
}`

export default userSchema