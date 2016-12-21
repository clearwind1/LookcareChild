/**
 * Created by pior on 16/12/15.
 * 游戏配置
 */
/**声音文件枚举 */
var SoundName;
(function (SoundName) {
    SoundName[SoundName["startgamebgm"] = 0] = "startgamebgm";
    SoundName[SoundName["gamebgm"] = 1] = "gamebgm";
    SoundName[SoundName["end"] = 2] = "end";
})(SoundName || (SoundName = {}));
;
var GameConfig = (function () {
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
    /**配置视窗高 */
    p.setStageHeight = function (stageh) {
        this.stageH = stageh;
    };
    p.getSH = function () {
        return this.stageH;
    };
    /**配置视窗宽 */
    p.setStageWidth = function (stagew) {
        this.stageW = stagew;
    };
    p.getSW = function () {
        return this.stageW;
    };
    GameConfig._i = function () {
        if (this._instance == null) {
            this._instance = new GameConfig();
        }
        return this._instance;
    };
    GameConfig.DEBUG = true;
    GameConfig.IP = "api.h5.gamexun.com"; //http连接地址
    GameConfig.GAMENAME = 'bubblefightv02'; //游戏在服务器上的名字
    GameConfig.SERVERNAME = 'paopao'; //服务器连接名
    GameConfig.FIRSTGAME = 'firstgame'; //第一次进游戏标示
    GameConfig.GAMESOUND = 'gamesound'; //游戏音效
    GameConfig.GAMEMUSIC = 'gamemusic'; //游戏音乐
    GameConfig.SoundName = []; //声音文件名
    GameConfig.GUIDESTEPNUM = 2; //新手引导总步数
    //场景转换
    GameConfig.NullAction = 0; //无动画
    GameConfig.CrossLeft = 1; //从左往右
    GameConfig.TransAlpha = 2; //淡入淡出
    GameConfig.OpenDoor = 3; //开门方式
    GameConfig.DesignWidth = 750; //游戏设计尺寸宽
    GameConfig.DesignHeight = 1334; //游戏设计尺寸高
    GameConfig._instance = null;
    return GameConfig;
}());
egret.registerClass(GameConfig,'GameConfig');
//# sourceMappingURL=GameConfig.js.map