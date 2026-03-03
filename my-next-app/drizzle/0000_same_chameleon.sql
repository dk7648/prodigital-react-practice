CREATE TABLE "my-next-app"."sample_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sample_id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"username" varchar(20) NOT NULL,
	"content" text,
	"age" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_deleted" boolean DEFAULT false,
	CONSTRAINT "sample_table_username_unique" UNIQUE("username"),
	CONSTRAINT "sample_age_check1" CHECK ("my-next-app"."sample_table"."age" > 20)
);
--> statement-breakpoint
CREATE INDEX "sample_idx_title" ON "my-next-app"."sample_table" USING btree ("title");