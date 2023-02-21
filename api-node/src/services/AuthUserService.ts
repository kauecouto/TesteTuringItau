import db from "../data/data";
import User from "../models/User";
import { z } from 'zod'

type user = z.infer<typeof User.userSchema>
type userAuth = z.infer<typeof User.userAuth>

class AuthUserService {
    validUser(body: userAuth): user[] {
        return db.users.filter(user => user.email === body.email && user.password === body.password)
    }
}

export default AuthUserService