import request from './request'

import config from "@/config";

export const apiAddArticle = (p) => request.post('/api/add_article', p)

export const uploadToken = () => request.get('/upload/token')

export const qiNiUp = (p) => request.post('https://upload-z1.qiniup.com', p)


// 我的发布

export const get_user_article_list = (p) => request.post('/api/get_user_article_list', p)

// 我的收藏
export const get_fav_list = (p) => request.post('/api/get_fav_list', p)



// 生成文件名字
// export const createFileName = (type) => {

// },

export const createFileName = (type) => {
    let _name = Math.random().toString(16).slice(2)
    _name += +new Date()
    if (type) {
        return _name + "." + type
    }

    return _name
}

// // 上传到七牛云
// upDataQiNi(formdata) {
//     return qiNiUp(formdata);
// },



export const uploadFile = async (file) => {
    let result
    try {
        let { token } = await uploadToken()   //生成上传凭证


        // let file = this.fileList[0].file;
        let type = file.type.split("/")[1]
        let key = createFileName(type)



        let formdata = new FormData()

        formdata.append("file", file)
        formdata.append("key", key)
        formdata.append("token", token)


        result = await qiNiUp(formdata)
        // console.log(result)

    } catch (error) {
        return Promise.reject(error)
    }
    return config.baseImgUrl + result.key
}