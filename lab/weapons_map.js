const fs = require('fs');
const weapons_raw = `11101: 无锋剑
11201: 银剑
11301: 冷刃
11302: 黎明神剑
11303: 旅行剑
11304: 暗铁剑
11305: 吃虎鱼刀
11306: 飞天御剑
11401: 西风剑
11402: 笛剑
11403: 祭礼剑
11404: 宗室长剑
11405: 匣里龙吟
11406: 试作斩岩
11407: 铁蜂刺
11408: 黑岩长剑
11409: 黑剑
11410: 暗巷闪光
11412: 降临之剑
11413: 腐殖之剑
11414: 天目影打刀
11415: 辰砂之纺锤
11501: 风鹰剑
11502: 天空之刃
11503: 苍古自由之誓
11504: 斫峰之刃
11505: 磐岩结绿
11509: 雾切之回光
11510: 波乱月白经津
12101: 训练大剑
12201: 佣兵重剑
12301: 铁影阔剑
12302: 沐浴龙血的剑
12303: 白铁大剑
12304: 石英大剑
12305: 以理服人
12306: 飞天大御剑
12401: 西风大剑
12402: 钟剑
12403: 祭礼大剑
12404: 宗室大剑
12405: 雨裁
12406: 试作古华
12407: 白影剑
12408: 黑岩斩刀
12409: 螭骨剑
12410: 千岩古剑
12411: 雪葬的星银
12412: 衔珠海皇
12414: 桂木斩长正
12416: 恶王丸
12501: 天空之傲
12502: 狼的末路
12503: 松籁响起之时
12504: 无工之剑
12510: 赤角石溃杵
13101: 新手长枪
13201: 铁尖枪
13301: 白缨枪
13302: 钺矛
13303: 黑缨枪
13304: 「旗杆」
13401: 匣里灭辰
13402: 试作星镰
13403: 流月针
13404: 黑岩刺枪
13405: 决斗之枪
13406: 千岩长枪
13407: 西风长枪
13408: 宗室猎枪
13409: 龙脊长枪
13414: 喜多院十文字
13415: 「渔获」
13416: 断浪长鳍
13501: 护摩之杖
13502: 天空之脊
13504: 贯虹之槊
13505: 和璞鸢
13507: 息灾
13509: 薙草之稻光
14101: 学徒笔记
14201: 口袋魔导书
14301: 魔导绪论
14302: 讨龙英杰谭
14303: 异世界行记
14304: 翡玉法球
14305: 甲级宝珏
14306: 琥珀玥
14401: 西风秘典
14402: 流浪乐章
14403: 祭礼残章
14404: 宗室秘法录
14405: 匣里日月
14406: 试作金珀
14407: 万国诸海图谱
14408: 黑岩绯玉
14409: 昭心
14410: 暗巷的酒与诗
14412: 忍冬之果
14413: 嘟嘟可故事集
14414: 白辰之环
14415: 证誓之明瞳
14501: 天空之卷
14502: 四风原典
14504: 尘世之锁
14506: 不灭月华
14509: 神乐之真意
15101: 猎弓
15201: 历练的猎弓
15301: 鸦羽弓
15302: 神射手之誓
15303: 反曲弓
15304: 弹弓
15305: 信使
15306: 黑檀弓
15401: 西风猎弓
15402: 绝弦
15403: 祭礼弓
15404: 宗室长弓
15405: 弓藏
15406: 试作澹月
15407: 钢轮弓
15408: 黑岩战弓
15409: 苍翠猎弓
15410: 暗巷猎手
15412: 幽夜华尔兹
15413: 风花之颂
15414: 破魔之弓
15415: 掠食者
15416: 曚云之月
15501: 天空之翼
15502: 阿莫斯之弓
15503: 终末嗟叹之诗
15507: 冬极白星
15509: 飞雷之弦振`


const monaWeaponMapping = require('./mona/_gen_weapon').default;

const typeNameMap = {
  1: 'sword',
  2: 'claymore',
  3: 'polearm',
  4: 'catalyst',
  5: 'bow',
}

const initStars = () => ({
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
})

const generate_weapon_map = () => {
  const weaponList = weapons_raw.split('\n');
  const result = {
    sword: initStars(),
    claymore: initStars(),
    polearm: initStars(),
    bow: initStars(),
    catalyst: initStars(),
  }
  weaponList.forEach((item) => {
    const weaponItem = item.split(':')
    const weaponCode = weaponItem[0].trim();
    const weaponName = weaponItem[1].trim();
    const type = parseInt(weaponCode.substring(1,2), 10);
    const star = parseInt(weaponCode.substring(2,3), 10);
    const typeName = typeNameMap[type];
    let weaponKey = '';
    Object.keys(monaWeaponMapping).forEach(key => {
      const a = monaWeaponMapping[key];
      if (a.chs === weaponName) {
        weaponKey = key
      }
    })
    result[typeName][star].push({
      key: weaponKey,
      code: weaponCode,
      name: weaponName,
      star,
      type: typeName,
    });
  });

  const fs = require('fs');

  fs.writeFile('./weapons_map.json', JSON.stringify(result, null,2), () => {
    console.log('写入完成')
  });
}

generate_weapon_map();
