/**
 * Created by pior on 16/9/9.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
    }
    var d = __define,c=StartGameScene,p=c.prototype;
    p.init = function () {
        BGMPlayer._i().play(SoundName.startgamebgm);
        var param = {
            clickopenid: '1'
        };
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/getuserid", this.show, this);
    };
    p.show = function (data) {
        if (data['code'] == 1) {
            this.showbg();
            PlayerData._i().UserInfo.ID = data['userid'];
        }
        else {
            GameUtil.trace(data['msg']);
        }
    };
    /**显示背景界面 */
    p.showbg = function () {
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x9eefd8);
        this.addChild(shap);
        var bg = new MyBitmap(RES.getRes('startgamebg_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(bg);
        //界面按钮
        var btnname = ['startgamebtn_png', 'rankbtn_png', 'helpbtn_png', 'settingbtn_png', 'sharebtn_png'];
        var fun = [this.startgame, this.gamerank, this.gamehelp, this.setting, this.share];
        var btnpox = [375, 375, 210, 540, 692];
        var btnpoy = [934, 1083, 1218, 1218, 68];
        for (var i = 0; i < btnname.length; i++) {
            var btn = new GameUtil.Menu(this, btnname[i], btnname[i], fun[i]);
            btn.setScaleMode();
            this.addChild(btn);
            btn.setBtnSound(GameData._i().gamesound[SoundName.click]);
            GameUtil.relativepos(btn, bg, btnpox[i], btnpoy[i]);
            if (i == 4) {
                btn.x = this.mStageW - 100;
            }
        }
        if (!GameConfig.DEBUG) {
            //分享游戏
            if (GameUtil.getQueryString('shareopenid')) {
                this.getshare();
            }
            else {
                SharePage._i().getSignPackage();
                SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
            }
        }
    };
    p.getshare = function () {
        var param = {
            shareopenid: GameUtil.getQueryString('shareopenid'),
            clickopenid: PlayerData._i().UserInfo.openid
        };
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/updatesharedata", this.setshareresult, this);
    };
    p.setshareresult = function (data) {
        if (data['code'] == 1) {
            SharePage._i().getSignPackage();
            SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
        }
        else {
            GameUtil.trace(data['msg']);
        }
    };
    /**开始游戏 */
    p.startgame = function () {
        GameUtil.trace('startgame');
        GameUtil.GameScene.runscene(new GameScene());
    };
    /**游戏排行榜 */
    p.gamerank = function () {
        GameUtil.trace('gamerank');
        this.addChild(new GameRankPageShow());
    };
    /**游戏帮助 */
    p.gamehelp = function () {
        GameUtil.trace('gamehelp');
        this.addChild(new GameHelpPageShow());
    };
    /**游戏设置，音乐与音效 */
    p.setting = function () {
        GameUtil.trace('setting');
        this.addChild(new GameSetting());
    };
    /**游戏分享 */
    p.share = function () {
        GameUtil.trace('share');
        if (!GameUtil.isSomeType(GameConfig.WeiXinstr)) {
            this.addChild(new GameUtil.TipsPanel(null, '请在微信中打开', true));
        }
        else {
            this.addChild(new SharePageShow());
        }
    };
    return StartGameScene;
}(GameUtil.BassPanel));
egret.registerClass(StartGameScene,'StartGameScene');
//# sourceMappingURL=StartGameScene.js.map