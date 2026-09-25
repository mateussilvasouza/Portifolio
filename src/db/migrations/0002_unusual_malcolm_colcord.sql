CREATE TYPE "public"."project_kind" AS ENUM('company', 'study');--> statement-breakpoint
CREATE TABLE "contact_links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contact_links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"label" text NOT NULL,
	"handle" text NOT NULL,
	"href" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" timestamp with time zone NOT NULL,
	"kind" text,
	"role" text,
	"title" text NOT NULL,
	"description" text,
	"place" text NOT NULL,
	"photos" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"kind" "project_kind" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"period" text,
	"company" text,
	"role" text,
	"stack" text[] DEFAULT '{}' NOT NULL,
	"links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"metric_value" text,
	"metric_label" text,
	"private_note" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
