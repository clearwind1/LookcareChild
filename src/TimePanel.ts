/**
 * Created by pior on 16/4/6.
 */
enum TimeType { ADDTIME, SUBTIME };
class TimePanel extends GameUtil.BassPanel {

    private timespeed: number;                  //时间运行速度
    private startTime: number;                  //开始时间
    private curtime: number;                    //当前时间
    private timetag: number;                    //时间定时器标志
    private type: TimeType;                     //时间类型：增，减
    private bpause: boolean;                    //时间暂停标志
    //private bdisplaytext: boolean;              //是否显示时间
    private text: GameUtil.MyTextField;         //显示时间

    public constructor() {
        super();
    }
    /**
     * 初始化时间
     * @type 类型，增/减
     * @starttime 开始时间
     * @bdisypaly 是否显示时间
     * @timetextstyle 时间文字（x,y,size,color）
     */
    public initdata(type: TimeType, starttime: number, bdisypaly: boolean, timetextstyle?: any) {
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
    }
    /**
     * 设置时间运行速度
     * @speed 速度越大，运行就越慢
     */
    public setTimespeed(speed: number) {
        this.timespeed = speed;
    }
    /**
     * 开始运行时间
     */
    public start() {
        this.curtime = this.startTime;
        this.timetag = egret.setInterval(this.runtime, this, this.timespeed);
    }
    /**
     * 暂停时间
     */
    public pause() {
        this.bpause = true;
    }
    /**
     * 继续时间
     */
    public resume() {
        this.bpause = false;
    }
    /**
     * 停止时间
     */
    public stop() {
        this.removeInterval();
    }

    private runtime() {
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
    }

    public removeInterval() {
        egret.clearInterval(this.timetag);
    }
    /**
     * 获取当前时间
     */
    public getCurTime(): number {
        return this.curtime;
    }
    /**
     * 获取时间文字
     */
    public getText(): GameUtil.MyTextField {
        if (this.text)
            return this.text;
    }

    private updataTimetext() {
        if (this.text)
            this.text.setText(DateUtils.getFormatBySecond(this.curtime));
    }

}