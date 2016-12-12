/**
 * 提示框
 * Created by pior on 15/10/28.
 */
var GameUtil;
(function (GameUtil) {
    var TipsPanel = (function (_super) {
        __extends(TipsPanel, _super);
        /**
         * 创建一个提示框
         * @param tipimg 提示框图片名
         * @param tipText 提示文字
         * @param disp 是否自己消失
         * @param sec 自己消失时间
         */
        function TipsPanel(tipimg, tipText, disp, sec) {
            if (disp === void 0) { disp = false; }
            if (sec === void 0) { sec = 1200; }
            _super.call(this);
            this.textsize = 30;
            this.mStageW = egret.MainContext.instance.stage.stageWidth;
            this.mStageH = egret.MainContext.instance.stage.stageHeight;
            this.tipText = tipText;
            this.tipImg = tipimg;
            this.bDisappear = disp;
            this.disSecond = sec;
            this.init();
        }
        var d = __define,c=TipsPanel,p=c.prototype;
        p.init = function () {
            if (!this.bDisappear) {
                var coverbg = GameUtil.createRect(0, 0, window.screen.availWidth, window.screen.availHeight, 0.4);
                this.addChild(coverbg);
                this.touchEnabled = true;
            }
            if (this.tipImg == null) {
                var tipbgcover = GameUtil.createRect(this.mStageW / 2, this.mStageH / 2, window.screen.availWidth, 100, 1, 0x8c8b88);
                tipbgcover.anchorOffsetX = tipbgcover.width / 2;
                tipbgcover.anchorOffsetY = tipbgcover.height / 2;
                this.addChild(tipbgcover);
            }
            else {
                this.tipbg = new GameUtil.MyBitmap(RES.getRes(this.tipImg), this.mStageW / 2, this.mStageH / 2);
                this.addChild(this.tipbg);
            }
            this.showtip();
            if (!this.bDisappear) {
                this.showbutton();
            }
            else {
                var tw = egret.Tween.get(this);
                tw.to({ alpha: 1 }, 300).to({ alpha: 0 }, this.disSecond).call(this.close, this);
            }
        };
        /**
         * 显示提示文字
         */
        p.showtip = function () {
            this.text = new GameUtil.MyTextField(this.mStageW / 2, this.mStageH / 2, this.textsize);
            this.text.setText(this.tipText);
            this.text.textColor = 0x000000;
            this.addChild(this.text);
        };
        /**
         * 提示文字的长度
         * @param width 长度
         */
        p.setTextwidth = function (width) {
            this.text.width = width;
        };
        /**
         * 提示文字字体大小
         * @param size 尺寸
         */
        p.setTextSize = function (size) {
            this.text.setSize(size);
        };
        p.setTextHor = function (anchorX, anchorY, align, offx) {
            this.text.textAlign = align;
            this.text.x = this.mStageW / 2 - this.tipbg.width / 2 + offx;
        };
        p.setTextlineSpacing = function (spacing) {
            this.text.lineSpacing = spacing;
        };
        /**
         * 显示确认按钮
         */
        p.showbutton = function () {
            var surebtn = new GameUtil.Menu(this, "acceptBtn_png", "acceptBtn_png", this.close);
            surebtn.x = this.mStageW / 2;
            surebtn.y = this.mStageH / 2 + this.tipbg.texture.textureHeight / 2;
            this.addChild(surebtn);
            surebtn.setScaleMode();
        };
        p.close = function () {
            this.parent.removeChild(this);
        };
        return TipsPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.TipsPanel = TipsPanel;
    egret.registerClass(TipsPanel,'GameUtil.TipsPanel');
})(GameUtil || (GameUtil = {}));
