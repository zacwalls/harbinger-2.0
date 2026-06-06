import { defineCollection, reference } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

const classTypes = defineCollection({
    loader: file('./src/data/classTypes.json'),
    schema: z.object({
        name: z.string(),
        iconPath: z.string().startsWith('./'),
    }),
})

const classes = defineCollection({
    loader: file('./src/data/classes.json'),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        excerpt: z.string(),
        featuredImagePath: z.string(),
        classPageImagePath: z.string()
    }),
})

const coaches = defineCollection({
    loader: file('./src/data/coaches.json'),
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        discipline: z.string(),
        excerpt: z.string(),
        headshotImagePath: z.string(),
        featuredImagePath: z.string(),

    }),
})

const schedule = defineCollection({
    loader: file('./src/data/schedule.json'),
    schema: z.object({
        schema: z.object({
            className: z.string(),
            startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
            endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
            classDay: z.enum([
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ]),
            type: reference("classTypes")
        }),
    })
})

export const collections = { classTypes, classes, coaches, schedule }