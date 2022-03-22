import { IRequest } from "../interface"
import { Users } from "../models"
const user = {
    create: async ({ username, password, roles }, req: IRequest) => {
        const { _id } = req
        const reqUser = await Users.findOne({ _id, roles: { $in: ['root', 'update', 'create'] } })

        if (!reqUser) return "Missing roles create or root"

        if (!_id) return 'Unauthenticated'
        username = username?.trim()
        password = password?.trim()

        if (!username || !password) return 'missing username or password'
        const ishave = await Users.findOne({ username })
        if (ishave) return 'Username already exist'

        if (!roles || !roles.length) roles = ['read']


        await Users.create({ username, password, roles })
        return 'created user'
    },
    login: async ({ username, password }) => {
        username = username?.trim()
        password = password?.trim()
        if (!username || !password) return 'missing username or password'

        const user = await Users.findOne({ username, password })

        if (!user) return 'Incorrect username or password'
        user.lastLogin = Date.now()
        return user._id.toString()
    },
    read: async ({skip , limit ,sort , createdAt , lastLogin}, req: IRequest) => {
        skip = Number(skip) || 0
        limit = Number(limit) || 10
        createdAt = new Date(createdAt)
        lastLogin = new Date(lastLogin)
        const query : {[key : string] : any}= {}



        if(createdAt !== 'Invalid Date') {
            query.createdAt = {$gte : createdAt}
        }
        if(lastLogin !== 'Invalid Date') {
            query.lastLogin = {$gte : lastLogin}
        }

        for (const key in sort) {
            if (Object.prototype.hasOwnProperty.call(sort, key)) {
                const sortvalue = sort[key];
                if(sortvalue !== 1 || sortvalue !== -1) sort[key] = 1
            }
        }

        const { _id } = req
        const reqUser = await Users.findOne({ _id, roles: { $in: ['root', 'update', 'create', 'read'] } })
        if(!reqUser ) return "Missing roles"

        return  await Users.find({})
        .skip(skip)
        .limit(limit)
        .select("username lastLogin createdAt")
        .sort(sort)
        .lean()
    }
}

export default user