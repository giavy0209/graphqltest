export default interface IUser {
    roles : string[],
    username : string,
    password: string,
    lastLogin : Date | Number,
    createdAt : Date | number,
    updateAt : Date | number,
}