/* eslint-disable no-control-regex */
/* eslint-disable no-await-in-loop */
import got from 'got';
import { JSDOM } from 'jsdom';
import _ from 'lodash';
import csvStringify from 'csv-stringify/lib/sync';
import { writeFileSync } from 'fs';

// debugger;
const url = ({ page, search }) => `https://mysku.ru/search/topics/page${page}?q=${search}`;
const App = async () => {
  const search = 'термометр';
  const pageUrl = (page) => url({ page, search });
  const csv = [['title', 'price', 'free', 'views', 'commentsCount', 'likeInt', 'peopleWantToBuyCount', 'topicUrl']];
  // debugger;
  let pages = 1;
  for (let i = 1; i <= pages; i += 1) {
    const a = await got(pageUrl(i));
    const { body } = a;
    const { document } = new JSDOM(body).window;
    const topics = [...(document.querySelectorAll('.topic') || [])];
    const unescape = (str) => str.replace(new RegExp('[\n\t\r]', 'g'), '').replace(new RegExp(_.escapeRegExp('&quot;'), 'g'), '"');
    if (pages === 1) {
      const lastHref = document.querySelector('.paginator .last a')?.href;
      if (lastHref) pages = +lastHref.substring(lastHref.indexOf('/page') + '/page'.length, lastHref.indexOf('?q')) || 1;
    }
    console.log(i, ' of ', pages);
    topics.forEach((t) => {
      const title = unescape(t.querySelector('.topic-title a')?.innerHTML || '');
      const price = t.querySelector('.price')?.lastChild?.textContent?.replace('Цена: ', '');
      const free = t.innerHTML.includes('Пункт №18');
      const views = t.querySelector('.read')?.lastChild?.textContent;
      const commentsCount = t.querySelector('.comment-title')?.nextSibling?.textContent;
      const likeInt = t.querySelector('.number.total')?.lastChild?.textContent?.trim()?.replace('+', '') || '-';
      const peopleWantToBuyCount = unescape(t.querySelector('.purchase_button span.number')?.innerHTML?.replace('+', '') || '').trim() || '-';
      const topicUrl = t.querySelector('.topic-title a')?.href;
      // debugger;
      csv.push([title, price, free, views, commentsCount, likeInt, peopleWantToBuyCount, topicUrl]);
    });
    const str = csvStringify(csv);
    writeFileSync(`${search}.csv`, str);
    // return;
  }
};
App();
