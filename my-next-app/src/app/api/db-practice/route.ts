// src/app/api/db-prac/route.ts
import { NextResponse, type NextRequest } from 'next/server';

import { db } from '@/lib/db/client';
import { postsTable, usersTable, blogsTable } from '@/lib/db/schema';
import { and, asc, desc, eq, gt, isNull, like, lte } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  // Drizzle은 SQL-Like ORM

  {
    /*생성*/
  }
  //   const promises = Array(10)
  //     .keys()
  //     .map(value => {
  //       return db
  //         .insert(blogsTable)
  //         .values({
  //           title: `게시글 ${value}`,
  //           content: `게시글 ${value} 내용`,
  //         })
  //         .returning();
  //     });
  //   const result = await Promise.all(promises);
  //   console.log(result);

  {
    /*수정*/
  }
  //   const result = await db
  //     .update(blogsTable)
  //     .set({
  //       title: '수정된 게시글',
  //       content: '수정된 게시글 내용',
  //     })
  //     .where(eq(blogsTable.id, 1))
  //     .returning();
  //   console.log(result);

  {
    /*삭제*/
  }
  //   const result = await db
  //     .delete(blogsTable)
  //     .where(eq(blogsTable.id, 1))
  //     .returning();
  //   console.log(result);

  {
    /*모든 컬럼 조회*/
  }
  //   const blogList = await db.select().from(blogsTable);
  //   console.log(blogList);

  // 1. 컬럼 지정해서 가져오기
  const result = await db
    .select({ id: blogsTable.id, title: blogsTable.title })
    .from(blogsTable);
  console.log(result);

  // 2. 전체 컬럼 가져오기
  const result2 = await db.select().from(blogsTable);
  console.log(result2);

  // 3. 조건 지정해서 가져오기 (where )
  const result3 = await db
    .select()
    .from(blogsTable)
    // import {gt, lte} from 'drizzle-orm'
    .where(and(gt(blogsTable.id, 3), lte(blogsTable.id, 8)));

  // 복합조건
  const postList5 = await db
    .select()
    .from(postsTable)
    .orderBy(asc(postsTable.id))
    //offset: 몇 개의 데이터를 건너뛸지 지정
    .offset(5);
  // Where절 사용하기3
  const postList6 = await db
    .select()
    .from(postsTable)
    .where(isNull(postsTable.content)); // postId가 null인 댓글
  // INNER JOIN: 게시글 + 작성자 정보
  const postsWithAuthor = await db
    .select({
      postId: postsTable.id,
      postTitle: postsTable.title,
      authorNickname: usersTable.nickname,
      authorEmail: usersTable.email,
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.authorId, usersTable.id))
    .where(eq(usersTable.role, 'user'))
    .orderBy(desc(postsTable.createdAt))
    .limit(20);

  console.log(result3);
  return NextResponse.json({ result3 });
}
//8