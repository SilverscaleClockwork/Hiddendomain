import type { ExternalImageService as BaseImageService } from 'astro';

const CMS_URL = import.meta.env.DIRECTUS_URL;
const CDN_URL = import.meta.env.CDN_URL;

const BunnyService: BaseImageService = {

    

    getURL(options) {
        const { src, width, quality, format } = options;

        const src_url = typeof src == 'string' ? src : src.src;
        
        const bunnySrc = src_url.replace(CMS_URL, CDN_URL);
        const url = new URL(bunnySrc, CDN_URL);
        if (width) url.searchParams.set('width', width.toString());
        if (quality) url.searchParams.set('quality', quality.toString());
        
        if (format) url.searchParams.set('format', format);
        else url.searchParams.set('format', 'webp');

        return url.toString();
    },
  
    getSrcSet(options) {
        const { widths } = options;
        
        return widths?.map((width) => ({
        transform: { ...options, width },
        descriptor: `${width}w`,
        })) ?? [
            {
                transform: options
            }
        ];
    },

    getHTMLAttributes(options) {
        const { src, width, height, format, quality, densities, widths, formats, ...attributes } = options;
        return {
        ...attributes,
        width,
        height,
        loading: attributes.loading ?? 'lazy',
        decoding: attributes.decoding ?? 'async',
        };
    },

//   validateOptions(options) {
//     return options;
//   }
};

export default BunnyService;