/**
 * Created by pior on 16/12/15.
 */

enum SoundName{end};
class GameConfig
{
    public static DEBUG: boolean = true;
    public static IP: string = "api.h5.gamexun.com";        //http连接地址
    public static GAMENAME: string = 'bubblefightv02';      //游戏在服务器上的名字
    public static SERVERNAME: string = 'paopao';            //服务器连接名
    public static FIRSTGAME: string = 'firstgame';  //第一次进游戏标示
    public static GAMESOUND: string = 'gamesound';  //游戏音效
    public static GAMEMUSIC: string = 'gamemusic';  //游戏音乐
    public static SoundName: string[] = [];

    //场景转换
    public static NullAction:number = 0;            //无动画
    public static CrossLeft:number = 1;             //从左往右
    public static TransAlpha:number = 2;            //淡入淡出
    public static OpenDoor:number = 3;              //开门方式

    public static DesignWidth:number = 750;
    public static DesignHeight:number = 1334;

    private stagetY: number = 0;

    //public bfirstplay: boolean;
    public bgamesound: boolean;
    public bgamemusic: boolean;

    public constructor()
    {
        this.initconfigdata();
    }

    private initconfigdata()
    {
        if(!GameUtil.readLocalData(GameConfig.FIRSTGAME))
        {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME,'1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND,'1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC,'1');
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC))==1 ? true:false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND))==1 ? true:false;

    }



    public setStageHeight(stagety: number):void
    {
        this.stagetY = stagety;
    }
    public getSH():number
    {
        return this.stagetY;
    }


    private static _instance: GameConfig = null;
    public static _i(): GameConfig
    {
        if(this._instance == null){
            this._instance = new GameConfig();
        }

        return this._instance;
    }

}