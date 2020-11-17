import Mock from 'mockjs'
const Random=Mock.Random
const preoductSWipe=function () {
        var swipe=[]
        for (let i = 0; i < 4; i++) {
           swipe[i]={
               'img':Random.image(Random.dataImage(),Random.color())
           }
        }
        return swipe
}

Mock.mock('/api/productswipe','get',preoductSWipe)