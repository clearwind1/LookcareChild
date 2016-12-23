/**
 * Created by pior on 16/4/6.
 */
var TimeType;
(function (TimeType) {
    TimeType[TimeType["ADDTIME"] = 0] = "ADDTIME";
    TimeType[TimeType["SUBTIME"] = 1] = "SUBTIME";
})(TimeType || (TimeType = {}));
;
var TimePanel = (function (_super) {
    __extends(TimePanel, _super);
    function TimePanel() {
        _super.call(this);
    }
    var d = __define,c=TimePanel,p=c.prototype;
    /**
     * 初始化时间
     * @type 类型，增/减
     * @starttime 开始时间
     * @bdisypaly 是否显示时间
     * @timetextstyle 时间文字（x,y,size,color）
     */
    p.initdata = function (type, starttime, bdisypaly, timetextstyle) {
        this.timespeed = 1000;
        this.bpause = false;
        this.type = type;
        this.startTime = starttime;
        this.curtime = this.startTime;
        //this.bdisplaytext = bdisypaly;
        if (bdisypaly) {
            this.text = new GameUtil.MyTextField(timetextstyle['x'], timetextstyle['y'], timetextstyle['size']);
            this.text.textColor = timetextstyle['color'];
            this.text.setText(DateUtils.getFormatBySecond(this.curtime));
            this.addChild(this.text);
        }
    };
    /**
     * 设置时间运行速度
     * @speed 速度越大，运行就越慢
     */
    p.setTimespeed = function (speed) {
        this.timespeed = speed;
    };
    /**
     * 开始运行时间
     */
    p.start = function () {
        this.curtime = this.startTime;
        this.timetag = egret.setInterval(this.runtime, this, this.timespeed);
    };
    /**
     * 暂停时间
     */
    p.pause = function () {
        this.bpause = true;
    };
    /**
     * 继续时间
     */
    p.resume = function () {
        this.bpause = false;
    };
    /**
     * 停止时间
     */
    p.stop = function () {
        this.removeInterval();
    };
    p.runtime = function () {
        if (this.bpause) {
            return;
        }
        switch (this.type) {
            case TimeType.ADDTIME:
                this.curtime++;
                this.updataTimetext();
                break;
            case TimeType.SUBTIME:
                this.curtime--;
                if (this.curtime < 0) {
                    this.curtime = 0;
                    this.removeInterval();
                }
                this.updataTimetext();
                break;
        }
    };
    p.removeInterval = function () {
        egret.clearInterval(this.timetag);
    };
    /**
     * 获取当前时间
     */
    p.getCurTime = function () {
        return this.curtime;
    };
    /**
     * 获取时间文字
     */
    p.getText = function () {
        if (this.text)
            return this.text;
    };
    p.updataTimetext = function () {
        if (this.text)
            this.text.setText(DateUtils.getFormatBySecond(this.curtime));
    };
    return TimePanel;
}(GameUtil.BassPanel));
egret.registerClass(TimePanel,'TimePanel');
//# sourceMappingURL=TimePanel.js.map