/**
 * Created by pior on 16/12/15.
 * 游戏配置
 */
/**声音文件枚举 */
var SoundName;
(function (SoundName) {
    SoundName[SoundName["startgamebgm"] = 0] = "startgamebgm";
    SoundName[SoundName["gamebgm"] = 1] = "gamebgm";
    SoundName[SoundName["bowatt"] = 2] = "bowatt";
    SoundName[SoundName["enemyatt"] = 3] = "enemyatt";
    SoundName[SoundName["spearatt"] = 4] = "spearatt";
    SoundName[SoundName["die"] = 5] = "die";
    SoundName[SoundName["fail"] = 6] = "fail";
    SoundName[SoundName["goal"] = 7] = "goal";
    SoundName[SoundName["beatt"] = 8] = "beatt";
    SoundName[SoundName["click"] = 9] = "click";
    SoundName[SoundName["end"] = 10] = "end";
})(SoundName || (SoundName = {}));
;
/**场景转换效果，对应：无效果，从左往右，淡入淡出，向两边分开 */
var SceneEffect;
(function (SceneEffect) {
    SceneEffect[SceneEffect["NullAction"] = 0] = "NullAction";
    SceneEffect[SceneEffect["CrossLeft"] = 1] = "CrossLeft";
    SceneEffect[SceneEffect["TransAlpha"] = 2] = "TransAlpha";
    SceneEffect[SceneEffect["OpenDoor"] = 3] = "OpenDoor";
})(SceneEffect || (SceneEffect = {}));
;
var GameConfig = (function () {
    /**开发游戏配置结束 */
    function GameConfig() {
        this.stageH = 0; //视窗高
        this.stageW = 0; //视窗宽
        this.initconfigdata();
    }
    var d = __define,c=GameConfig,p=c.prototype;
    /**初始化游戏配置数据 */
    p.initconfigdata = function () {
        this.bguidedone = true;
        this.bfirstplay = false;
        if (!GameUtil.readLocalData(GameConfig.FIRSTGAME)) {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME, '1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND, '1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC, '1');
            this.bfirstplay = true;
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC)) == 1 ? true : false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND)) == 1 ? true : false;
    };
    /**获取视窗高 */
    GameConfig.getSH = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /**获取视窗宽 */
    GameConfig.getSW = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    GameConfig._i = function () {
        if (this._instance == null) {
            this._instance = new GameConfig();
        }
        return this._instance;
    };
    /**基本配置 */
    GameConfig.DEBUG = true;
    GameConfig.IP = "api.h5.gamexun.com"; //http连接地址
    GameConfig.GAMENAME = 'bubblefightv02'; //游戏在服务器上的名字
    GameConfig.SERVERNAME = 'paopao'; //服务器连接名
    GameConfig.FIRSTGAME = 'firstgame'; //第一次进游戏标示
    GameConfig.GAMESOUND = 'gamesound'; //游戏音效
    GameConfig.GAMEMUSIC = 'gamemusic'; //游戏音乐
    GameConfig.SoundName = ['startgamebgm.mp3', 'gamebgm.mp3', 'bowatt.mp3', 'enemyatt.mp3', 'spearatt.mp3',
        'die.mp3', 'fail.mp3', 'goal.mp3', 'beatt.mp3', 'click.mp3']; //声音文件名
    GameConfig.GUIDESTEPNUM = 2; //新手引导总步数
    GameConfig.DesignWidth = 750; //游戏设计尺寸宽
    GameConfig.DesignHeight = 1334; //游戏设计尺寸高
    /**基本配置结束 */
    /**开发游戏配置 */
    GameConfig.PLAYERLIFE = 100;
    GameConfig.PLAYERENERGY = 100;
    GameConfig._instance = null;
    return GameConfig;
}());
egret.registerClass(GameConfig,'GameConfig');
//# sourceMappingURL=GameConfig.js.map