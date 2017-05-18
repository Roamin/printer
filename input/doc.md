#### /api/inviteGift/getList 获取页面数据（搜索）

##### GET如果觉得不合适，POST 也行，请指出

##### Request 请求参数

```js
var obj = {
        PageIndex: 1, // 当前页码
        PageSize: 10, // 每页数据条数

        ActivityId: '', // 活动 Id，空为不限
        GameAbbr: '', // 游戏缩写，空为不限
        ActivityStatus: '', // 状态，空-不限，0-开启，1-关闭
        Updater: '', // 编辑人
        StartTime: '', // 开始时间，时间戳格式（精确到毫秒）
        EndTime: '', // 结束时间，时间戳格式（精确到毫秒）
        GameRule: '', // 游戏玩法，空-全部，0-熟人模式，1-经典模式（如果玩法很多，另定）
}
```

##### Response 返回参数

```
{
    Data: {
        TotalNum: 22, // 总共有几条数据
        List: [{
            ActivityId: 1, // 活动 Id
            GameAbbr: 'cdml', // 游戏缩写
            GameName: '景德镇麻将', // 游戏名称
            GameRuleName: '熟人模式', // 游戏玩法
            StartTime: 1493568000000, // 开始时间，时间戳格式（精确到毫秒）
            EndTime: 1496160000000, // 结束时间，时间戳格式（精确到毫秒）
            Status: 1, // 状态，0-开启，1-关闭
            Updater: 'dongyq', // 编辑人
            UpdateTime: 1494557148379, // 最后修改时间，时间戳格式（精确到毫秒）
        }]
    },
    Status: true, // true-成功，false-失败
    Message: 'Success'
}
```

<br>

---

<br>

#### /api/inviteGift/save' 保存某条数据（包括添加、编辑）

##### POST

##### Request 请求参数

```
{
    ActivityId: 1, // 活动 Id
    ActivityTarget: 1, // 活动范围，0-游戏新用户，1-新用户

    GameAbbr: 'cdml', // 游戏缩写
    GameName: '景德镇麻将', // 游戏名称

    StartTime: 1493568000000, // 开始时间，时间戳格式（精确到毫秒）
    EndTime: 1496160000000, // 结束时间，时间戳格式（精确到毫秒）

    GameRule: 1, // 游戏玩法，空-全部，0-熟人模式，1-经典模式（如果玩法很多，另定）
    GameRuleName: '熟人模式', // 游戏玩法

    BindType: '1,2', // 绑定方式，1-第三方应用授权，2-手机号验证，字符串(逗号分隔)

    GUID: 'd7e5dec4-e1b7-4164-b933-fb9c1f7130b8', // 奖品 GUID

    InviteGiftList: [ // 邀请人奖品
        {
            ItemId: 21617,
            ItemName: '10元话费',
            Number: 10,
            UnitID: 2001,
            UnitName: '张'
        }
    ],

    InvitedGiftList: [ // 受邀人奖品
        {
            ItemId: 21618,
            ItemName: '欢乐币',
            Number: 100,
            UnitID: 2001,
            UnitName: '点'
        }
    ],

    ActivityDescription: '巴拉巴拉巴拉' // 活动说明（可能富文本）
}
```

##### Response 返回参数

```
{
    Data: {},
    Status: false, // true-成功，false-失败
    Message: 'Something wrong'
}
```

<br>

---

<br>

##### /api/inviteGift/getInfo 获取某条数据详情

##### GET

##### Request 请求参数

```
{
    ActivityId: 1 // 查询的活动 Id
}
```

##### Response 返回参数

```
{
    Data: {
        ActivityId: 1, // 活动 Id
        ActivityTarget: 1, // 活动范围，1-游戏新用户，2-新用户

        GameAbbr: 'cdml', // 游戏缩写
        GameName: '景德镇麻将', // 游戏名称

        StartTime: 1493568000000, // 开始时间，时间戳格式（精确到毫秒）
        EndTime: 1496160000000, // 结束时间，时间戳格式（精确到毫秒）

        GameRule: 1, // 游戏玩法，0-不限，1-熟人模式，2-经典模式（如果玩法很多，另定）
        GameRuleName: '熟人模式', // 游戏玩法

        BindType: '1,2', // 绑定方式，1-第三方应用授权，2-手机号验证，字符串(逗号分隔)

        GUID: 'd7e5dec4-e1b7-4164-b933-fb9c1f7130b8', // 奖品 GUID

        InviteGiftList: [ // 邀请人奖品
            {
                ItemId: 21617,
                ItemName: '10元话费',
                Number: 10,
                UnitID: 2001,
                UnitName: '张'
            }
        ],

        InvitedGiftList: [ // 受邀人奖品
            {
                ItemId: 21618,
                ItemName: '欢乐币',
                Number: 100,
                UnitID: 2001,
                UnitName: '点'
            }
        ],

        ActivityDescription: '巴拉巴拉巴拉' // 活动说明（可能富文本）
    },
    Status: false, // true-成功，false-失败
    Message: 'Something wrong'
}
```

<br>

---

<br>

#### /api/inviteGift/getGiftList 获取 GUID 的奖品列表

##### POST

##### Request 请求参数

```
{
    GUID: 'd7e5dec4-e1b7-4164-b933-fb9c1f7130b8', // 奖品 GUID
}
```

##### Response 返回参数

```
{
    Data: [{
        ItemId: 10212,
        ItemName: '同城游银子',
        ItemCode: 'CF-YL',
        UnitID: 2001,
        UnitName: '一个'
    }],
    Status: false, // true-成功，false-失败
    Message: 'Something wrong'
}
```

<br>

---

<br>


#### /api/inviteGiftLog/getList 获取日志页面数据（搜索）

##### GET 如果觉得不合适，POST 也行，请指出

##### Request 请求参数

```
{
    PageIndex: 1, // 当前页码
    PageSize: 10, // 每页数据条数

    ActivityId: '', // 活动 Id，空为不限
    GameAbbr: '', // 游戏缩写，空为不限
    InviteId: '', // 邀请人 Id
    InvitedId: '', // 受邀人 Id
    SourceType: 0, // 受邀来源，0-全部，1-微信好友，2-朋友圈
    Status: '', // 状态，0-不限，1-开启，2-关闭
    Updater: '', // 编辑人
    StartTime: '', // 开始时间，时间戳格式（精确到毫秒）
    EndTime: '', // 结束时间，时间戳格式（精确到毫秒）
    GameRule: '' // 游戏玩法，0-不限，1-熟人模式，2-经典模式（如果玩法很多，另定）
}
```

##### Response 返回参数

```
{
    Data: {
        TotalNum: 22, // 总共有几条数据
        List: [{
            ActivityId: 1, // 活动 Id
            GameAbbr: 'cdml', // 游戏缩写
            GameName: '景德镇麻将', // 游戏名称
            GameRuleName: '熟人模式', // 游戏玩法
            StartTime: 1493568000000, // 开始时间，时间戳格式（精确到毫秒）
            EndTime: 1496160000000, // 结束时间，时间戳格式（精确到毫秒）
            Status: 1, // 状态，1-开启，2-关闭
            Updater: 'dongyq', // 编辑人
            UpdateTime: 1494557148379, // 最后修改时间，时间戳格式（精确到毫秒）
        }]
    },
    Status: true, // true-成功，false-失败
    Message: 'Success'
}
```