/**
 * Created by pior on 16/9/9.
 */
class StartGameScene extends GameUtil.BassPanel
{
    public constructor()
    {
        super();
    }

    public init()
    {
        this.showbg();
    }

    private showbg()
    {
        var bg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('startgamebg_jpg'),0,0);
        bg.setanchorOff(0,0);
        this.addChild(bg);

        var startbtn: GameUtil.Menu = new GameUtil.Menu(this,'startgamebtn_png','startgamebtn_png',this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW/2;
        startbtn.y = 600;
        this.addChild(startbtn);

    }

    private startgame()
    {
        console.log('start');
    }

}