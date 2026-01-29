


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



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."categories_recalc_coupon_count"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  old_cat uuid;
  new_cat uuid;
BEGIN
  -- Safely assign UUIDs only when not null and not empty
  old_cat := NULL;
  new_cat := NULL;
  IF TG_OP = 'INSERT' THEN
    IF NEW.category IS NOT NULL AND trim(NEW.category::text) <> '' THEN
      old_cat := NULL;
      new_cat := NEW.category;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.category IS NOT NULL AND trim(OLD.category::text) <> '' THEN
      old_cat := OLD.category;
      new_cat := NULL;
    END IF;
  ELSE -- UPDATE
    IF OLD.category IS NOT NULL AND trim(OLD.category::text) <> '' THEN
      old_cat := OLD.category;
    END IF;
    IF NEW.category IS NOT NULL AND trim(NEW.category::text) <> '' THEN
      new_cat := NEW.category;
    END IF;
  END IF;

  -- If no meaningful category change, do nothing
  IF old_cat IS NOT DISTINCT FROM new_cat THEN
    RETURN COALESCE(NEW, OLD);
  END IF;

  -- Decrement old category count
  IF old_cat IS NOT NULL THEN
    UPDATE public.categories
    SET coupon_count = GREATEST(COALESCE(coupon_count,0) - 1, 0)
    WHERE id = old_cat;
  END IF;

  -- Increment new category count
  IF new_cat IS NOT NULL THEN
    UPDATE public.categories
    SET coupon_count = COALESCE(coupon_count,0) + 1
    WHERE id = new_cat;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;


ALTER FUNCTION "public"."categories_recalc_coupon_count"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_coupon"("p_id" "text", "p_title" "text", "p_description" "text", "p_short_description" "text", "p_original_price" numeric, "p_discounted_price" numeric, "p_image_url" "text", "p_category" "text", "p_expires_at" timestamp with time zone, "p_terms_and_conditions" "text", "p_is_active" boolean, "p_quantity" integer, "p_merchant_name" "text", "p_merchant_logo" "text", "p_location" "text", "p_valid_from" timestamp with time zone, "p_valid_until" timestamp with time zone) RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_id TEXT := COALESCE(p_id, gen_random_uuid()::text);
BEGIN
  INSERT INTO public.coupons (
    id, title, description, short_description,
    original_price, discounted_price, image_url, category,
    expires_at, terms_and_conditions, is_active, created_at, updated_at,
    quantity, sold_count, merchant_name, merchant_logo, location, valid_from, valid_until
  ) VALUES (
    v_id, p_title, p_description, p_short_description,
    p_original_price, p_discounted_price, p_image_url, p_category,
    p_expires_at, p_terms_and_conditions, COALESCE(p_is_active, TRUE), now(), now(),
    COALESCE(p_quantity, 0), 0, p_merchant_name, p_merchant_logo, p_location, p_valid_from, p_valid_until
  );
  RETURN v_id;
END;
$$;


ALTER FUNCTION "public"."create_coupon"("p_id" "text", "p_title" "text", "p_description" "text", "p_short_description" "text", "p_original_price" numeric, "p_discounted_price" numeric, "p_image_url" "text", "p_category" "text", "p_expires_at" timestamp with time zone, "p_terms_and_conditions" "text", "p_is_active" boolean, "p_quantity" integer, "p_merchant_name" "text", "p_merchant_logo" "text", "p_location" "text", "p_valid_from" timestamp with time zone, "p_valid_until" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  role_id uuid;
BEGIN
  SELECT id INTO role_id FROM public.roles WHERE slug = 'user' LIMIT 1;
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, COALESCE(role_id, '4e0c711a-5726-4ab9-ad92-de1deed4585d'::uuid));
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."trigger_set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."trigger_set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."categories" (
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "icon" "text" DEFAULT '💪'::"text" NOT NULL,
    "coupon_count" integer DEFAULT 0 NOT NULL,
    "id" "uuid" NOT NULL,
    CONSTRAINT "categories_coupon_count_check" CHECK (("coupon_count" >= 0))
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."coupons" (
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "short_description" "text",
    "original_price" numeric(12,2) NOT NULL,
    "discounted_price" numeric(12,2) NOT NULL,
    "discount_percentage" numeric(5,2) GENERATED ALWAYS AS (
CASE
    WHEN ("original_price" > (0)::numeric) THEN "round"(((("original_price" - "discounted_price") / "original_price") * 100.0), 2)
    ELSE (0)::numeric
END) STORED NOT NULL,
    "image_url" "text",
    "expires_at" timestamp with time zone,
    "terms_and_conditions" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "quantity" integer DEFAULT 0 NOT NULL,
    "sold_count" integer DEFAULT 0 NOT NULL,
    "merchant_name" "text" NOT NULL,
    "merchant_logo" "text",
    "location" "text",
    "valid_from" timestamp with time zone,
    "valid_until" timestamp with time zone,
    "is_featured" boolean DEFAULT false,
    "category" "uuid" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    CONSTRAINT "coupons_check" CHECK ((("discounted_price" >= (0)::numeric) AND ("discounted_price" <= "original_price"))),
    CONSTRAINT "coupons_original_price_check" CHECK (("original_price" >= (0)::numeric)),
    CONSTRAINT "coupons_quantity_check" CHECK (("quantity" >= 0)),
    CONSTRAINT "coupons_sold_count_check" CHECK (("sold_count" >= 0))
);


ALTER TABLE "public"."coupons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "role" "uuid" DEFAULT '4e0c711a-5726-4ab9-ad92-de1deed4585d'::"uuid" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."purchased_coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "coupon_id" "uuid" NOT NULL,
    "stripe_payment_intent_id" "text",
    "stripe_charge_id" "text",
    "stripe_payment_method" "text",
    "paid_amount" numeric NOT NULL,
    "currency" "text" DEFAULT 'usd'::"text" NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "metadata" "jsonb",
    "purchased_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "redeemed_at" timestamp with time zone,
    "expires_at" timestamp with time zone,
    "refund_reason" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "purchased_coupons_paid_amount_check" CHECK (("paid_amount" >= (0)::numeric)),
    CONSTRAINT "purchased_coupons_quantity_check" CHECK (("quantity" > 0))
);


ALTER TABLE "public"."purchased_coupons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."purchased_coupons"
    ADD CONSTRAINT "purchased_coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_slug_key" UNIQUE ("slug");



CREATE INDEX "idx_categories_slug" ON "public"."categories" USING "btree" ("slug");



CREATE INDEX "idx_coupons_expires_at" ON "public"."coupons" USING "btree" ("expires_at");



CREATE INDEX "idx_coupons_merchant_name" ON "public"."coupons" USING "btree" ("merchant_name");



CREATE INDEX "idx_coupons_valid_from_until" ON "public"."coupons" USING "btree" ("valid_from", "valid_until");



CREATE INDEX "idx_purchased_coupons_coupon_id" ON "public"."purchased_coupons" USING "btree" ("coupon_id");



CREATE UNIQUE INDEX "idx_purchased_coupons_payment_intent" ON "public"."purchased_coupons" USING "btree" ("stripe_payment_intent_id") WHERE ("stripe_payment_intent_id" IS NOT NULL);



CREATE INDEX "idx_purchased_coupons_profile_id" ON "public"."purchased_coupons" USING "btree" ("profile_id");



CREATE INDEX "idx_purchased_coupons_status" ON "public"."purchased_coupons" USING "btree" ("status");



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."coupons" FOR EACH ROW EXECUTE FUNCTION "public"."trigger_set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_coupons_update_category_count" AFTER INSERT OR DELETE OR UPDATE ON "public"."coupons" FOR EACH ROW EXECUTE FUNCTION "public"."categories_recalc_coupon_count"();



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "fk_coupons_category_new" FOREIGN KEY ("category") REFERENCES "public"."categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_role_id_fkey" FOREIGN KEY ("role") REFERENCES "public"."roles"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."purchased_coupons"
    ADD CONSTRAINT "purchased_coupons_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."purchased_coupons"
    ADD CONSTRAINT "purchased_coupons_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



CREATE POLICY "Enable read access for all users" ON "public"."categories" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."coupons" FOR SELECT USING (true);



CREATE POLICY "Users can read own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."purchased_coupons" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "purchased_delete_admin_only" ON "public"."purchased_coupons" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."role" = 'c3f1f25e-fe34-4e12-92db-925a30dc77d4'::"uuid")))));



CREATE POLICY "purchased_insert_owner" ON "public"."purchased_coupons" FOR INSERT WITH CHECK (("profile_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "purchased_select_owner_or_admin" ON "public"."purchased_coupons" FOR SELECT USING ((("profile_id" = ( SELECT "auth"."uid"() AS "uid")) OR (EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."role" = 'c3f1f25e-fe34-4e12-92db-925a30dc77d4'::"uuid"))))));



CREATE POLICY "purchased_update_owner_or_admin" ON "public"."purchased_coupons" FOR UPDATE USING ((("profile_id" = ( SELECT "auth"."uid"() AS "uid")) OR (EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."role" = 'c3f1f25e-fe34-4e12-92db-925a30dc77d4'::"uuid")))))) WITH CHECK ((("profile_id" = ( SELECT "auth"."uid"() AS "uid")) OR (EXISTS ( SELECT 1
   FROM "public"."profiles" "p"
  WHERE (("p"."id" = ( SELECT "auth"."uid"() AS "uid")) AND ("p"."role" = 'c3f1f25e-fe34-4e12-92db-925a30dc77d4'::"uuid"))))));



ALTER TABLE "public"."roles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "roles_delete_admin" ON "public"."roles" FOR DELETE TO "authenticated" USING ((("auth"."jwt"() ->> 'user_role'::"text") = 'admin'::"text"));



CREATE POLICY "roles_insert_admin" ON "public"."roles" FOR INSERT TO "authenticated" WITH CHECK ((("auth"."jwt"() ->> 'user_role'::"text") = 'admin'::"text"));



CREATE POLICY "roles_select_authenticated" ON "public"."roles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "roles_update_admin" ON "public"."roles" FOR UPDATE TO "authenticated" USING ((("auth"."jwt"() ->> 'user_role'::"text") = 'admin'::"text")) WITH CHECK ((("auth"."jwt"() ->> 'user_role'::"text") = 'admin'::"text"));



CREATE POLICY "users_insert_purchases" ON "public"."purchased_coupons" FOR INSERT TO "authenticated" WITH CHECK (("profile_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "users_select_their_purchases" ON "public"."purchased_coupons" FOR SELECT TO "authenticated" USING (("profile_id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "users_update_own_purchases" ON "public"."purchased_coupons" FOR UPDATE TO "authenticated" USING (("profile_id" = ( SELECT "auth"."uid"() AS "uid"))) WITH CHECK (("profile_id" = ( SELECT "auth"."uid"() AS "uid")));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."categories_recalc_coupon_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."categories_recalc_coupon_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."categories_recalc_coupon_count"() TO "service_role";



GRANT ALL ON FUNCTION "public"."create_coupon"("p_id" "text", "p_title" "text", "p_description" "text", "p_short_description" "text", "p_original_price" numeric, "p_discounted_price" numeric, "p_image_url" "text", "p_category" "text", "p_expires_at" timestamp with time zone, "p_terms_and_conditions" "text", "p_is_active" boolean, "p_quantity" integer, "p_merchant_name" "text", "p_merchant_logo" "text", "p_location" "text", "p_valid_from" timestamp with time zone, "p_valid_until" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."create_coupon"("p_id" "text", "p_title" "text", "p_description" "text", "p_short_description" "text", "p_original_price" numeric, "p_discounted_price" numeric, "p_image_url" "text", "p_category" "text", "p_expires_at" timestamp with time zone, "p_terms_and_conditions" "text", "p_is_active" boolean, "p_quantity" integer, "p_merchant_name" "text", "p_merchant_logo" "text", "p_location" "text", "p_valid_from" timestamp with time zone, "p_valid_until" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_coupon"("p_id" "text", "p_title" "text", "p_description" "text", "p_short_description" "text", "p_original_price" numeric, "p_discounted_price" numeric, "p_image_url" "text", "p_category" "text", "p_expires_at" timestamp with time zone, "p_terms_and_conditions" "text", "p_is_active" boolean, "p_quantity" integer, "p_merchant_name" "text", "p_merchant_logo" "text", "p_location" "text", "p_valid_from" timestamp with time zone, "p_valid_until" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."trigger_set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."trigger_set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."trigger_set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON TABLE "public"."coupons" TO "anon";
GRANT ALL ON TABLE "public"."coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."coupons" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."purchased_coupons" TO "anon";
GRANT ALL ON TABLE "public"."purchased_coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."purchased_coupons" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";









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































