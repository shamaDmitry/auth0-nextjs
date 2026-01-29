SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict cCoPhaa85S0kQ3gdU1wGcp2wTpbgEnAp1HYT3YIqJdKXKu01nSqFveKWlxUSAi4

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('cb91d559-d4c6-462b-adc0-a6c089561ed2', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', 'eb280d97-f06c-4b1f-acdf-82e1d772e2c0', 's256', '7bEwBE6Hp8fbR93L3g85nsujiVMoCLt8FsiNJLrKi2c', 'email', '', '', '2025-12-30 08:31:13.146917+00', '2025-12-30 08:33:21.741095+00', 'email/signup', '2025-12-30 08:33:21.740451+00'),
	('aebcb440-bfe0-4cc1-9f88-fa69409f29c7', NULL, 'dbd66370-da0b-4a58-9bad-fa66d83af09b', 's256', 'yUObz1BwabZsD5523-I9N5qKmDwy1ftOJSQ-YFTQfw4', 'github', '', '', '2026-01-23 12:31:02.187598+00', '2026-01-23 12:31:02.187598+00', 'oauth', NULL),
	('77d80211-bf70-4639-be9c-71e4c34f830f', NULL, '98ae4737-c559-40c4-8f14-d76d9223fef2', 's256', '4dsUR2Jbn2D3sEY3pmNcMqhekDZezPDAe7TA1eJEKyI', 'github', '', '', '2026-01-23 12:51:14.317198+00', '2026-01-23 12:51:14.317198+00', 'oauth', NULL),
	('ec51fdbd-cfcd-41b7-a481-54b841d0d8da', NULL, 'a9b1f03a-faa2-4dc6-ac22-447ab76a9c78', 's256', 'N-bfq7tHkbbaN5WZFiTd1Pfsfw3oECABvmY-fQKWRu8', 'github', '', '', '2026-01-23 12:51:32.296446+00', '2026-01-23 12:51:32.296446+00', 'oauth', NULL),
	('eba2f52c-2a20-4ebb-bb84-39d49537d304', NULL, 'b38a8ffa-1d10-496b-99e4-4e5f1bc3a264', 's256', 'cbc09nXTuOqIzMY5GBhq9xOP8UFGbI01YvE0iRNwS10', 'github', '', '', '2026-01-23 12:52:22.904175+00', '2026-01-23 12:52:22.904175+00', 'oauth', NULL),
	('9b8111ec-fb6b-45df-9804-e2ce42036e83', NULL, '552b0a09-aa13-49a1-a4bb-ad4897cbd09a', 's256', 'w8TE94AXQpemyvq-HsJwgr5NBbo_1LSUfMOPf5tgk40', 'github', '', '', '2026-01-23 13:19:54.202353+00', '2026-01-23 13:19:54.202353+00', 'oauth', NULL),
	('8029e0e6-00ba-4e0e-9db6-6af6c015602e', NULL, '37480548-7cea-44e8-94cd-ee0377469fad', 's256', 'rNLG0aNMUzAp9xsRkJmlRiXNVXrYH09heGuejqktWjk', 'github', '', '', '2026-01-23 13:20:10.595882+00', '2026-01-23 13:20:10.595882+00', 'oauth', NULL),
	('7c34ae6d-044b-43ad-9a8a-0c8ea525fe48', NULL, 'fabada16-d112-47d2-98f5-11a62f083daf', 's256', '6ouYE6EL58qI_JM-vJURMVmoKgcjuoiS5eKRi35foPU', 'github', '', '', '2026-01-23 15:26:05.875891+00', '2026-01-23 15:26:05.875891+00', 'oauth', NULL),
	('dae56561-6a0c-4b6c-aa88-03ae8cadc069', NULL, 'e028064c-0ba2-4e6a-9c36-d4c556eeefb6', 's256', '0m4DUW26mfc-cBKVjc23N6-Jo-1hkwLDN3i5XH9IbVw', 'github', '', '', '2026-01-27 08:26:17.10844+00', '2026-01-27 08:26:17.10844+00', 'oauth', NULL),
	('7c07e6c4-887b-41be-994f-743266e72321', NULL, 'f7415100-d9b0-4384-9c20-d808f21db81a', 's256', 'WBzW_WUEyZCJkv7NfaiL56ejo4npt8RdrsKeAiLmxoo', 'github', '', '', '2026-01-27 08:31:48.291554+00', '2026-01-27 08:31:48.291554+00', 'oauth', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', 'authenticated', 'authenticated', 'shama.dmitry@gmail.com', '$2a$10$6oepsXGPm0G2QPAWA8DCm.friv1Yvm/jZLppJHfqPQM8sfj6HFSZ.', '2025-12-30 08:33:21.690589+00', NULL, '', '2025-12-30 08:31:13.147577+00', '', NULL, '', '', NULL, '2026-01-28 13:52:42.923829+00', '{"provider": "email", "providers": ["email", "github"]}', '{"iss": "https://api.github.com", "sub": "12239636", "email": "shama.dmitry@gmail.com", "user_name": "shamaDmitry", "avatar_url": "https://avatars.githubusercontent.com/u/12239636?v=4", "provider_id": "12239636", "email_verified": true, "phone_verified": false, "preferred_username": "shamaDmitry"}', NULL, '2025-12-30 08:31:13.137124+00', '2026-01-29 08:40:00.083723+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('1fbefc96-d10b-44e7-97f9-a439cd9935f5', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '{"sub": "1fbefc96-d10b-44e7-97f9-a439cd9935f5", "email": "shama.dmitry@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-12-30 08:31:13.14221+00', '2025-12-30 08:31:13.142269+00', '2025-12-30 08:31:13.142269+00', '4dfd36fc-0375-467e-8a60-ec0d8c0e3e8a'),
	('12239636', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '{"iss": "https://api.github.com", "sub": "12239636", "email": "shama.dmitry@gmail.com", "user_name": "shamaDmitry", "avatar_url": "https://avatars.githubusercontent.com/u/12239636?v=4", "provider_id": "12239636", "email_verified": true, "phone_verified": false, "preferred_username": "shamaDmitry"}', 'github', '2026-01-23 13:19:10.78375+00', '2026-01-23 13:19:10.783808+00', '2026-01-26 13:26:39.163886+00', '3babbaa8-c4ce-4e76-9054-302771e1a93b');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('a9cf1399-81bf-43e3-b1c0-a78844b49ac7', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '2026-01-28 13:52:42.925253+00', '2026-01-29 08:40:00.093034+00', NULL, 'aal1', NULL, '2026-01-29 08:40:00.092919', 'Next.js Middleware', '88.154.87.250', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('a9cf1399-81bf-43e3-b1c0-a78844b49ac7', '2026-01-28 13:52:42.968616+00', '2026-01-28 13:52:42.968616+00', 'password', '849a1f62-bbb8-4ce5-9f40-7321a5f29915');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 107, 'm6yo572hqyfm', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', true, '2026-01-28 13:52:42.951224+00', '2026-01-29 06:25:49.735203+00', NULL, 'a9cf1399-81bf-43e3-b1c0-a78844b49ac7'),
	('00000000-0000-0000-0000-000000000000', 108, 'qlriqvqegmpj', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', true, '2026-01-29 06:25:49.749712+00', '2026-01-29 07:24:40.427946+00', 'm6yo572hqyfm', 'a9cf1399-81bf-43e3-b1c0-a78844b49ac7'),
	('00000000-0000-0000-0000-000000000000', 109, 'phwfdwbxbpeb', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', true, '2026-01-29 07:24:40.455009+00', '2026-01-29 08:40:00.065259+00', 'qlriqvqegmpj', 'a9cf1399-81bf-43e3-b1c0-a78844b49ac7'),
	('00000000-0000-0000-0000-000000000000', 110, '3754c4x4ykow', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', false, '2026-01-29 08:40:00.076106+00', '2026-01-29 08:40:00.076106+00', 'phwfdwbxbpeb', 'a9cf1399-81bf-43e3-b1c0-a78844b49ac7');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("name", "slug", "icon", "coupon_count", "id") VALUES
	('Education', 'education', '📚', 1, 'bea50ba8-cc9f-4940-862d-fffe31473716'),
	('Health & Fitness', 'health-fitness', '💪', 1, 'ceecb9e0-37a0-4916-a60f-17b56b17bfef'),
	('Travel', 'travel', '✈️', 1, 'dd033c00-9893-4980-b25a-07de0382dc71'),
	('Food & Drink', 'food-and-drink', '🍔', 1, '6d03da8f-1eb3-47a5-b539-7b97a628c925'),
	('Electronics', 'electronics', '📱', 1, '3e89da66-acb9-415b-aa99-a4c756e65dd3'),
	('Shopping', 'shopping', '🛍️', 1, '5b43dd41-d8de-4048-a9df-9625c7995d98'),
	('Entertainment', 'entertainment', '🎭', 1, '15283a49-3ff4-476c-86c0-9d15119b15f6'),
	('Restaurants', 'restaurants', '🍽️', 1, '72834ef1-3073-40e9-a2fe-0e267e612a03'),
	('Beauty & Spa', 'beauty-&-spa', '💆', 0, 'ee5ae94d-afaa-473c-ad6d-b01c117ab869');


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."coupons" ("title", "description", "short_description", "original_price", "discounted_price", "image_url", "expires_at", "terms_and_conditions", "is_active", "created_at", "updated_at", "quantity", "sold_count", "merchant_name", "merchant_logo", "location", "valid_from", "valid_until", "is_featured", "category", "id") VALUES
	('Movie Night Bundle', 'Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at Premium Cinemas locations.', '2 tickets + popcorn + drinks', 50.00, 29.00, 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', '2025-01-31 00:00:00+00', 'Valid at participating locations. Not valid for premium formats (IMAX, 3D).', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 200, 156, 'Premium Cinemas', NULL, 'Multiple Locations', '2024-12-01 00:00:00+00', '2025-01-31 00:00:00+00', false, 'bea50ba8-cc9f-4940-862d-fffe31473716', '9c93e586-62d6-4f55-930f-560e21db2782'),
	('Online Course Bundle', 'Access 5 premium online courses covering web development, design, and marketing. Learn at your own pace with lifetime access.', '5 courses with lifetime access', 500.00, 149.00, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', '2025-06-30 00:00:00+00', 'One account per purchase. Non-transferable. Courses delivered via email.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 500, 289, 'SkillUp Academy', NULL, NULL, '2024-12-01 00:00:00+00', '2025-06-30 00:00:00+00', false, 'ceecb9e0-37a0-4916-a60f-17b56b17bfef', 'd7ddf06f-44ee-42fb-9587-a7030f709d01'),
	('Smart Watch Pro', 'The latest Smart Watch Pro with heart rate monitoring, GPS, and 7-day battery life. Perfect for fitness enthusiasts and tech lovers.', 'Premium smartwatch with health features', 350.00, 249.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', '2025-01-15 00:00:00+00', 'Limited stock. Includes 1-year warranty. Free shipping on orders over $200.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 50, 38, 'TechZone', NULL, 'Online', '2024-12-01 00:00:00+00', '2025-01-15 00:00:00+00', false, 'dd033c00-9893-4980-b25a-07de0382dc71', 'ea50acb2-60ad-4590-b00c-de27a54ffd96'),
	('Full Spa Day Package', 'Treat yourself to a complete spa day including a 60-minute massage, facial treatment, sauna access, and a healthy lunch. Unwind and rejuvenate in our luxurious spa environment.', 'Massage, facial, sauna & lunch', 200.00, 99.00, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', '2025-02-28 00:00:00+00', 'Appointment required. 24-hour cancellation policy applies. Valid Monday-Thursday only.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 50, 23, 'Serenity Spa', NULL, 'Wellness District', '2024-12-01 00:00:00+00', '2025-02-28 00:00:00+00', true, '6d03da8f-1eb3-47a5-b539-7b97a628c925', '89846dd6-cc35-4a8f-803e-c55b468d98e8'),
	('50% Off Fine Dining Experience', 'Enjoy an exquisite five-course meal at the renowned La Maison restaurant. This exclusive offer includes appetizers, main course, dessert, and a complimentary glass of wine. Perfect for special occasions or a romantic evening out.', 'Five-course meal with wine at La Maison', 150.00, 75.00, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', '2025-03-15 00:00:00+00', 'Valid for dine-in only. Reservation required. Not valid on holidays. One coupon per table.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 100, 45, 'La Maison', NULL, 'Downtown', '2024-12-01 00:00:00+00', '2025-03-15 00:00:00+00', true, '3e89da66-acb9-415b-aa99-a4c756e65dd3', '370d2b71-a7f6-4730-bafa-df56f570d3fa'),
	('Designer Fashion Sale', 'Get an exclusive 40% off on all designer items at Fashion Hub. From clothing to accessories, refresh your wardrobe with premium brands.', '40% off designer clothing & accessories', 300.00, 180.00, 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', '2025-02-14 00:00:00+00', 'In-store only. Cannot be combined with other offers. Excludes new arrivals.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 75, 34, 'Fashion Hub', NULL, 'Fashion Mall', '2024-12-01 00:00:00+00', '2025-02-14 00:00:00+00', true, '5b43dd41-d8de-4048-a9df-9625c7995d98', '67b30b8a-e6f0-4e95-9035-3ab8c9dac4cf'),
	('3-Month Gym Membership', 'Start your fitness journey with a 3-month all-access gym membership. Includes group classes, personal training session, and nutrition consultation.', 'Full gym access + PT session + nutrition', 180.00, 99.00, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', '2025-03-31 00:00:00+00', 'New members only. Must be 18+. Photo ID required for signup.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 100, 67, 'FitLife Gym', NULL, 'Multiple Locations', '2024-12-01 00:00:00+00', '2025-03-31 00:00:00+00', true, '15283a49-3ff4-476c-86c0-9d15119b15f6', '091a5366-2d26-42ae-9bc6-2e1c2590f095'),
	('Weekend Getaway Package', 'Escape for a weekend with this amazing hotel package. Includes 2 nights in a deluxe room, breakfast buffet, pool access, and late checkout. Perfect for a quick city break.', '2 nights hotel + breakfast + pool', 400.00, 249.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '2025-04-30 00:00:00+00', 'Subject to availability. Blackout dates apply. Must book 7 days in advance.', true, '2024-12-01 00:00:00+00', '2025-12-23 07:32:15.816559+00', 30, 12, 'Grand Hotel', NULL, 'City Center', '2024-12-01 00:00:00+00', '2025-04-30 00:00:00+00', false, '72834ef1-3073-40e9-a2fe-0e267e612a03', '8e34e76b-a623-48fd-877a-b6fe15d4f114'),
	('NEW COUPON', 'Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at Premium Cinemas locations.', 'Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at', 50.00, 23.00, '', '2025-12-30 00:00:00+00', 'Too small: expected string to have >=10 characters', true, '2025-12-26 10:09:07.836589+00', '2025-12-26 10:09:07.836589+00', 110, 0, 'merchant xyz', NULL, NULL, '2025-12-17 00:00:00+00', '2025-12-30 00:00:00+00', false, '5b43dd41-d8de-4048-a9df-9625c7995d98', '11ee952c-adaf-4d40-914f-d09d6fb9b4be');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "name", "slug", "description", "created_at") VALUES
	('4e0c711a-5726-4ab9-ad92-de1deed4585d', 'user', 'user', 'Default application user', '2025-12-30 08:43:32.717946+00'),
	('c3f1f25e-fe34-4e12-92db-925a30dc77d4', 'admin', 'admin', 'Administrator with full privileges', '2025-12-30 08:43:32.717946+00'),
	('a537875b-a85b-4703-b4f5-74d5533f4b24', 'moderator', 'moderator', 'Moderator with limited admin privileges', '2025-12-30 08:43:32.717946+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "created_at", "role") VALUES
	('1fbefc96-d10b-44e7-97f9-a439cd9935f5', '2025-12-30 08:31:13.136805+00', 'c3f1f25e-fe34-4e12-92db-925a30dc77d4');


--
-- Data for Name: purchased_coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."purchased_coupons" ("id", "profile_id", "coupon_id", "stripe_payment_intent_id", "stripe_charge_id", "stripe_payment_method", "paid_amount", "currency", "quantity", "status", "metadata", "purchased_at", "redeemed_at", "expires_at", "refund_reason", "created_at", "updated_at") VALUES
	('98281447-cd2d-4264-a198-0141b19b91d4', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '9c93e586-62d6-4f55-930f-560e21db2782', 'pi_test_19c377ca', 'ch_test_aaab46dd', 'pm_card_test', 29.00, 'usd', 1, 'succeeded', '{"note": "test-succeeded"}', '2026-01-14 13:57:28.770192+00', NULL, NULL, NULL, '2026-01-14 13:57:28.770192+00', '2026-01-14 13:57:28.770192+00'),
	('7bc4a581-63df-48d5-8069-d5f43b8cd0f8', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '9c93e586-62d6-4f55-930f-560e21db2782', NULL, NULL, NULL, 29.00, 'usd', 2, 'pending', '{"note": "test-pending"}', '2026-01-14 13:57:28.770192+00', NULL, NULL, NULL, '2026-01-14 13:57:28.770192+00', '2026-01-14 13:57:28.770192+00'),
	('9aae2e3d-17de-4498-87a3-78db64a4bdfa', '1fbefc96-d10b-44e7-97f9-a439cd9935f5', '9c93e586-62d6-4f55-930f-560e21db2782', NULL, NULL, NULL, 29.00, 'usd', 1, 'refunded', '{"note": "test-to-refund"}', '2026-01-14 13:57:28.770192+00', NULL, NULL, 'test refund', '2026-01-14 13:57:28.770192+00', '2026-01-14 13:57:28.770192+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 110, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict cCoPhaa85S0kQ3gdU1wGcp2wTpbgEnAp1HYT3YIqJdKXKu01nSqFveKWlxUSAi4

RESET ALL;
