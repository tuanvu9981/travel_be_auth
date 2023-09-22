import { ConfigObject } from "@nestjs/config";

interface AppConfig extends ConfigObject {
    PORT: number;
    URI: string;
    AWS_SECRET_KEY: string;
    AWS_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_PUBLIC_BUCKET: string;
}

export const getConfig = (): AppConfig =>  {
    const config : AppConfig = {
        PORT: parseInt(process.env.PORT) || 8000,
        URI: process.env.URI,
        // AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        // AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

        AWS_ACCESS_KEY: process.env.LOCAL_AWS_ACCESS_KEY,
        AWS_SECRET_KEY: process.env.LOCAL_SECRET_KEY,

        AWS_REGION: process.env.AWS_REGION,
        AWS_PUBLIC_BUCKET: process.env.AWS_PUBLIC_BUCKET
    }
    return config;
}