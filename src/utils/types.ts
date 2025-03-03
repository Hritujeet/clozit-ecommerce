export const DB_URI = process.env.MONGO_URI as string;

export type Credentials = {
    username?: string,
    email: string,
    password: string
}
