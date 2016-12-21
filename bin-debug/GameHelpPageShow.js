/**
 * Create by hardy on 16/12/21
 * 游戏帮助页面
 */
var GameHelpPageShow = (function (_super) {
    __extends(GameHelpPageShow, _super);
    function GameHelpPageShow() {
        _super.call(this);
    }
    var d = __define,c=GameHelpPageShow,p=c.prototype;
    p.show = function () {
        var self = this;
        /**总页数 */
        var helpPage = 2;
        /**当前页 */
        var helpcurtag = 0;
        /**帮助背景 */
        var helpbg = new MyBitmap(RES.getRes('helpbg_png'), this.mStageW / 2, this.mStageH / 2);
        this.addChild(helpbg);
        helpbg.touchEnabled = true;
        /**帮助内容 */
        var helpcontain = new egret.DisplayObjectContainer();
        this.addChild(helpcontain);
        /**帮助页标志(圆点) */
        var pointpos = egret.Point.create(280, 290);
        var pointdis = 85;
        for (var i = 0; i < helpPage + 1; i++) {
            var helppagepoint = new MyBitmap(RES.getRes('helppagepoint_png'));
            this.addChild(helppagepoint);
            GameUtil.relativepos(helppagepoint, helpbg, pointpos.x + pointdis * i, pointpos.y);
        }
        /**帮助当前页标志 */
        var helpselect = new MyBitmap(RES.getRes('helpselect_png'));
        this.addChild(helpselect);
        GameUtil.relativepos(helpselect, helpbg, pointpos.x, pointpos.y);
        /**关闭按钮 */
        var close = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
        this.addChild(close);
        GameUtil.relativepos(close, helpbg, 580, 27);
        /**切换逻辑 */
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
            GameUtil.relativepos(helpselect, helpbg, pointpos.x + pointdis * helpcurtag, pointpos.y);
        }, this);
        this.helpcurcontain(helpcontain, helpbg, 0);
    };
    /**
     * 帮助内容页面
     * @helpcontain 帮助容器
     * @helpbg      帮助背景图，主要用来定位
     * @curtag      帮助当前页数
     */
    p.helpcurcontain = function (helpcontain, helpbg, curtag) {
        helpcontain.removeChildren();
        var helptext = new GameUtil.MyTextField(0, 0, 40, 0, 0);
        helptext.setText('');
        helptext.setSize(50);
        helptext.width = 290;
        helpcontain.addChild(helptext);
        helptext.textColor = 0x906128;
        GameUtil.relativepos(helptext, helpbg, 280, 87);
        if (curtag == 0) {
            var hlepimg = new MyBitmap(RES.getRes('help_controlimg_png'), 0, 0);
            helpcontain.addChild(hlepimg);
            GameUtil.relativepos(hlepimg, helpbg, 135, 140);
            helptext.text = '使用摇杆控制角色移动';
        }
        else if (curtag == 1) {
            var hlepimg = new MyBitmap(RES.getRes('spear_png'), 0, 0);
            helpcontain.addChild(hlepimg);
            GameUtil.relativepos(hlepimg, helpbg, 110, 102);
            var bow = new MyBitmap(RES.getRes('bow_png'), 0, 0);
            helpcontain.addChild(bow);
            GameUtil.relativepos(bow, helpbg, 110, 214);
            helptext.setSize(45);
            helptext.width = 340;
            helptext.text = '点击枪图标为近身攻击，弓箭为远程攻击。';
            GameUtil.relativepos(helptext, helpbg, 230, 87);
        }
        else if (curtag == 2) {
            helptext.setSize(40);
            helptext.width = 460;
            helptext.text = '小赵是无敌的，只需保护小朋友阿斗不被敌军攻击，直到撑到最后一秒。';
            GameUtil.relativepos(helptext, helpbg, 110, 87);
        }
    };
    return GameHelpPageShow;
}(Othercontainer));
egret.registerClass(GameHelpPageShow,'GameHelpPageShow');
//# sourceMappingURL=GameHelpPageShow.js.map