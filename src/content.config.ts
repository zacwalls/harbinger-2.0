import { defineCollection, reference } from 'astro:content'
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod'

const classTypes = defineCollection({
    loader: glob({ base: './src/content/class_types', pattern: '**/*.json' }),
    schema: z.object({
        name: z.string(),
        iconPath: z.string().startsWith('/'),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    }),
})

const classes = defineCollection({
    loader: glob({ base: './src/content/classes', pattern: '**/*.json' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        excerpt: z.string(),
        featuredImagePath: z.string().startsWith('/'),
        classPageImagePath: z.string().startsWith('/'),
        type: reference("classTypes"),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    }),
})

const coaches = defineCollection({
    loader: glob({ base: './src/content/coaches', pattern: '**/*.json' }),
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        discipline: z.string(),
        headshotImagePath: z.string().startsWith('/'),
        featuredImagePath: z.string().startsWith('/'),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    }),
})

export const collections = { classes, classTypes, coaches }