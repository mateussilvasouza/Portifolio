import {
  pgEnum,
  pgTable,
  integer,
  text,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core'

export const postCategory = pgEnum('post_category', [
  'Frontend',
  'Backend',
  'Arquitetura',
  'Performance',
  'Cloud',
  'Carreira',
])

export const projectKind = pgEnum('project_kind', ['company', 'study'])

export interface ProjectLink {
  label: string
  href: string
  kind?: 'github'
}

export const settings = pgTable('settings', {
  key: text().primaryKey(),
  value: text().notNull(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const projects = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  kind: projectKind().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  period: text(),
  company: text(),
  role: text(),
  stack: text().array().notNull().default([]),
  links: jsonb().$type<ProjectLink[]>().notNull().default([]),
  metricValue: text(),
  metricLabel: text(),
  privateNote: text(),
  order: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const events = pgTable('events', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: timestamp({ withTimezone: true }).notNull(),
  kind: text(),
  role: text(),
  title: text().notNull(),
  description: text(),
  place: text().notNull(),
  photos: text().array().notNull().default([]),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})

export const contactLinks = pgTable('contact_links', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: text().notNull(),
  handle: text().notNull(),
  href: text().notNull(),
  order: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
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
