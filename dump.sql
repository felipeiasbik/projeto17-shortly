--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text,
    "createdAt" timestamp with time zone DEFAULT now()
);


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.url (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text,
    "createdAt" timestamp with time zone DEFAULT now()
);


--
-- Name: urlClicks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."urlClicks" (
    id integer NOT NULL,
    "urlShortenId" integer NOT NULL,
    "visitCount" integer,
    "createdAt" timestamp with time zone DEFAULT now()
);


--
-- Name: urlClicks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."urlClicks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urlClicks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."urlClicks_id_seq" OWNED BY public."urlClicks".id;


--
-- Name: urlShorten; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."urlShorten" (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "urlShorten" text,
    "createdAt" timestamp with time zone DEFAULT now()
);


--
-- Name: urlShorten_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."urlShorten_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urlShorten_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."urlShorten_id_seq" OWNED BY public."urlShorten".id;


--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);


--
-- Name: urlClicks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlClicks" ALTER COLUMN id SET DEFAULT nextval('public."urlClicks_id_seq"'::regclass);


--
-- Name: urlShorten id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlShorten" ALTER COLUMN id SET DEFAULT nextval('public."urlShorten_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: urlClicks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: urlShorten; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'felipe', 'felipe@felipe.com', '$2b$10$kYQHxp5GVcchhkR3McyQTeTjNPXvEKc.jtCr3hpgfoQXfpocjNf5S', '2023-05-19 12:36:21.978522-03');


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 2, true);


--
-- Name: urlClicks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."urlClicks_id_seq"', 1, false);


--
-- Name: urlShorten_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."urlShorten_id_seq"', 1, false);


--
-- Name: url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.url_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: urlClicks urlClicks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlClicks"
    ADD CONSTRAINT "urlClicks_pkey" PRIMARY KEY (id);


--
-- Name: urlShorten urlShorten_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlShorten"
    ADD CONSTRAINT "urlShorten_pkey" PRIMARY KEY (id);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: session session_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urlClicks urlClicks_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlClicks"
    ADD CONSTRAINT "urlClicks_fk0" FOREIGN KEY ("urlShortenId") REFERENCES public."urlShorten"(id);


--
-- Name: urlClicks urlClicks_urlShortenId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlClicks"
    ADD CONSTRAINT "urlClicks_urlShortenId_fkey" FOREIGN KEY ("urlShortenId") REFERENCES public."urlShorten"(id);


--
-- Name: urlShorten urlShorten_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlShorten"
    ADD CONSTRAINT "urlShorten_fk0" FOREIGN KEY ("urlId") REFERENCES public.url(id);


--
-- Name: urlShorten urlShorten_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."urlShorten"
    ADD CONSTRAINT "urlShorten_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.url(id);


--
-- Name: url url_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: url url_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT "url_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

