import {
  pgEnum,
  pgTable,
  integer,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

export const postCategory = pgEnum('post_category', [
  'Frontend',
  'Backend',
  'Arquitetura',
  'Performance',
  'Cloud',
  'Carreira',
])

export const settings = pgTable('settings', {
  key: text().primaryKey(),
  value: text().notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  excerpt: text().notNull(),
  content: text().notNull(),
  category: postCategory().notNull(),
  tags: text().array().notNull().default([]),
  readingTimeMinutes: integer().notNull(),
  featured: boolean().notNull().default(false),
  publishedAt: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
