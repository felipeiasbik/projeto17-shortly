PGDMP                          {            shortly #   14.7 (Ubuntu 14.7-0ubuntu0.22.04.1) #   14.7 (Ubuntu 14.7-0ubuntu0.22.04.1) +    G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    16619    shortly    DATABASE     \   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE shortly;
                postgres    false            �            1259    16711    session    TABLE     h   CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    16710    session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.session_id_seq;
       public          postgres    false    218            K           0    0    session_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;
          public          postgres    false    217            �            1259    16655    url    TABLE     `   CREATE TABLE public.url (
    id integer NOT NULL,
    userid integer NOT NULL,
    url text
);
    DROP TABLE public.url;
       public         heap    postgres    false            �            1259    16699 	   urlClicks    TABLE     |   CREATE TABLE public."urlClicks" (
    id integer NOT NULL,
    "urlShortenId" integer NOT NULL,
    "visitCount" integer
);
    DROP TABLE public."urlClicks";
       public         heap    postgres    false            �            1259    16698    urlClicks_id_seq    SEQUENCE     �   CREATE SEQUENCE public."urlClicks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."urlClicks_id_seq";
       public          postgres    false    216            L           0    0    urlClicks_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."urlClicks_id_seq" OWNED BY public."urlClicks".id;
          public          postgres    false    215            �            1259    16684 
   urlShorten    TABLE     �   CREATE TABLE public."urlShorten" (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "urlShorten" text,
    "createdAt" timestamp with time zone DEFAULT now()
);
     DROP TABLE public."urlShorten";
       public         heap    postgres    false            �            1259    16683    urlShorten_id_seq    SEQUENCE     �   CREATE SEQUENCE public."urlShorten_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."urlShorten_id_seq";
       public          postgres    false    214            M           0    0    urlShorten_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."urlShorten_id_seq" OWNED BY public."urlShorten".id;
          public          postgres    false    213            �            1259    16654 
   url_id_seq    SEQUENCE     �   CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.url_id_seq;
       public          postgres    false    212            N           0    0 
   url_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;
          public          postgres    false    211            �            1259    16630    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16629    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            O           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            �           2604    16714 
   session id    DEFAULT     h   ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);
 9   ALTER TABLE public.session ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16658    url id    DEFAULT     `   ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);
 5   ALTER TABLE public.url ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    16702    urlClicks id    DEFAULT     p   ALTER TABLE ONLY public."urlClicks" ALTER COLUMN id SET DEFAULT nextval('public."urlClicks_id_seq"'::regclass);
 =   ALTER TABLE public."urlClicks" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16687    urlShorten id    DEFAULT     r   ALTER TABLE ONLY public."urlShorten" ALTER COLUMN id SET DEFAULT nextval('public."urlShorten_id_seq"'::regclass);
 >   ALTER TABLE public."urlShorten" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    16633    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            D          0    16711    session 
   TABLE DATA           6   COPY public.session (id, "userId", token) FROM stdin;
    public          postgres    false    218   '-       >          0    16655    url 
   TABLE DATA           .   COPY public.url (id, userid, url) FROM stdin;
    public          postgres    false    212   e.       B          0    16699 	   urlClicks 
   TABLE DATA           G   COPY public."urlClicks" (id, "urlShortenId", "visitCount") FROM stdin;
    public          postgres    false    216   �.       @          0    16684 
   urlShorten 
   TABLE DATA           N   COPY public."urlShorten" (id, "urlId", "urlShorten", "createdAt") FROM stdin;
    public          postgres    false    214   �.       <          0    16630    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    210   �.       P           0    0    session_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.session_id_seq', 5, true);
          public          postgres    false    217            Q           0    0    urlClicks_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."urlClicks_id_seq"', 1, false);
          public          postgres    false    215            R           0    0    urlShorten_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."urlShorten_id_seq"', 1, false);
          public          postgres    false    213            S           0    0 
   url_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.url_id_seq', 1, false);
          public          postgres    false    211            T           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    209            �           2606    16718    session session_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    218            �           2606    16704    urlClicks urlClicks_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."urlClicks"
    ADD CONSTRAINT "urlClicks_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."urlClicks" DROP CONSTRAINT "urlClicks_pkey";
       public            postgres    false    216            �           2606    16692    urlShorten urlShorten_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."urlShorten"
    ADD CONSTRAINT "urlShorten_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."urlShorten" DROP CONSTRAINT "urlShorten_pkey";
       public            postgres    false    214            �           2606    16662    url url_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.url DROP CONSTRAINT url_pkey;
       public            postgres    false    212            �           2606    16639    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    210            �           2606    16637    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �           2606    16705 %   urlClicks urlClicks_urlShortenId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."urlClicks"
    ADD CONSTRAINT "urlClicks_urlShortenId_fkey" FOREIGN KEY ("urlShortenId") REFERENCES public."urlShorten"(id);
 S   ALTER TABLE ONLY public."urlClicks" DROP CONSTRAINT "urlClicks_urlShortenId_fkey";
       public          postgres    false    3240    214    216            �           2606    16693     urlShorten urlShorten_urlId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."urlShorten"
    ADD CONSTRAINT "urlShorten_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.url(id);
 N   ALTER TABLE ONLY public."urlShorten" DROP CONSTRAINT "urlShorten_urlId_fkey";
       public          postgres    false    3238    214    212            �           2606    16663    url url_userid_fkey    FK CONSTRAINT     q   ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);
 =   ALTER TABLE ONLY public.url DROP CONSTRAINT url_userid_fkey;
       public          postgres    false    212    3236    210            D   .  x���K��0  е����,Q(��W4�~bA��cO?��K���Ǻ�FFj�a�P<�֓�^��G;K��yA�Ę:U8�GsϿ��"�\HW"-�k�"�C��B����ZO�\��)dEU�3��X͗��mBn�Ҽe�#c:j�a�����VB�� ��.:�u��@�/��-@n�η�J,�n�lÂ_#�pPV�P�+��6Z�@�1�N���ٗ�M���6��]��4�",nM,	��Q��fX
%�f�+����ae{Z�Re��~�c��������"�M����� ���{      >      x������ � �      B      x������ � �      @      x������ � �      <   �   x�3���?�8�3+?1�!�(�,5O/9?W/����2�tK��,H�LS
�*�e�镘�ș$@XN�(I��@%���0��׽"Ĵ�#?�4��8��?�<%#$�#����4ҵJ�(� �4�ɧ�$��4��+F��� �2�     