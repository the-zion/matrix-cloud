import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs';
import {visualizer} from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgSprites from 'rollup-plugin-svg-sprites'

import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import {
    presetAttributify,
    presetIcons,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    // base: "./",
    resolve: {
        alias: {
            '~/': `${pathSrc}/`,
        },
    },
    // build: {
    //     // minify: 'terser',
    //     // cssCodeSplit: true,
    //     // chunkSizeWarningLimit: 1000,
    //     // terserOptions: {
    //     //     compress: {
    //     //         drop_console: true,
    //     //         drop_debugger: true,
    //     //         pure_funcs: ['console.log'],
    //     //     },
    //     //     output: {
    //     //         comments: true,
    //     //     },
    //     // },
    //     rollupOptions: {
    //         input: 'index.html',
    //         output: {
    //             chunkFileNames: 'static/js/[name]-[hash].js',
    //             entryFileNames: 'static/js/[name]-[hash].js',
    //             assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //             // manualChunks(id) {
    //             //     if (id.includes('node_modules')) {
    //             //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //             //     }
    //             // }
    //         }
    //     }
    // },
    plugins: [
        vue(),
        // AutoImport({
        //     resolvers: [ElementPlusResolver()],
        // }),
        // Components({
        //     resolvers: [ElementPlusResolver()],
        // }),
        Components({
            extensions: ['vue', 'md'],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
            dts: 'src/components.d.ts',
        }),

        prismjs({
            languages: 'all',
            "plugins": ["line-numbers"],
            "theme": "default",
            "css": true
            //  languages: 'all',
        }),

        // https://github.com/antfu/unocss
        // see unocss.config.ts for config
        Unocss({
            presets: [
                presetUno(),
                presetAttributify(),
                presetIcons({
                    scale: 1.2,
                    warn: true,
                }),
            ],
            transformers: [
                transformerDirectives(),
                transformerVariantGroup(),
            ]
        }),
        // visualizer(),
        // viteCompression({
        //     verbose: true,
        //     disable: false,
        //     threshold: 10240,
        //     algorithm: 'gzip',
        //     ext: '.gz',
        // }),
        // legacy({
        //     targets: ['defaults', 'not IE 11']
        // }),
        // viteImagemin({
        //     gifsicle: {
        //         optimizationLevel: 7,
        //         interlaced: false,
        //     },
        //     optipng: {
        //         optimizationLevel: 7,
        //     },
        //     mozjpeg: {
        //         quality: 50,
        //     },
        //     pngquant: {
        //         quality: [0.8, 0.9],
        //         speed: 4,
        //     },
        //     svgo: {
        //         plugins: [
        //             {
        //                 name: 'removeViewBox',
        //             },
        //             {
        //                 name: 'removeEmptyAttrs',
        //                 active: false,
        //             },
        //         ],
        //     },
        // }),
    ],
})