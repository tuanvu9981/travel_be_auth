import { API_PREFIX } from "src/common/constant/api.tags";
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const initApiDocument = (app: INestApplication) => {
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI,
    });

    const documentBuilder = new DocumentBuilder()
        .setTitle('Travel App Backend')
        .setDescription('Travel API documentation')
        .setVersion('ver1')
        .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup(`${API_PREFIX}/:version/docs`, app, document);

}