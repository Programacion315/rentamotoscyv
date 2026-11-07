CREATE TABLE IF NOT EXISTS "public"."page_views" (
    "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "path" "text",
    "created_at" timestamp with time zone NOT NULL DEFAULT "now"()
);

ALTER TABLE "public"."page_views" OWNER TO "postgres";

ALTER TABLE "public"."page_views" ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can record a page view.
CREATE POLICY "page_views_insert_anyone" ON "public"."page_views"
    FOR INSERT TO "authenticated", "anon"
    WITH CHECK (true);

-- Only admins can read the log (it's a private stat, not public data).
CREATE POLICY "page_views_select_admin" ON "public"."page_views"
    FOR SELECT TO "authenticated"
    USING ("public"."is_admin"());

GRANT ALL ON TABLE "public"."page_views" TO "anon";
GRANT ALL ON TABLE "public"."page_views" TO "authenticated";
GRANT ALL ON TABLE "public"."page_views" TO "service_role";

GRANT USAGE, SELECT ON SEQUENCE "public"."page_views_id_seq" TO "anon";
GRANT USAGE, SELECT ON SEQUENCE "public"."page_views_id_seq" TO "authenticated";
GRANT USAGE, SELECT ON SEQUENCE "public"."page_views_id_seq" TO "service_role";
