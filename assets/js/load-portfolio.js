// 根据 data.json 动态生成作品集元素
(function() {
    // 定义 JSON 数据（避免 CORS 问题）
    const data = {
        "unity": [
            {
            //    "title": "宇宙飞船向哪飞U",
            //     "imagePath": "images/thumbs/01.jpg",
            //     "videoPath": "images/vedio/宇宙飞船向哪飞_完整版.mp4"
            }
        ],
        "cocos": [
            { // 1
                "title": "荒漠香料商队",
                "imagePath": "res/image/cocos/1-荒漠香料商队.jpg",
                "videoPath": "res/video/cocos/1.mp4"
            },
            { // 2
                "title": "神魔夺还战",
                "imagePath": "res/image/cocos/2-神魔夺还战.jpg",
                "videoPath": "res/video/cocos/2.mp4"
            },
            { // 3
                "title": "紅藍搭電梯",
                "imagePath": "res/image/cocos/3-紅藍搭電梯.jpg",
                "videoPath": "res/video/cocos/3.mp4"
            },
            { // 4
                "title": "攻略女人心",
                "imagePath": "res/image/cocos/4-攻略女人心.jpg",
                "videoPath": "res/video/cocos/4.mp4"
            },
            { // 5
                "title": "My Nightmare",
                "imagePath": "res/image/cocos/5-MyNightmare.jpg",
                "videoPath": "res/video/cocos/5.mp4"
            },
            { // 6
                "title": "无尽远征",
                "imagePath": "res/image/cocos/6-无尽远征.jpg",
                "videoPath": "res/video/cocos/6.mp4"
            },
            { // 7
                "title": "7-MoonCat",
                "imagePath": "res/image/cocos/7-MoonCat.jpg",
                "videoPath": "res/video/cocos/7.mp4"
            },
            { // 8
                "title": "Soul Healer",
                "imagePath": "res/image/cocos/8-SoulHealer.jpg",
                "videoPath": "res/video/cocos/8.mp4"
            },
            { // 9
                "title": "Takoyaki Battle",
                "imagePath": "res/image/cocos/9-TakoyakiBattle.jpg",
                "videoPath": "res/video/cocos/9.mp4"
            },
            { // 10
                "title": "夹缝求生",
                "imagePath": "res/image/cocos/10-夹缝求生.jpg",
                "videoPath": "res/video/cocos/10.mp4"
            },
            { // 11
                "title": "变异病源总进击",
                "imagePath": "res/image/cocos/11-变异病源总进击.jpg",
                "videoPath": "res/video/cocos/11.mp4"
            },
            { // 12
                "title": "魔法课程进行中",
                "imagePath": "res/image/cocos/12-魔法课程进行中.jpg",
                "videoPath": "res/video/cocos/12.mp4"
            },
            { // 13
                "title": "夢想冰淇淋",
                "imagePath": "res/image/cocos/13-夢想冰淇淋.jpg",
                "videoPath": "res/video/cocos/13.mp4"
            },
            { // 14
                "title": "拯救伙伴打龙去",
                "imagePath": "res/image/cocos/14-拯救伙伴打龙去.jpg",
                "videoPath": "res/video/cocos/14.mp4"
            },
            { // 15
                "title": "勇闯迷境",
                "imagePath": "res/image/cocos/15-勇闯迷境.jpg",
                "videoPath": "res/video/cocos/15.mp4"
            },
            { // 16
                "title": "思緒之海",
                "imagePath": "res/image/cocos/16-思緒之海.jpg",
                "videoPath": "res/video/cocos/16.mp4"
            },
            { // 17
                "title": "战略躲猫猫",
                "imagePath": "res/image/cocos/17-战略躲猫猫.jpg",
                "videoPath": "res/video/cocos/17.mp4"
            },
            { // 18
                "title": "末世異能者",
                "imagePath": "res/image/cocos/18-末世異能者.jpg",
                "videoPath": "res/video/cocos/18.mp4"
            },
            { // 19
                "title": "怪物联盟塔防",
                "imagePath": "res/image/cocos/19-怪物联盟塔防.jpg",
                "videoPath": "res/video/cocos/19.mp4"
            },
            { // 20
                "title": "塔奇陪闯荡",
                "imagePath": "res/image/cocos/20-塔奇陪闯荡.jpg",
                "videoPath": "res/video/cocos/20.mp4"
            },

        ],
    };

    // 生成每个分类的内容
    generatePortfolio('unity', data.unity);
    generatePortfolio('cocos', data.cocos);
    generatePortfolio('tool', data.tool);

    /**
     * 根据分类和数据生成作品集 HTML
     * @param {string} category - 分类名称 (cocos, unity, tool)
     * @param {Array} items - 作品数组
     */
    function generatePortfolio(category, items) {
        console.log(`Generating portfolio for category: ${category}`);
        const container = document.getElementById(category);
        
        if (!container) {
            console.warn(`Container with id "${category}" not found`);
            return;
        }

        // 清空容器
        const mainDiv = container.querySelector('#main') || container;
        mainDiv.innerHTML = '';

        // 遍历数据生成元素
        items.forEach((item, index) => {
            if (!item.title || !item.imagePath || !item.videoPath) {
                return; // 跳过不完整的数据
            }

            const article = createArticleElement(item);
            mainDiv.appendChild(article);
        });
    }

    /**
     * 创建单个作品元素
     * @param {Object} item - 作品数据 { title, imagePath, videoPath }
     * @returns {HTMLElement} article 元素
     */
    function createArticleElement(item) {
        const article = document.createElement('article');
        article.className = 'thumb';

        const link = document.createElement('a');
        link.href = `video-player.html?src=${encodeURIComponent(item.videoPath)}`;
        link.className = 'image';
        link.setAttribute('data-poptrox', 'iframe,0x0');

        const img = document.createElement('img');
        img.src = item.imagePath;
        img.alt = item.title;

        const h2 = document.createElement('h2');
        h2.textContent = item.title;

        link.appendChild(img);
        article.appendChild(link);
        article.appendChild(h2);

        return article;
    }
})();
