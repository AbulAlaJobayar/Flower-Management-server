import { z } from "zod";

const productValidation = z.object({
    name: z.string({
        invalid_type_error: 'Name must be string',
        required_error: 'name must be required'
    }),
    price: z.number({
        invalid_type_error:'price must be number',
        required_error:'price must be required'
    }),
    quantity: z.number({
        invalid_type_error:'quantity must be number',
        required_error:'quantity must be required'
    }),
    

});
export const productSchemaValidation={
    productValidation
}