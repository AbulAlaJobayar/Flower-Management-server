import { z } from "zod";

const userValidation = z.object({
    name: z.string({
        invalid_type_error: 'User name must be String',
        required_error: 'User name must be required'
    }),
    email: z.string().email().refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'invalid email address'
    }),
    // eslint-disable-next-line no-useless-escape
    password: z.string().min(8, 'password should have at least 8 character').max(20, 'password should be no longer then 20 character').refine((value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/.test(value), 'password must be one digit,one uppercase,one lowercase,one special character'),
    
});
export const userSchemaValidation = {
    userValidation
}