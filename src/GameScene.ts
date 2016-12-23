/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private player: Player;             //玩家
    private gametime: TimePanel;        //游戏时间

    public constructor() {
        super();
    }
    public init() {
        BGMPlayer._i().play(SoundName.gamebgm);
        this.showbg();
    }
    /**
     * 显示背景
     */
    private showbg() {
        var gamebg: MyBitmap = new MyBitmap(RES.getRes('gamebg_png'), 0, 0);
        gamebg.setanchorOff(0, 0);
        gamebg.width = this.mStageW;
        gamebg.height = this.mStageH;
        this.addChild(gamebg);

        this.player = new Player();
        this.addChild(this.player);

        var timetextstyle: Object = { 'x': GameUtil.absposx(100), 'y': 40, 'size': 35, 'color': 0xffffff };
        this.gametime = new TimePanel();
        this.gametime.initdata(TimeType.ADDTIME, 0, true, timetextstyle);
        this.addChild(this.gametime);
        this.gametime.start();
    }

    public getPlayer(): Player {
        return this.player;
    }
}