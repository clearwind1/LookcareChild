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
        this.showbg();
    };
    p.showbg = function () {
        this.othercontain = null;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x9eefd8);
        this.addChild(shap);
        var bg = new GameUtil.MyBitmap(RES.getRes('startgamebg_png'), this.mStageW / 2, this.mStageH / 2);
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
            GameUtil.relativepos(btn, bg, btnpox[i], btnpoy[i]);
        }
        if (!GameConfig.DEBUG) {
            //分享游戏
            if (GameUtil.getQueryString('shareopenid')) {
                this.getsharebubble();
            }
            else {
                SharePage._i().getSignPackage();
                SharePage._i().setNewUrl('http://' + GameConfig.GAMENAME + '.h5.gamexun.com/?shareopenid=' + PlayerData._i().UserInfo.openid);
            }
        }
    };
    p.getsharebubble = function () {
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
            GameUtil.tarce(data['msg']);
        }
    };
    p.startgame = function () {
        GameUtil.tarce('startgame');
    };
    p.gamerank = function () {
        GameUtil.tarce('gamerank');
        var param = {};
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/getrank", this.getRank, this);
    };
    p.getRank = function (rankdata) {
        if (rankdata['code'] == 1) {
            var result = rankdata['result'];
            this.createContain();
            var rankbg = new GameUtil.MyBitmap(RES.getRes('rankbg_png'), this.mStageW / 2, this.mStageH / 2);
            this.othercontain.addChild(rankbg);
            for (var i = 0; i < result.length; i++) {
                var playname = new GameUtil.MyTextField(180, 0, 40, 0.5);
                playname.setText('test1' + result[i]['nickname']);
                playname.textColor = 0xffffff;
                this.othercontain.addChild(playname);
                GameUtil.relativepos(playname, rankbg, 281, 165 + i * 64);
                var playscore = new GameUtil.MyTextField(333, 0, 40, 0.5);
                playscore.setText('' + result[i]['jifen']);
                playscore.textColor = 0xffffff;
                this.othercontain.addChild(playscore);
                GameUtil.relativepos(playscore, rankbg, 450, 165 + i * 64);
            }
            var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
            this.othercontain.addChild(close);
            GameUtil.relativepos(close, rankbg, 600, 80);
        }
        else {
            GameUtil.tarce(rankdata['msg']);
        }
    };
    //帮助
    p.gamehelp = function () {
        GameUtil.tarce('gamehelp');
        this.createContain();
        var helpPage = 2;
        var helpcurtag = 0;
        var self = this;
        //帮助背景
        var helpbg = new GameUtil.MyBitmap(RES.getRes('helpbg_png'), this.mStageW / 2, 694);
        this.othercontain.addChild(helpbg);
        helpbg.touchEnabled = true;
        //帮助内容
        var helpcontain = new egret.DisplayObjectContainer();
        this.othercontain.addChild(helpcontain);
        helpcontain.width = this.mStageW;
        helpcontain.height = this.mStageH;
        this.helpcurcontain(helpcontain, helpbg, 0);
        //帮助页标志（圆点）
        for (var i = 0; i < helpPage + 1; i++) {
            var helppagepoint = new GameUtil.MyBitmap(RES.getRes('helppagepoint_png'), 0, 800);
            this.othercontain.addChild(helppagepoint);
            GameUtil.relativepos(helppagepoint, helpbg, 280 + 85 * i, 290);
        }
        //帮助当前页
        var helpselect = new GameUtil.MyBitmap(RES.getRes('helpselect_png'), 367, 800);
        this.othercontain.addChild(helpselect);
        GameUtil.relativepos(helpselect, helpbg, 280, 290);
        //关闭按钮
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.closecontain);
        this.othercontain.addChild(close);
        GameUtil.relativepos(close, helpbg, 580, 27);
        //切换逻辑
        var startx = 0;
        helpbg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            startx = evt.stageX;
        }, this);
        helpbg.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
            var endx = evt.stageX;
            if (endx - startx >= 100) {
                helpcurtag = (++helpcurtag > helpPage) ? 0 : helpcurtag;
            }
            else if (startx - endx > 100) {
                helpcurtag = (--helpcurtag < 0) ? helpPage : helpcurtag;
            }
            self.helpcurcontain(helpcontain, helpbg, helpcurtag);
            GameUtil.relativepos(helpselect, helpbg, 280 + 85 * helpcurtag, 290);
        }, this);
    };
    p.helpcurcontain = function (helpcontain, helpbg, curtag) {
        helpcontain.removeChildren();
        var hlepimg = new GameUtil.MyBitmap(RES.getRes('help_controlimg_png'), 0, 0);
        var helptext = new GameUtil.MyTextField(0, 0, 40, 0, 0);
        helptext.textColor = 0x906128;
        if (curtag == 0) {
            helpcontain.addChild(hlepimg);
            GameUtil.relativepos(hlepimg, helpbg, 135, 140);
            helptext.text = '使用摇杆控制角色移动';
            helptext.setSize(50);
            helptext.width = 290;
            helpcontain.addChild(helptext);
            GameUtil.relativepos(helptext, helpbg, 280, 87);
        }
        else if (curtag == 1) {
        }
        else if (curtag == 2) {
        }
    };
    p.setting = function () {
        GameUtil.tarce('setting');
    };
    p.share = function () {
        GameUtil.tarce('share');
    };
    //创建一个新的通用容器
    p.createContain = function () {
        this.othercontain = new egret.DisplayObjectContainer();
        this.addChild(this.othercontain);
        this.othercontain.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.othercontain.addChild(shap);
    };
    //关闭其他容器
    p.closecontain = function () {
        egret.Tween.removeAllTweens();
        this.removeChild(this.othercontain);
        this.othercontain = null;
    };
    p.playBGM = function () {
        //GameData._i().gamesound[SoundName.startgamebgm].play(0,-1);
        //var volume = GameUtil.GameConfig._i().bgamemusic ? 1:0;
        //GameData._i().gamesound[SoundName.startgamebgm].setvolume(volume);
    };
    return StartGameScene;
}(GameUtil.BassPanel));
egret.registerClass(StartGameScene,'StartGameScene');
