import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%. _*?&])[A-Za-z\d@$!%. _*?&]{8,}$/;

class Transfer {
    public transferBank = z.object({
        email: z.string().email(),
        password: z.string().min(8).regex(passwordRegex),
        beneficiaryAgency: z.string().length(4),
        beneficiaryAccount: z.string().length(7),
        value: z.number(),
        type: z.string().length(3)
    })
}

export default new Transfer()
