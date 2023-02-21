import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%. _*?&])[A-Za-z\d@$!%. _*?&]{8,}$/;

class User {
    public userAuth = z.object({
        email: z.string().email(),
        password: z.string().min(8).regex(passwordRegex)
    })

    public newUserAuth = z.object({
        name: z.string().min(8).max(54),
        email: z.string().email(),
        password: z.string().min(8).regex(passwordRegex)
    })

    public userSchema = z.object({
        id: z.string().min(1),
        name: z.string().min(10).trim(),
        email: z.string().email(),
        password: z.string().min(8).regex(passwordRegex),
        agency: z.string().length(4),
        account: z.string().length(7),
        saldo: z.number(),
        transfers: z.array(
            z.object({
                id: z.string(),
                value: z.number(),
                date: z.string().length(10),
                hour: z.string(),
                type: z.string().length(3),
                operation: z.string() 
            })
        )
    })
    
}

export default new User()
