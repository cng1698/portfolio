// 根据 data.json 动态生成作品集元素
(function() {
    // 定义 JSON 数据（避免 CORS 问题）
    const data = {
        "unity": [
            {
               "title": "射擊遊戲Demo\n(依照官方教學，並改為手機遊戲，使用虛擬搖桿控制角色移動，加入小地圖)",
                "imagePath": "res/image/unity/practice_survive_game.jpg",
                "videoPath": "res/video/unity/practice_survive_game.mp4"
            },
            {
               "title": "RPG Demo\n(補習班專案練習)",
                "imagePath": "res/image/unity/DEMO.png",
                "videoPath": "res/video/unity/DEMO.mp4"
            },
            
            {
               "title": "逃脫遊戲Demo\n(影片教學練習，嘗試於 Canvas 上加入 Particle System 特效)",
                "imagePath": "res/image/unity/practice1.png",
                "videoPath": "res/video/unity/practice1.mp4",
                "githubLink": "https://github.com/cng1698/EscapeRoomDemo"
            },
            {
               "title": "跑酷遊戲Demo\n(使用 C# Event 實作物件間事件通知，降低元件耦合。)",
                "imagePath": "res/image/unity/practice2.png",
                "videoPath": "res/video/unity/practice2.mp4",
                "githubLink": "https://github.com/cng1698/ParkourPractice"
            },
        ],
        "cocos": [
            { // 1
                "title": "怪物联盟塔防",
                "imagePath": "res/image/cocos/19-怪物联盟塔防.jpg",
                "videoPath": "res/video/cocos/19.mp4"
            },
            { // 2
                "title": "拯救伙伴打龙去",
                "imagePath": "res/image/cocos/14-拯救伙伴打龙去.jpg",
                "videoPath": "res/video/cocos/14.mp4"
            },
            { // 3
                "title": "无尽远征",
                "imagePath": "res/image/cocos/6-无尽远征.jpg",
                "videoPath": "res/video/cocos/6.mp4"
            },
            { // 4
                "title": "变异病源总进击",
                "imagePath": "res/image/cocos/11-变异病源总进击.jpg",
                "videoPath": "res/video/cocos/11.mp4"
            },
            { // 5
                "title": "神魔夺还战",
                "imagePath": "res/image/cocos/2-神魔夺还战.jpg",
                "videoPath": "res/video/cocos/2.mp4"
            },
            { // 6
                "title": "Soul Healer",
                "imagePath": "res/image/cocos/8-SoulHealer.jpg",
                "videoPath": "res/video/cocos/8.mp4"
            },
            { // 7
                "title": "荒漠香料商队",
                "imagePath": "res/image/cocos/1-荒漠香料商队.jpg",
                "videoPath": "res/video/cocos/1.mp4"
            },
            { // 8
                "title": "末世異能者",
                "imagePath": "res/image/cocos/18-末世異能者.jpg",
                "videoPath": "res/video/cocos/18.mp4"
            },
            { // 9
                "title": "战略躲猫猫",
                "imagePath": "res/image/cocos/17-战略躲猫猫.jpg",
                "videoPath": "res/video/cocos/17.mp4"
            },
            { // 10
                "title": "夢想冰淇淋",
                "imagePath": "res/image/cocos/13-夢想冰淇淋.jpg",
                "videoPath": "res/video/cocos/13.mp4"
            },
            { // 11
                "title": "勇闯迷境",
                "imagePath": "res/image/cocos/15-勇闯迷境.jpg",
                "videoPath": "res/video/cocos/15.mp4"
            },
            { // 12
                "title": "思緒之海",
                "imagePath": "res/image/cocos/16-思緒之海.jpg",
                "videoPath": "res/video/cocos/16.mp4"
            },
            { // 13
                "title": "攻略女人心",
                "imagePath": "res/image/cocos/4-攻略女人心.jpg",
                "videoPath": "res/video/cocos/4.mp4"
            },
            { // 14
                "title": "塔奇陪闯荡",
                "imagePath": "res/image/cocos/20-塔奇陪闯荡.jpg",
                "videoPath": "res/video/cocos/20.mp4"
            },
            { // 15
                "title": "My Nightmare",
                "imagePath": "res/image/cocos/5-MyNightmare.jpg",
                "videoPath": "res/video/cocos/5.mp4"
            },
            { // 16
                "title": "7-MoonCat",
                "imagePath": "res/image/cocos/7-MoonCat.jpg",
                "videoPath": "res/video/cocos/7.mp4"
            },
            { // 17
                "title": "Takoyaki Battle",
                "imagePath": "res/image/cocos/9-TakoyakiBattle.jpg",
                "videoPath": "res/video/cocos/9.mp4"
            },
            { // 18
                "title": "夹缝求生",
                "imagePath": "res/image/cocos/10-夹缝求生.jpg",
                "videoPath": "res/video/cocos/10.mp4"
            },
            { // 19
                "title": "魔法课程进行中",
                "imagePath": "res/image/cocos/12-魔法课程进行中.jpg",
                "videoPath": "res/video/cocos/12.mp4"
            },
            { // 20
                "title": "紅藍搭電梯",
                "imagePath": "res/image/cocos/3-紅藍搭電梯.jpg",
                "videoPath": "res/video/cocos/3.mp4"
            },

        ],
    };
    const githubIcon = "res/image/github_icon.png";

    // 生成每个分类的内容
    generatePortfolio('unity', data.unity);
    generatePortfolio('cocos', data.cocos);
    generatePortfolio('tool', data.tool);

    /**
     * 根据分类和数据生成作品集 HTML
     * @param {string} category - 分类名称 (cocos, unity, tool)
     * @param {Array} items - 作品数组
     */
    function generatePortfolio(category, items = []) {
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
        // Preserve newline characters in titles by inserting <br> safely
        const lines = String(item.title).split('\n');
        lines.forEach((line, i) => {
            h2.appendChild(document.createTextNode(line));
            if (i !== lines.length - 1) h2.appendChild(document.createElement('br'));
        });

        link.appendChild(img);
        article.appendChild(link);
        article.appendChild(h2);

        if (item.githubLink) {
            const githubLink = document.createElement('a');
            githubLink.href = item.githubLink;
            githubLink.className = 'button small github-link';
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';

            const githubImage = document.createElement('img');
            githubImage.src = githubIcon;
            githubImage.alt = '';
            githubImage.className = 'github-icon';

            githubLink.appendChild(githubImage);
            article.appendChild(githubLink);
        }

        return article;
    }
})();
