import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 일자별 뉴스기사 수집하기 (일별로 1페이지: 총 5페이지) 
    - 저장 형태는 Object형태로 하시되 key는 끝나는 날짜, value는 Array<{title:기사제목, url: 기사링크}>로 저장하기
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/news.json');
async function main() {
  const news = {};

  const date = ['20250528', '20250529', '20250530', '20250531', '20250601'];
  const time = ['000000', '235959'];
  for (let i = 0; i < date.length; i++) {
    const response = await fetch(
      `https://search.daum.net/search?w=news&q=sk%ED%95%98%EC%9D%B4%EB%8B%89%EC%8A%A4&period=u&DA=STC&sd=${date[i]}${time[0]}&ed=${date[i]}${time[1]}`
    );
    const html = await response.text();
    const $ = cheerio.load(html);
    const items = $('.item-title').toArray();
    const results = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const url = $(item).find('a').attr('href');
      const title = $(item).text().trim();
      results.push({ title, url });
    }
    news[date[i]] = results;
  }
  fs.writeFileSync(filePath, JSON.stringify(news, null, 2), 'utf-8');
}

main();
