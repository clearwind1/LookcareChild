/**
 * Create by hardy on 16/12/21
 * 游戏排行榜页面
 */
class GameRankPageShow extends Othercontainer
{
    public constructor()
    {
        super();
    }

    protected show()
    {
        var param: Object = {
        }
        GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/getrank", this.getRank, this);
    }

    private getRank(rankdata: any) {
        if (rankdata['code'] == 1) {
            var result = rankdata['result'];

            var rankbg: MyBitmap = new MyBitmap(RES.getRes('rankbg_png'), this.mStageW / 2, this.mStageH / 2);
            this.addChild(rankbg);

            for (var i: number = 0; i < result.length; i++) {
                var playname: GameUtil.MyTextField = new GameUtil.MyTextField(180, 0, 40, 0.5);
                playname.setText('test1' + result[i]['nickname']);
                playname.textColor = 0xffffff;
                this.addChild(playname);
                GameUtil.relativepos(playname, rankbg, 281, 165 + i * 64);

                var playscore: GameUtil.MyTextField = new GameUtil.MyTextField(333, 0, 40, 0.5);
                playscore.setText('' + result[i]['jifen']);
                playscore.textColor = 0xffffff;
                this.addChild(playscore);
                GameUtil.relativepos(playscore, rankbg, 450, 165 + i * 64);
            }

            var close: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
            this.addChild(close);
            GameUtil.relativepos(close, rankbg, 600, 80);
        }
        else {
            GameUtil.trace(rankdata['msg']);
        }
    }

}