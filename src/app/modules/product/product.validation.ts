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
    color: z.string({
        invalid_type_error: 'color must be string',
        required_error: 'color must be required'
    }),
    category: z.string({
        invalid_type_error: 'category must be string',
        required_error: 'category must be required'
    }),
    size: z.string({
        invalid_type_error: 'size must be string',
        required_error: 'size must be required'
    }),
    fragrance: z.string({
        invalid_type_error: 'fragrance must be string',
        required_error: 'fragrance must be required'
    }),
    image: z.string({
        invalid_type_error: 'fragrance must be string',
        required_error: 'fragrance must be required'
    }),
});
export const productSchemaValidation={
    productValidation
}