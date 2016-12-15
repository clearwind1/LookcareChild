/**
 * Created by pior on 16/12/15.
 */

class GameData {

    public GameOver: boolean;
    public isLoadingend: boolean;
    public gamesound: MySound[] = [];

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