import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from pymongo.mongo_client import MongoClient
import os


def lambda_handler(event, context):
    chrome_options = Options()
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--disable-setuid-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1280x1696')
    chrome_options.add_argument('--user-data-dir=/tmp/user-data')
    chrome_options.add_argument('--hide-scrollbars')
    chrome_options.add_argument('--enable-logging')
    chrome_options.add_argument('--log-level=0')
    chrome_options.add_argument('--v=99')
    chrome_options.add_argument('--single-process')
    chrome_options.add_argument('--data-path=/tmp/data-path')
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument('--homedir=/tmp')
    chrome_options.add_argument('--disk-cache-dir=/tmp/cache-dir')
    chrome_options.add_argument(
        'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36')
    chrome_options.binary_location = "/opt/python/bin/headless-chromium"

    # 크롬 드라이버 로드
    crawler = webdriver.Chrome(chrome_options=chrome_options, executable_path='/opt/python/bin/chromedriver')
    url = os.environ.get('mongo_url')
    client = MongoClient(url)
    db = client.consert

    crawler.get('http://ticket.interpark.com/TPGoodsList.asp?Ca=Liv')
    child = crawler.find_elements(By.CSS_SELECTOR,
                                  'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr > td.RKtxt > span > a')
    for i in range(201, len(child) + 1):
        crawler.find_element(By.CSS_SELECTOR,
                 f'body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr:nth-child({i}) > td.RKtxt > span > a').click()
        time.sleep(0.5)
        try:
            title = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryTop > h2').text
        except:
            title = ''
        try:
            place = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > ul > li:nth-child(1) > div > a').text.replace(
                '(자세히)', '')
        except:
            place = ''
        try:
            image = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > div > div.posterBoxTop > img').get_attribute(
                'src')
        except:
            image = ''
        try:
            cast = []
            castChild = crawler.find_elements(By.CSS_SELECTOR,
                '#productMainBody > div > div > div.content.casting > div > ul > li > div.castingInfo > div.castingName')
            for c in castChild:
                cast.append(c.text)

        except:
            cast = []
        try:
            grade = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > ul > li:nth-child(4) > div > p').text
        except:
            grade = ''
        try:
            viewingTime = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > ul > li:nth-child(3) > div > p').text
        except:
            viewingTime = ''
        try:
            link = crawler.current_url
        except:
            link = ''
        try:
            like = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > div > div.posterBoxBottom > div.prdCast > p').text
            like = int(like)
        except:
            like = 0
        try:
            date = crawler.find_element(By.CSS_SELECTOR,
                '#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > ul > li:nth-child(2) > div > p').text
            startDate = date.split('~')[0].strip()
            endDate = date.split('~')[1].strip()
        except:
            startDate = date
            endDate = date

        doc = {
            'title': title,
            'place': place,
            'startDate': startDate,
            'endDate': endDate,
            'image': image,
            'cast': cast,
            'grade': grade,
            'viewingTime': viewingTime,
            'link': link,
            'like': like
        }
        print(doc)
        db.conserts.insert_one(doc)
        crawler.back();

    return {
        'statusCode': 200,
        'body': json.dumps('??')
    }
