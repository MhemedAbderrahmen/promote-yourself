// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `promote-yourself_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const listings = createTable("listings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  logo: varchar("logo", { length: 256 }),
  path: varchar("path", { length: 256 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const categories = createTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const listingsToCategories = pgTable(
  "listings_to_categories",
  {
    listingId: integer("listing_id")
      .notNull()
      .references(() => listings.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.listingId, t.categoryId] }),
  }),
);

export const listingsToCategoriesRelations = relations(
  listingsToCategories,
  ({ one }) => ({
    categories: one(categories, {
      fields: [listingsToCategories.categoryId],
      references: [categories.id],
    }),
    listings: one(listings, {
      fields: [listingsToCategories.listingId],
      references: [listings.id],
    }),
  }),
);

export const listingsRelations = relations(listings, ({ many }) => ({
  listingsToCategories: many(listingsToCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  listingsToCategories: many(listingsToCategories),
}));
