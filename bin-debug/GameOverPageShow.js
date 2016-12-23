/**
 * Create by hardy on 16/12/21
 * 游戏结束页面
 */
var GameOverPageShow = (function (_super) {
    __extends(GameOverPageShow, _super);
    function GameOverPageShow() {
        _super.call(this);
    }
    var d = __define,c=GameOverPageShow,p=c.prototype;
    p.show = function () {
        if (GameConfig.DEBUG) {
            var data = {
                'code': 1
            };
            this.showscene(data);
        }
        else {
            var param = {
                openid: PlayerData._i().UserInfo.openid,
                counts: PlayerData._i().UserInfo.killsoldier,
                countg: PlayerData._i().UserInfo.killgengeral
            };
            GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/updatekilldata", this.showscene, this);
        }
    };
    p.showscene = function (data) {
        if (data['code'] == 1) {
            var gameoverbg = new MyBitmap(RES.getRes('gameoverbg_png'), this.mStageW / 2, this.mStageH / 2);
            this.addChild(gameoverbg);
            var gameovertext = new MyBitmap(RES.getRes('gameovertext_png'));
            this.addChild(gameovertext);
            GameUtil.relativepos(gameovertext, gameoverbg, 233, 61);
            //var btname: string[] = ['normalbtn_png','normalbtn_png','normalbtn_png'];
            var btname = 'normalbtn_png';
            var btntext = ['炫耀', '退出', '重来'];
            var btnfun = [this.share, this.turnback, this.relife];
            for (var i = 0; i < 3; i++) {
                var btn = new GameUtil.Menu(this, btname, btname, btnfun[i]);
                btn.addButtonText(btntext[i], 35);
                this.addChild(btn);
                btn.getBtnText().textColor = 0xffffff;
                btn.getBtnText().$setBold(true);
                GameUtil.relativepos(btn, gameoverbg, 75 + i * 155, 470);
            }
            var infotext = ['杀敌:', '时长:', '杀将:', '总分:'];
            var usetime = DateUtils.getFormatBySecond(300);
            var infoData = [PlayerData._i().UserInfo.killsoldier, usetime, PlayerData._i().UserInfo.killgeneral, PlayerData._i().UserInfo.jifen];
            for (var i = 0; i < 4; i++) {
                var textposx = 100;
                var textposy = 115;
                var infoT = new GameUtil.MyTextField(0, 0 + 60 * i, 50, 0, 0);
                infoT.setText(infotext[i]);
                infoT.textColor = 0x906128;
                this.addChild(infoT);
                GameUtil.relativepos(infoT, gameoverbg, textposx, textposy + 60 * i);
                var infoTD = new GameUtil.MyTextField(0 + 130, 0 + 60 * i, 50, 0, 0);
                infoTD.setText(infoData[i]);
                infoTD.textColor = 0x906128;
                this.addChild(infoTD);
                GameUtil.relativepos(infoTD, gameoverbg, textposx + 130, textposy + 60 * i);
            }
        }
        else {
            data['msg'];
        }
    };
    p.share = function () {
        this.addChild(new SharePageShow());
    };
    p.turnback = function () {
        PlayerData._i().initdata();
        this.close();
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    p.relife = function () {
        PlayerData._i().initdata();
        this.close();
    };
    return GameOverPageShow;
}(Othercontainer));
egret.registerClass(GameOverPageShow,'GameOverPageShow');
//# sourceMappingURL=GameOverPageShow.js.map