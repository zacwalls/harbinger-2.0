import { defineCollection, reference } from 'astro:content'
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod'

const classTypes = defineCollection({
    loader: file('./src/data/classTypes.json', { parser: (text) => JSON.parse(text) }),
    schema: z.object({
        name: z.string(),
        iconPath: z.string(),
    }),
})

const classes = defineCollection({
    loader: glob({
        pattern: "**/*.json",
        base: "./src/data/classes",
        generateId: ({ entry }) => entry.replace(/\.json$/, ""),
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        excerpt: z.string(),
        featuredImagePath: image(),
        // classPageImagePath: image()
    }),
})

const coaches = defineCollection({
    loader: glob({
        pattern: "**/*.json",
        base: "./src/data/coaches",
        generateId: ({ entry }) => entry.replace(/\.json$/, ""),
    }),
    schema: ({ image }) => z.object({
        name: z.string(),
        title: z.string(),
        bio: z.string(),
        discipline: z.string(),
        excerpt: z.string(),
        // headshotImagePath: image(),
        featuredImagePath: image(),

    }),
})

const schedule = defineCollection({
    loader: file('./src/data/schedule.json', { parser: (text) => JSON.parse(text) }),
    schema: z.object({
        schema: z.object({
            className: z.string(),
            startTime: z.coerce.date(),
            endTime: z.coerce.date(),
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

export const collections = { classTypes, classes, coaches }