export interface HitokotoResult {
    id: number; //一言标识
    hitokoto: string; //一言正文。编码方式 unicode。使用 utf-8。
    type: string; //类型。请参考第三节参数的表格
    from: string; //一言的出处
    from_who: string | null; //一言的作者
    creator: string; //添加者
    creator_uid: number; //添加者用户标识
    reviewer: number; //审核员标识
    uuid: string; //一言唯一标识；可以链接到 https://hitokoto.cn?uuid=[uuid] 查看这个一言的完整信息
    commit_from: string; //提交方式
    created_at: string; //添加时间
    length: number; //句子长度
}
