import { ConfigObject } from "@nestjs/config";

interface AppConfig extends ConfigObject {
    PORT: number;
    URI: string;
}

export const getConfig = (): AppConfig =>  {
    const config : AppConfig = {
        PORT: parseInt(process.env.PORT) || 8000,
        URI: process.env.URI
    }
    return config;
}