ALTER TABLE "my-next-app"."post_comments" DROP CONSTRAINT "post_comments_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "my-next-app"."post_comments" ADD CONSTRAINT "post_comments_post_id_blogs_id_fk" FOREIGN KEY ("post_id") REFERENCES "my-next-app"."blogs"("id") ON DELETE set null ON UPDATE no action;