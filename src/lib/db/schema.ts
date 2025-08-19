import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  decimal,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users table (extends Clerk user data)
export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),
  role: text('role').default('customer').notNull(), // customer, admin
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Products table
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  comparePrice: decimal('compare_price', { precision: 10, scale: 2 }),
  costPrice: decimal('cost_price', { precision: 10, scale: 2 }),
  sku: text('sku').unique(),
  barcode: text('barcode'),
  weight: decimal('weight', { precision: 8, scale: 2 }),
  dimensions: jsonb('dimensions'), // {length, width, height}
  categoryId: uuid('category_id').references(() => categories.id),
  isActive: boolean('is_active').default(true).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isOnSale: boolean('is_on_sale').default(false).notNull(),
  salePercentage: integer('sale_percentage'),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  lowStockThreshold: integer('low_stock_threshold').default(5),
  tags: text('tags').array(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Product Images table
export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  url: text('url').notNull(),
  alt: text('alt'),
  isPrimary: boolean('is_primary').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Product Variants table (for different sizes, colors, etc.)
export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(), // e.g., "Size", "Color"
  value: text('value').notNull(), // e.g., "Large", "Red"
  priceModifier: decimal('price_modifier', { precision: 10, scale: 2 }).default(
    '0'
  ),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  sku: text('sku'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  orderNumber: text('order_number').notNull().unique(),
  status: text('status').default('pending').notNull(), // pending, processing, shipped, delivered, cancelled
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0'),
  shippingAmount: decimal('shipping_amount', {
    precision: 10,
    scale: 2,
  }).default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  paymentStatus: text('payment_status').default('pending').notNull(), // pending, paid, failed, refunded
  paymentMethod: text('payment_method'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  shippingAddress: jsonb('shipping_address'),
  billingAddress: jsonb('billing_address'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Order Items table
export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .references(() => orders.id, { onDelete: 'cascade' })
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  productVariantId: uuid('product_variant_id').references(
    () => productVariants.id
  ),
  productName: text('product_name').notNull(),
  productSku: text('product_sku'),
  quantity: integer('quantity').notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Shopping Cart table
export const cartItems = pgTable('cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  productVariantId: uuid('product_variant_id').references(
    () => productVariants.id
  ),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Wishlist table
export const wishlistItems = pgTable('wishlist_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Product Reviews table
export const productReviews = pgTable('product_reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  rating: integer('rating').notNull(), // 1-5 stars
  title: text('title'),
  comment: text('comment'),
  isVerified: boolean('is_verified').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Coupons table
export const coupons = pgTable('coupons', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull().unique(),
  description: text('description'),
  discountType: text('discount_type').notNull(), // percentage, fixed_amount
  discountValue: decimal('discount_value', {
    precision: 10,
    scale: 2,
  }).notNull(),
  minimumOrderAmount: decimal('minimum_order_amount', {
    precision: 10,
    scale: 2,
  }),
  maximumDiscountAmount: decimal('maximum_discount_amount', {
    precision: 10,
    scale: 2,
  }),
  usageLimit: integer('usage_limit'),
  usedCount: integer('used_count').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  validFrom: timestamp('valid_from').notNull(),
  validUntil: timestamp('valid_until').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  reviews: many(productReviews),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  variants: many(productVariants),
  orderItems: many(orderItems),
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  reviews: many(productReviews),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.productVariantId],
    references: [productVariants.id],
  }),
}))
