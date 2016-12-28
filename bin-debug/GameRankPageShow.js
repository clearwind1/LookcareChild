/**
 * Create by hardy on 16/12/21
 * 游戏排行榜页面
 */
var GameRankPageShow = (function (_super) {
    __extends(GameRankPageShow, _super);
    function GameRankPageShow() {
        _super.call(this);
    }
    var d = __define,c=GameRankPageShow,p=c.prototype;
    p.show = function () {
        var param = {};
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/getrank", this.getRank, this);
    };
    p.getRank = function (rankdata) {
        if (rankdata['code'] == 1) {
            var result = rankdata['result'];
            var rankbg = new MyBitmap(RES.getRes('rankbg_png'), this.mStageW / 2, this.mStageH / 2);
            this.addChild(rankbg);
            var textt = ['序号', 'ID', '总分'];
            for (var t = 0; t < 3; t++) {
                var text = new GameUtil.MyTextField(0, 0, 40);
                text.setText(textt[t]);
                text.textColor = 0x906128;
                this.addChild(text);
                GameUtil.relativepos(text, rankbg, 108 + t * 190, 111);
            }
            var rankcontainsv = new GameUtil.ScrollView(518, 450);
            this.addChild(rankcontainsv);
            GameUtil.relativepos(rankcontainsv, rankbg, 62, 142);
            for (var i = 0; i < 20; i++) {
                var coverb = new MyBitmap(RES.getRes('rankcontain' + (i % 7) + '_png'), 259, 26 + i * 64);
                rankcontainsv.putItem(coverb);
                var ranknum = new MyBitmap(RES.getRes('ranknum_png'), 45, 30 + i * 64);
                rankcontainsv.putItem(ranknum);
                var ranknt = new GameUtil.MyTextField(45, 25 + i * 64, 30);
                ranknt.setText((i + 1) + '');
                ranknt.textColor = 0xa96100;
                rankcontainsv.putItem(ranknt);
                var playname = new GameUtil.MyTextField(235, 26 + i * 64, 40, 0.5);
                //playname.setText('test1' + result[i]['nickname']);
                playname.setText('test' + i);
                playname.textColor = 0xffffff;
                rankcontainsv.putItem(playname);
                var playscore = new GameUtil.MyTextField(423, 26 + i * 64, 40, 0.5);
                //playscore.setText('' + result[i]['jifen']);
                playscore.setText(100 + i + '');
                playscore.textColor = 0xffffff;
                rankcontainsv.putItem(playscore);
            }
            var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
            this.addChild(close);
            GameUtil.relativepos(close, rankbg, 600, 80);
        }
        else {
            GameUtil.trace(rankdata['msg']);
        }
    };
    return GameRankPageShow;
}(Othercontainer));
egret.registerClass(GameRankPageShow,'GameRankPageShow');
//# sourceMappingURL=GameRankPageShow.js.map