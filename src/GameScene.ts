/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private player: Player;             //玩家
    private gametime: TimePanel;        //游戏时间
    public enemyContain: egret.DisplayObjectContainer; //敌人容器

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
        var gamebg: MyBitmap = new MyBitmap(RES.getRes('gamebg_jpg'), 0, 0);
        gamebg.setanchorOff(0, 0);
        gamebg.width = this.mStageW;
        gamebg.height = this.mStageH;
        this.addChild(gamebg);

        /**创建敌人容器 */
        this.enemyContain = new egret.DisplayObjectContainer();
        this.addChild(this.enemyContain);
        /**创建玩家 */
        this.player = new Player();
        this.addChild(this.player);
        /**创建时间 */
        var timetextstyle: Object = { 'x': GameUtil.absposx(100), 'y': 40, 'size': 35, 'color': 0xffffff };
        this.gametime = new TimePanel();
        this.gametime.initdata(TimeType.ADDTIME, 0, true, timetextstyle);
        this.addChild(this.gametime);
        this.gametime.start();

        this.createEnemy();

        this.addChild(new ControlPanel());
    }

    public getPlayer(): Player {
        return this.player;
    }

    private createEnemy() {
        var enemysp: EnemySprite = new EnemySprite();
        enemysp.initdata(EnemyType.SOLDIER);
        this.enemyContain.addChild(enemysp);
        enemysp.start();
    }
}