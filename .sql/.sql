-- 1. Enum 타입 생성
CREATE TYPE choice_type AS ENUM ('SINGLE_CHOICE', 'TEXT');
CREATE TYPE provider_type AS ENUM ('NORMAL', 'GOOGLE', 'KAKAO');
CREATE TYPE role_type AS ENUM ('ADMIN', 'USER');

-- 2. 테이블 생성
CREATE TABLE "mock_score" (
    "idx" serial NOT NULL,
    "member_idx" INTEGER NOT NULL,
    "mock_idx" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "max_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "like_history" (
    "idx" serial NOT NULL,
    "member_idx" INTEGER NOT NULL,
    "article_idx" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "mock" (
    "idx" UUID DEFAULT gen_random_uuid() NOT NULL,
    "member_idx" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quiz_count" INTEGER NOT NULL,
    "like_count" INTEGER DEFAULT 0 NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE "image" (
    "idx" serial NOT NULL,
    "article_idx" UUID NOT NULL,
    "urls" TEXT[] NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "quiz" (
    "idx" UUID DEFAULT gen_random_uuid() NOT NULL,
    "mock_idx" UUID NOT NULL,
    "type" choice_type NOT NULL,        
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "single_choice_choices" TEXT[] NULL,
    "single_choice_correct_answer" INTEGER NULL,
    "text_correct_answer" VARCHAR(255) NULL,
    "reason" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL
);

CREATE TABLE "answer_submit" (
    "idx" serial NOT NULL,
    "member_idx" INTEGER NOT NULL,
    "quiz_idx" UUID NOT NULL,
    "submit_answer" TEXT NULL,
    "correct_answer" TEXT NULL,
    "score" INTEGER DEFAULT 0 NOT NULL,
    "max_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "member" (
    "idx" serial NOT NULL,
    "id" VARCHAR(255) NOT NULL,
    "provider" provider_type NOT NULL,   
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "role" role_type DEFAULT 'USER' NOT NULL,
    "score" INTEGER DEFAULT 0 NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE "notice" (
    "idx" UUID DEFAULT gen_random_uuid() NOT NULL,
    "member_idx" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE "email_send" (
    "idx" serial NOT NULL,
    "email" VARCHAR(255) NULL,
    "send_count" INTEGER NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
    "is_approved" BOOLEAN DEFAULT FALSE NOT NULL
);

-- 각 테이블의 Primary Key 설정
ALTER TABLE "mock_score" ADD CONSTRAINT "PK_MOCK_SCORE" PRIMARY KEY ("idx");

ALTER TABLE "like_history" ADD CONSTRAINT "PK_LIKE_COUNT" PRIMARY KEY ("idx");

ALTER TABLE "mock" ADD CONSTRAINT "PK_MOCK" PRIMARY KEY ("idx");

ALTER TABLE "image" ADD CONSTRAINT "PK_IMAGE" PRIMARY KEY ("idx");

ALTER TABLE "quiz" ADD CONSTRAINT "PK_QUIZ" PRIMARY KEY ("idx");

ALTER TABLE "answer_submit" ADD CONSTRAINT "PK_ANSWER" PRIMARY KEY ("idx");

ALTER TABLE "member" ADD CONSTRAINT "PK_MEMBER" PRIMARY KEY ("idx");

ALTER TABLE "notice" ADD CONSTRAINT "PK_NOTICE" PRIMARY KEY ("idx");

ALTER TABLE "email_send" ADD CONSTRAINT "PK_EMAIL_SEND" PRIMARY KEY ("idx");

-- unique 제약조건 추가
ALTER TABLE "like_history"
ADD CONSTRAINT "unique_member_article" UNIQUE ("member_idx", "article_idx");

-- 3. 외래키 생성
ALTER TABLE "mock"
  ADD CONSTRAINT "FK_mock_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");

ALTER TABLE "mock_score"
  ADD CONSTRAINT "FK_mockscore_mock"
  FOREIGN KEY ("mock_idx")
  REFERENCES "mock"("idx");

ALTER TABLE "mock_score"
  ADD CONSTRAINT "FK_mockscore_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");

ALTER TABLE "like_history"
  ADD CONSTRAINT "FK_likehistory_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");

ALTER TABLE "quiz"
  ADD CONSTRAINT "FK_quiz_mock"
  FOREIGN KEY ("mock_idx")
  REFERENCES "mock"("idx");

ALTER TABLE "answer"
  ADD CONSTRAINT "FK_answer_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");

ALTER TABLE "answer_submit"
  ADD CONSTRAINT "FK_answersubmit_quiz"
  FOREIGN KEY ("quiz_idx")
  REFERENCES "quiz"("idx");

ALTER TABLE "answer_submit"
  ADD CONSTRAINT "FK_answersubmit_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");

ALTER TABLE "notice"
  ADD CONSTRAINT "FK_notice_member"
  FOREIGN KEY ("member_idx")
  REFERENCES "member"("idx");