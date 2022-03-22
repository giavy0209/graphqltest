import {Schema, model} from 'mongoose'
import { IUser } from '../interface'

const UserSchema = new Schema<IUser>({
    username : {type : String, required : true , unique : true},
    password : {type : String , required : true},
    roles : [{type : String}],
    lastLogin : {type : Date}
}, {
    timestamps : true
})


const Users = model<IUser>('users' , UserSchema)

Users.findOne({username : 'root'}).exec((err, data) => {
    if(!data) {
        Users.create({
            username : 'root',
            password : 'root'
        })
    }
})
export default Users