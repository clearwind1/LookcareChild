/**
 * Created by pior on 16/9/9.
 */
class StartGameScene extends GameUtil.BassPanel {

    public constructor() {
        super();
    }

    public init() {
        BGMPlayer._i().play(SoundName.startgamebgm);
        this.showbg();
    }
    /**显示背景界面 */
    private showbg() {
        var shap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x9eefd8);
        this.addChild(shap);
        var bg: MyBitmap = new MyBitmap(RES.getRes('startgamebg_jpg'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(bg);

        //界面按钮
        var btnname: string[] = ['startgamebtn_png', 'rankbtn_png', 'helpbtn_png', 'settingbtn_png', 'sharebtn_png'];
        var fun: Function[] = [this.startgame, this.gamerank, this.gamehelp, this.setting, this.share];
        var btnpox: number[] = [375, 375, 210, 540, 692];
        var btnpoy: number[] = [934, 1083, 1218, 1218, 68];
        for (var i: number = 0; i < btnname.length; i++) {
            var btn: GameUtil.Menu = new GameUtil.Menu(this, btnname[i], btnname[i], fun[i]);
            btn.setScaleMode();
            this.addChild(btn);
            GameUtil.relativepos(btn, bg, btnpox[i], btnpoy[i]);
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
    }

    private getshare() {
        var param: Object = {
            shareopenid: GameUtil.getQueryString('shareopenid'),
            clickopenid: PlayerData._i().UserInfo.openid
        }
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/updatesharedata", this.setshareresult, this);
    }
    private setshareresult(data: any) {
        if (data['code'] == 1) {
            SharePage._i().getSignPackage();
            SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
        }
        else {
            GameUtil.trace(data['msg']);
        }
    }
    /**开始游戏 */
    private startgame() {
        GameUtil.trace('startgame');
        GameUtil.GameScene.runscene(new GameScene());
    }
    /**游戏排行榜 */
    private gamerank() {
        GameUtil.trace('gamerank');
        this.addChild(new GameRankPageShow());
    }
    /**游戏帮助 */
    private gamehelp() {
        GameUtil.trace('gamehelp');
        this.addChild(new GameHelpPageShow());
    }
    /**游戏设置，音乐与音效 */
    private setting() {
        GameUtil.trace('setting');
        this.addChild(new GameSetting());
    }
    /**游戏分享 */
    private share() {
        GameUtil.trace('share');
         if (!GameUtil.isWeiXin()) {
            this.addChild(new GameUtil.TipsPanel(null, '请在微信中打开', true));
         } else {
             this.addChild(new SharePageShow());
        }
    }
}