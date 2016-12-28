/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        BGMPlayer._i().play(SoundName.gamebgm);
        this.showbg();
    };
    /**
     * 显示背景
     */
    p.showbg = function () {
        var gamebg = new MyBitmap(RES.getRes('gamebg_jpg'), 0, 0);
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
        var timetextstyle = { 'x': GameUtil.absposx(100), 'y': 40, 'size': 35, 'color': 0xffffff };
        this.gametime = new TimePanel();
        this.gametime.initdata(TimeType.ADDTIME, 0, true, timetextstyle);
        this.addChild(this.gametime);
        this.gametime.start();
        this.createEnemy();
        this.addChild(new ControlPanel());
    };
    p.getPlayer = function () {
        return this.player;
    };
    p.createEnemy = function () {
        var enemysp = new EnemySprite();
        enemysp.initdata(EnemyType.SOLDIER);
        this.enemyContain.addChild(enemysp);
        enemysp.start();
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map