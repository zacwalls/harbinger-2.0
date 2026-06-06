import { defineCollection, reference } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

const classTypes = defineCollection({
    loader: file('./src/data/classTypes.json'),
    schema: z.object({
        name: z.string(),
        iconPath: z.string().startsWith('/'),
    }),
})

const classes = defineCollection({
    loader: file('./src/data/classes.json'),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        excerpt: z.string(),
        featuredImagePath: z.string().startsWith('/'),
        classPageImagePath: z.string().startsWith('/'),
        type: reference("classTypes"),
    }),
})

const coaches = defineCollection({
    loader: file('./src/data/coaches.json'),
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        discipline: z.string(),
        headshotImagePath: z.string().startsWith('/'),
        featuredImagePath: z.string().startsWith('/'),

    }),
})

const schedule = defineCollection({
    loader: file('./src/data/schedule.json'),
    schema: z.object({
        schema: z.object({
            headshotImagePath: z.string().startsWith('/'),
            featuredImagePath: z.string().startsWith('/'),
        }),
    })
})

export const collections = { classTypes, classes, coaches, schedule }