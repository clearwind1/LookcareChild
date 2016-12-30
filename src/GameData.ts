/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */

class GameData {

    public GameOver: boolean;               //游戏结束标志
    public isLoadingend: boolean;           //游戏加载进度结束标志
    public gamesound: MySound[] = [];       //游戏声音

    public constructor() {
        this.init();
    }

    private init()
    {
        this.GameOver = false;
        this.isLoadingend = false;
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}