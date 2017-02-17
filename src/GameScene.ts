/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private player: Player;             //玩家
    private gametime: TimePanel;        //游戏时间
    public enemyContain: egret.DisplayObjectContainer; //敌人容器
    private intervalarr: number[];

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
        this.intervalarr = [];

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
        /**创建控制器 */
        this.addChild(new ControlPanel());

        this.gameinterval();
    }
    /**游戏定时器 */
    private gameinterval() {
        GameUtil.trace('interval');
        this.intervalarr.push(egret.setInterval(this.createEnemy, this, 2000));
    }
    /**获取玩家类 */
    public getPlayer(): Player {
        return this.player;
    }
    /**获取当前游戏时间 */
    public getcurTime(): number {
        return this.gametime.getCurTime();
    }
    /**创建敌人 */
    private createEnemy() {
        if (GameData._i().GamePause) {
            return;
        }
        var enemysp: EnemySprite = new EnemySprite();
        var dir: number = RandomUtils.limitInteger(0, 5);
        enemysp.initdata(EnemyType.SOLDIER, dir);
        this.enemyContain.addChild(enemysp);
        enemysp.start();
    }
    /**游戏结束 */
    public gameover() {
        GameUtil.trace('gameover');
        this.gametime.stop();
        egret.Tween.removeAllTweens();
        GameData._i().GameOver = true;
        this.clearinter();
        this.addChild(new GameOverPageShow());
    }
    /**重置游戏数据 */
    public reset() {
        this.enemyContain.removeChildren();
        this.gameinterval();
        this.player.reset();
        this.gametime.start();
    }
    /**清除定时器 */
    private clearinter() {
        GameUtil.clearinterval(this.intervalarr);
        for (var i: number = 0; i < this.enemyContain.numChildren; i++) {
            var enemysp: EnemySprite = <EnemySprite>this.enemyContain.getChildAt(i);
            GameUtil.clearinterval(enemysp.intervalarr);
        }
    }
}