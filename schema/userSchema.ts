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
union StringOrNumber = String | Int

type Users {
  create(username : String , password : String, roles : [String]) : String,
  login(username : String , password : String, roles : [String]) : String,
  read (skip : Int, limit : Int, lastLogin : StringOrNumber , createdAt : StringOrNumber  , sort : Sort): [UserData]
}`

export default userSchema