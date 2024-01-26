declare namespace NodeJS{
    export type ProcessEnv={
        NODE_ENV:string;
        PORT:number;
        DB_URL:string;
        BCRYPT_SLAT_ROUND:number;
    }
}