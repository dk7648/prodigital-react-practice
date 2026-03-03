ALTER TABLE "my-next-app"."blogs" DROP CONSTRAINT "blogs_author_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "my-next-app"."blogs" DROP COLUMN "author_id";