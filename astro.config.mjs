// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import BunnyService from './src/bunny-service';

// https://astro.build/config
export default defineConfig({
    image: {
        service: {
            entrypoint: 'src/bunny-service',
            config: {}
        },
        domains: [
            'cdn.hiddendoma.in',
            'cms.hiddendoma.in',
        ]
    },
    site: 'https://hiddendoma.in',
    integrations: [sitemap()],
});