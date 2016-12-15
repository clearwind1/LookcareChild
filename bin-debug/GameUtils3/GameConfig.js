/**
 * Created by pior on 16/12/15.
 */
var SoundName;
(function (SoundName) {
    SoundName[SoundName["end"] = 0] = "end";
})(SoundName || (SoundName = {}));
;
var GameConfig = (function () {
    function GameConfig() {
        this.stagetY = 0;
        this.initconfigdata();
    }
    var d = __define,c=GameConfig,p=c.prototype;
    p.initconfigdata = function () {
        if (!GameUtil.readLocalData(GameConfig.FIRSTGAME)) {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME, '1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND, '1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC, '1');
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC)) == 1 ? true : false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND)) == 1 ? true : false;
    };
    p.setStageHeight = function (stagety) {
        this.stagetY = stagety;
    };
    p.getSH = function () {
        return this.stagetY;
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
    GameConfig.SoundName = [];
    //场景转换
    GameConfig.NullAction = 0; //无动画
    GameConfig.CrossLeft = 1; //从左往右
    GameConfig.TransAlpha = 2; //淡入淡出
    GameConfig.OpenDoor = 3; //开门方式
    GameConfig.DesignWidth = 750;
    GameConfig.DesignHeight = 1334;
    GameConfig._instance = null;
    return GameConfig;
}());
egret.registerClass(GameConfig,'GameConfig');
