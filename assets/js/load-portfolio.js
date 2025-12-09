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
            {
                "title": "荒漠香料商队",
                "imagePath": "res/image/cocos/1-荒漠香料商队.jpg",
                "videoPath": "res/video/cocos/1.mp4"
            },
            {
                "title": "神魔夺还战",
                "imagePath": "res/image/cocos/2-神魔夺还战.jpg",
                "videoPath": "res/video/cocos/2.mp4"
            },
            {
                "title": "紅藍搭電梯",
                "imagePath": "res/image/cocos/3-紅藍搭電梯.jpg",
                "videoPath": "res/video/cocos/3.mp4"
            },
        ],
        "tool": [
            {
                // "title": "宇宙飞船向哪飞T",
                // "imagePath": "images/thumbs/01.jpg",
                // "videoPath": "images/vedio/宇宙飞船向哪飞_完整版.mp4"
            }
        ]
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
