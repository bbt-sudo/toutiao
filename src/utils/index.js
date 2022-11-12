import config from '@/config'
export function QNImgFilter(itemImg) {
    if (
        itemImg.includes(config.baseImgUrl) ||
        itemImg.includes(config.baseImgUrls)
    ) {
        return itemImg + "?imageMogr2/thumbnail/!x50p";
    }
    return itemImg;
}