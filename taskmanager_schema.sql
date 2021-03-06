PGDMP     '    %            
    v            TaskManager    11.0    11.0 6    �	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �	           1262    16384    TaskManager    DATABASE     k   CREATE DATABASE "TaskManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE "TaskManager";
             postgres    false            �            1259    16399    rights    TABLE     P   CREATE TABLE public.rights (
    id bigint NOT NULL,
    label text NOT NULL
);
    DROP TABLE public.rights;
       public         postgres    false            �            1259    16397    Rights_id_seq    SEQUENCE     x   CREATE SEQUENCE public."Rights_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Rights_id_seq";
       public       postgres    false    199            �	           0    0    Rights_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Rights_id_seq" OWNED BY public.rights.id;
            public       postgres    false    198            �            1259    16408    users_rights    TABLE     h   CREATE TABLE public.users_rights (
    id bigint NOT NULL,
    "idUser" bigint,
    "idRight" bigint
);
     DROP TABLE public.users_rights;
       public         postgres    false            �            1259    16406    UsersRights_id_seq    SEQUENCE     }   CREATE SEQUENCE public."UsersRights_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."UsersRights_id_seq";
       public       postgres    false    201            �	           0    0    UsersRights_id_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public."UsersRights_id_seq" OWNED BY public.users_rights.id;
            public       postgres    false    200            �            1259    16385    users    TABLE     r   CREATE TABLE public.users (
    id bigint NOT NULL,
    mail text NOT NULL,
    password text,
    pseudo text
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    16388    Users_id_seq    SEQUENCE     w   CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public       postgres    false    196            �	           0    0    Users_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Users_id_seq" OWNED BY public.users.id;
            public       postgres    false    197            �            1259    16450    assigned_users    TABLE     �   CREATE TABLE public.assigned_users (
    id bigint NOT NULL,
    id_task bigint,
    id_user bigint,
    vu boolean DEFAULT false
);
 "   DROP TABLE public.assigned_users;
       public         postgres    false            �            1259    16448    assigned_users_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.assigned_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.assigned_users_id_seq;
       public       postgres    false    211            �	           0    0    assigned_users_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.assigned_users_id_seq OWNED BY public.assigned_users.id;
            public       postgres    false    210            �            1259    16441    etat    TABLE     Y   CREATE TABLE public.etat (
    id bigint NOT NULL,
    libelle text,
    ordre bigint
);
    DROP TABLE public.etat;
       public         postgres    false            �            1259    16439    etat_id_seq    SEQUENCE     t   CREATE SEQUENCE public.etat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.etat_id_seq;
       public       postgres    false    209            �	           0    0    etat_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.etat_id_seq OWNED BY public.etat.id;
            public       postgres    false    208            �            1259    16485    files    TABLE     Y   CREATE TABLE public.files (
    id bigint NOT NULL,
    filename text,
    data bytea
);
    DROP TABLE public.files;
       public         postgres    false            �            1259    16483    files_id_seq    SEQUENCE     u   CREATE SEQUENCE public.files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public       postgres    false    219            �	           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
            public       postgres    false    218            �            1259    16457    messages    TABLE     s   CREATE TABLE public.messages (
    id bigint NOT NULL,
    text text,
    date_heure bigint,
    id_user bigint
);
    DROP TABLE public.messages;
       public         postgres    false            �            1259    16455    messages_id_seq    SEQUENCE     x   CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public       postgres    false    213            �	           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
            public       postgres    false    212            �            1259    16472    notifications    TABLE     �   CREATE TABLE public.notifications (
    id bigint NOT NULL,
    text text,
    id_user bigint,
    vu boolean DEFAULT false,
    data json
);
 !   DROP TABLE public.notifications;
       public         postgres    false            �            1259    16470    notifications_id_seq    SEQUENCE     }   CREATE SEQUENCE public.notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.notifications_id_seq;
       public       postgres    false    217            �	           0    0    notifications_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
            public       postgres    false    216            �            1259    16414 
   task_items    TABLE     ~   CREATE TABLE public.task_items (
    id bigint NOT NULL,
    label text,
    type text,
    options text,
    ordre bigint
);
    DROP TABLE public.task_items;
       public         postgres    false            �            1259    16412    task_items_id_seq    SEQUENCE     z   CREATE SEQUENCE public.task_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.task_items_id_seq;
       public       postgres    false    203            �	           0    0    task_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.task_items_id_seq OWNED BY public.task_items.id;
            public       postgres    false    202            �            1259    16423    task_items_value    TABLE     z   CREATE TABLE public.task_items_value (
    id bigint NOT NULL,
    id_task bigint,
    id_item bigint,
    valeur text
);
 $   DROP TABLE public.task_items_value;
       public         postgres    false            �            1259    16421    task_items_value_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_items_value_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.task_items_value_id_seq;
       public       postgres    false    205            �	           0    0    task_items_value_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.task_items_value_id_seq OWNED BY public.task_items_value.id;
            public       postgres    false    204            �            1259    16466    task_messages    TABLE     i   CREATE TABLE public.task_messages (
    id bigint NOT NULL,
    id_task bigint,
    id_message bigint
);
 !   DROP TABLE public.task_messages;
       public         postgres    false            �            1259    16464    task_messages_id_seq    SEQUENCE     }   CREATE SEQUENCE public.task_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.task_messages_id_seq;
       public       postgres    false    215            �	           0    0    task_messages_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.task_messages_id_seq OWNED BY public.task_messages.id;
            public       postgres    false    214            �            1259    16432    tasks    TABLE     �   CREATE TABLE public.tasks (
    id bigint NOT NULL,
    title text,
    description text,
    dh_creation bigint,
    id_etat bigint
);
    DROP TABLE public.tasks;
       public         postgres    false            �            1259    16430    tasks_id_seq    SEQUENCE     u   CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public       postgres    false    207            �	           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
            public       postgres    false    206            R	           2604    16453    assigned_users id    DEFAULT     v   ALTER TABLE ONLY public.assigned_users ALTER COLUMN id SET DEFAULT nextval('public.assigned_users_id_seq'::regclass);
 @   ALTER TABLE public.assigned_users ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    211    210    211            Q	           2604    16444    etat id    DEFAULT     b   ALTER TABLE ONLY public.etat ALTER COLUMN id SET DEFAULT nextval('public.etat_id_seq'::regclass);
 6   ALTER TABLE public.etat ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    208    209    209            X	           2604    16488    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    218    219    219            T	           2604    16460    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    212    213    213            V	           2604    16475    notifications id    DEFAULT     t   ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
 ?   ALTER TABLE public.notifications ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    216    217    217            L	           2604    16402 	   rights id    DEFAULT     h   ALTER TABLE ONLY public.rights ALTER COLUMN id SET DEFAULT nextval('public."Rights_id_seq"'::regclass);
 8   ALTER TABLE public.rights ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            N	           2604    16417    task_items id    DEFAULT     n   ALTER TABLE ONLY public.task_items ALTER COLUMN id SET DEFAULT nextval('public.task_items_id_seq'::regclass);
 <   ALTER TABLE public.task_items ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    203    202    203            O	           2604    16426    task_items_value id    DEFAULT     z   ALTER TABLE ONLY public.task_items_value ALTER COLUMN id SET DEFAULT nextval('public.task_items_value_id_seq'::regclass);
 B   ALTER TABLE public.task_items_value ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    204    205    205            U	           2604    16469    task_messages id    DEFAULT     t   ALTER TABLE ONLY public.task_messages ALTER COLUMN id SET DEFAULT nextval('public.task_messages_id_seq'::regclass);
 ?   ALTER TABLE public.task_messages ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    215    214    215            P	           2604    16435    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    206    207    207            K	           2604    16390    users id    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196            M	           2604    16411    users_rights id    DEFAULT     s   ALTER TABLE ONLY public.users_rights ALTER COLUMN id SET DEFAULT nextval('public."UsersRights_id_seq"'::regclass);
 >   ALTER TABLE public.users_rights ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200    201            \	           2606    16493    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public         postgres    false    219            Z	           2606    16481     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public         postgres    false    217           