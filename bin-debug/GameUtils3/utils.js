/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    //游戏配置
    var GameConfig = (function () {
        function GameConfig() {
            this.stagetY = 0;
        }
        var d = __define,c=GameConfig,p=c.prototype;
        GameConfig._i = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.GameConfig();
            }
            return this._instance;
        };
        p.setStageHeight = function (stagety) {
            this.stagetY = stagety;
        };
        p.getSH = function () {
            return this.stagetY;
        };
        GameConfig.IP = "api.h5.gamexun.com"; //http连接地址
        GameConfig.bRunFPS = false; //是否显示FPS
        //场景转换
        GameConfig.NullAction = 0; //无动画
        GameConfig.CrossLeft = 1; //从左往右
        GameConfig.TransAlpha = 2; //淡入淡出
        GameConfig.OpenDoor = 3; //开门方式
        GameConfig.DesignWidth = 750;
        GameConfig.DesignHeight = 1334;
        GameConfig._instance = null;
        return GameConfig;
    }());
    GameUtil.GameConfig = GameConfig;
    egret.registerClass(GameConfig,'GameUtil.GameConfig');
    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    function createRect(x, y, width, height, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createRect = createRect;
    function createCircle(x, y, r, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createCircle = createCircle;
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    function objectToString(postData) {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    GameUtil.objectToString = objectToString;
    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    function isChineseName(name) {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }
    GameUtil.isChineseName = isChineseName;
    function removeimag(name) {
        name = name.replace(/^/, '');
        return name;
    }
    GameUtil.removeimag = removeimag;
    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    function isPhoneNum(num) {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }
    GameUtil.isPhoneNum = isPhoneNum;
    /**
     * 数字向上飘动动画（待改进，向指定地方移动）
     * @param thisObj
     * @param x
     * @param y
     * @param size
     * @param number
     * @param color
     */
    function numberUpDisp(thisObj, x, y, size, number, color) {
        var textfiled = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;
        thisObj.addChild(textfiled);
        textfiled.anchorOffsetX = 0.5 * textfiled.width;
        textfiled.anchorOffsetY = 0.5 * textfiled.height;
        egret.Tween.get(textfiled).to({ y: y - 40 }, 700);
        egret.Tween.get(textfiled).to({ alpha: 0 }, 700).call(function () { thisObj.removeChild(textfiled); }, thisObj);
    }
    GameUtil.numberUpDisp = numberUpDisp;
    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    function saveLocalData(key, data) {
        egret.localStorage.setItem(key, data);
    }
    GameUtil.saveLocalData = saveLocalData;
    function readLocalData(key) {
        egret.localStorage.getItem(key);
    }
    GameUtil.readLocalData = readLocalData;
    function clearLocalData(key) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    GameUtil.clearLocalData = clearLocalData;
    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    GameUtil.getQueryString = getQueryString;
    function setscreenY(y) {
        if (y >= GameUtil.GameConfig.DesignHeight / 2) {
            return GameConfig._i().getSH() - (GameUtil.GameConfig.DesignHeight - y);
        }
        else {
            return y;
        }
    }
    GameUtil.setscreenY = setscreenY;
    function getRandom() {
        var rd = Math.floor(Math.random() * 100);
        return rd;
    }
    GameUtil.getRandom = getRandom;
    function getredPack(money, openid, nickNm, backfun, cont, url) {
        if (url === void 0) { url = GameUtil.GameConfig.IP; }
        var ipstr = window['getIP'];
        console.log('ipstr======', ipstr);
        //alert('ipstr====='+ipstr);
        var ipstrspl;
        for (var i = 0; i < ipstr.split('|').length; i++) {
            if (ipstr.split('|')[i].length > 6) {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }
        //alert('ipstrspl======'+ipstrspl);
        console.log('ipstrspl====', ipstrspl);
        console.log("money======", money);
        var param = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        };
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont, url);
    }
    GameUtil.getredPack = getredPack;
})(GameUtil || (GameUtil = {}));
