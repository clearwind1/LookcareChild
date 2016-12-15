/**
 * Created by pior on 16/12/15.
 */

class PlayerData
{

    public UserInfo:any = {
        ID:'',
        nickname:'',
        openid:'',
        jifen:0,          //积分
        shareopenid:'',    //分享者的openid
    };

    public constructor()
    {

    }

    private static _inst:PlayerData = null;

    public static _i():PlayerData
    {
        return (this._inst = (this._inst==null ? new PlayerData():this._inst));
    }
}

