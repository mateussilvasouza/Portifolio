CREATE TABLE "experiences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "experiences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company" text NOT NULL,
	"role" text NOT NULL,
	"period" text NOT NULL,
	"duration" text,
	"product" text,
	"description" text,
	"highlights" text[] DEFAULT '{}' NOT NULL,
	"technologies" text[] DEFAULT '{}' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
