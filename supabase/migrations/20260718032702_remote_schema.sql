


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."locations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."locations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "label" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_specs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "label" "text" NOT NULL,
    "value" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."product_specs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "brand" "text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "location_id" "uuid" NOT NULL,
    "image_path" "text",
    "category" "text",
    "is_featured" boolean DEFAULT false NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sedes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "location_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "address" "text" NOT NULL,
    "map_embed_url" "text",
    "sort_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."sedes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_contact" (
    "id" integer DEFAULT 1 NOT NULL,
    "phone" "text" DEFAULT ''::"text" NOT NULL,
    "email" "text" DEFAULT ''::"text" NOT NULL,
    "whatsapp" "text" DEFAULT ''::"text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "site_contact_id_check" CHECK (("id" = 1))
);


ALTER TABLE "public"."site_contact" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."social_links" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "label" "text" NOT NULL,
    "url" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."social_links" OWNER TO "postgres";


ALTER TABLE ONLY "public"."locations"
    ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."locations"
    ADD CONSTRAINT "locations_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."product_features"
    ADD CONSTRAINT "product_features_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_specs"
    ADD CONSTRAINT "product_specs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."sedes"
    ADD CONSTRAINT "sedes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."site_contact"
    ADD CONSTRAINT "site_contact_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."social_links"
    ADD CONSTRAINT "social_links_pkey" PRIMARY KEY ("id");



CREATE INDEX "locations_active_sort_idx" ON "public"."locations" USING "btree" ("is_active", "sort_order");



CREATE INDEX "product_features_product_id_idx" ON "public"."product_features" USING "btree" ("product_id", "sort_order");



CREATE INDEX "product_specs_product_id_idx" ON "public"."product_specs" USING "btree" ("product_id", "sort_order");



CREATE INDEX "products_active_featured_idx" ON "public"."products" USING "btree" ("is_active", "is_featured");



CREATE INDEX "products_active_location_idx" ON "public"."products" USING "btree" ("is_active", "location_id");



CREATE INDEX "products_brand_idx" ON "public"."products" USING "btree" ("brand");



CREATE INDEX "products_location_id_idx" ON "public"."products" USING "btree" ("location_id");



CREATE INDEX "products_name_idx" ON "public"."products" USING "btree" ("name");



CREATE INDEX "products_updated_at_idx" ON "public"."products" USING "btree" ("updated_at" DESC);



CREATE INDEX "sedes_active_sort_idx" ON "public"."sedes" USING "btree" ("is_active", "sort_order");



CREATE INDEX "sedes_location_id_idx" ON "public"."sedes" USING "btree" ("location_id");



CREATE INDEX "social_links_active_sort_idx" ON "public"."social_links" USING "btree" ("is_active", "sort_order");



CREATE OR REPLACE TRIGGER "locations_set_updated_at" BEFORE UPDATE ON "public"."locations" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "products_set_updated_at" BEFORE UPDATE ON "public"."products" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "sedes_set_updated_at" BEFORE UPDATE ON "public"."sedes" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "site_contact_set_updated_at" BEFORE UPDATE ON "public"."site_contact" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "social_links_set_updated_at" BEFORE UPDATE ON "public"."social_links" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



ALTER TABLE ONLY "public"."product_features"
    ADD CONSTRAINT "product_features_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_specs"
    ADD CONSTRAINT "product_specs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."sedes"
    ADD CONSTRAINT "sedes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE RESTRICT;



ALTER TABLE "public"."locations" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "locations_delete_admin" ON "public"."locations" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "locations_insert_admin" ON "public"."locations" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "locations_select_public" ON "public"."locations" FOR SELECT TO "authenticated", "anon" USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "locations_update_admin" ON "public"."locations" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."product_features" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "product_features_delete_admin" ON "public"."product_features" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "product_features_insert_admin" ON "public"."product_features" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "product_features_select_public" ON "public"."product_features" FOR SELECT TO "authenticated", "anon" USING (("public"."is_admin"() OR (EXISTS ( SELECT 1
   FROM "public"."products" "p"
  WHERE (("p"."id" = "product_features"."product_id") AND ("p"."is_active" = true))))));



CREATE POLICY "product_features_update_admin" ON "public"."product_features" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."product_specs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "product_specs_delete_admin" ON "public"."product_specs" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "product_specs_insert_admin" ON "public"."product_specs" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "product_specs_select_public" ON "public"."product_specs" FOR SELECT TO "authenticated", "anon" USING (("public"."is_admin"() OR (EXISTS ( SELECT 1
   FROM "public"."products" "p"
  WHERE (("p"."id" = "product_specs"."product_id") AND ("p"."is_active" = true))))));



CREATE POLICY "product_specs_update_admin" ON "public"."product_specs" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "products_delete_admin" ON "public"."products" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "products_insert_admin" ON "public"."products" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "products_select_public" ON "public"."products" FOR SELECT TO "authenticated", "anon" USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "products_update_admin" ON "public"."products" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."sedes" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "sedes_delete_admin" ON "public"."sedes" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "sedes_insert_admin" ON "public"."sedes" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "sedes_select_public" ON "public"."sedes" FOR SELECT TO "authenticated", "anon" USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "sedes_update_admin" ON "public"."sedes" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."site_contact" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "site_contact_insert_admin" ON "public"."site_contact" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "site_contact_select_public" ON "public"."site_contact" FOR SELECT TO "authenticated", "anon" USING (true);



CREATE POLICY "site_contact_update_admin" ON "public"."site_contact" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



ALTER TABLE "public"."social_links" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "social_links_delete_admin" ON "public"."social_links" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "social_links_insert_admin" ON "public"."social_links" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "social_links_select_public" ON "public"."social_links" FOR SELECT TO "authenticated", "anon" USING ((("is_active" = true) OR "public"."is_admin"()));



CREATE POLICY "social_links_update_admin" ON "public"."social_links" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































REVOKE ALL ON FUNCTION "public"."is_admin"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "anon";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."locations" TO "anon";
GRANT ALL ON TABLE "public"."locations" TO "authenticated";
GRANT ALL ON TABLE "public"."locations" TO "service_role";



GRANT ALL ON TABLE "public"."product_features" TO "anon";
GRANT ALL ON TABLE "public"."product_features" TO "authenticated";
GRANT ALL ON TABLE "public"."product_features" TO "service_role";



GRANT ALL ON TABLE "public"."product_specs" TO "anon";
GRANT ALL ON TABLE "public"."product_specs" TO "authenticated";
GRANT ALL ON TABLE "public"."product_specs" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."sedes" TO "anon";
GRANT ALL ON TABLE "public"."sedes" TO "authenticated";
GRANT ALL ON TABLE "public"."sedes" TO "service_role";



GRANT ALL ON TABLE "public"."site_contact" TO "anon";
GRANT ALL ON TABLE "public"."site_contact" TO "authenticated";
GRANT ALL ON TABLE "public"."site_contact" TO "service_role";



GRANT ALL ON TABLE "public"."social_links" TO "anon";
GRANT ALL ON TABLE "public"."social_links" TO "authenticated";
GRANT ALL ON TABLE "public"."social_links" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";



































