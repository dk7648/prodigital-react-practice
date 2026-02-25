import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
sk하이닉스 일봉 60일치 가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]

- 2025-06-06 00:00:00까지의 60일치의 일봉
- (2025-03-10~2025-06-05 까지의 데이터가 들어있음.) [총 60개의 데이터] 

- (60개 이상의 데이터를 가져와도 됩니다. <2025-03-10 ~ 2025-06-05> 데이터만 포함시켜주세요.)
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/stock.json');

async function main() {
  const stock_code = 'A000660';

  const response = await fetch(
    'https://finance.daum.net/api/charts/A000660/days?limit=300&adjusted=true',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        priority: 'u=1, i',
        'sec-ch-ua':
          '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        cookie:
          'recentMenus=[{%22destination%22:%22chart%22%2C%22title%22:%22%EC%B0%A8%ED%8A%B8%22}]; KAKAO_STOCK_CHART_ENABLED_INDICATORS=[%22sma%22%2C%22column%22]; KAKAO_STOCK_RECENT=[%22A000660%22]; __T_=1; __T_SECURE=1; _T_ANO=jZyyUhkbz61cuGUgXbpUWbOBUUll+l6wzpTRS8jYoa4wLhWMHiq0L92txBI4vJbyhQfnuXFYtC4GzUrzQ47PrAEMCLGBiQwoz5VyJ9SQfSv71LmlRrTsBNK2AqyaQx86/tlgulQsDnVmbl5pWQqNbf2bBCykL1McEtWf1Smvv4ox1+ZI6SYNS7roenv1Qr68bwafCVw9vPixhcA+bnj/3X+8MaG0c/nlDN6X+L8TI4sD7rozFADoLHW9WEH4WFnXT7BAc5wWi6OLfGJfhRhVGA7GFHPm7zVcBKqDB/11ymKPpkqEuLVueERtzQef/U+L4/tjDOU+jibJY8imnah0Rw==',
        Referer: 'https://finance.daum.net/quotes/A000660',
      },
      body: null,
      method: 'GET',
    }
  );
  const json = await response.json();

  const stock_data = json.data.map(item => ({
    date: item.date,
    tradePrice: item.tradePrice,
    openingPrice: item.openingPrice,
    highPrice: item.highPrice,
    lowPrice: item.lowPrice,
    candleAccTradePrice: item.candleAccTradePrice,
  }));

  fs.writeFileSync(filePath, JSON.stringify(stock_data, null, 2), 'utf-8');
}

main();
