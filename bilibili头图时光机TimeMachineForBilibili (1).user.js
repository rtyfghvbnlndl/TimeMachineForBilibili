// ==UserScript==
// @name         bilibili头图时光机TimeMachineForBilibili
// @version      0.1
// @description  现在就把时间调回2019年1月。头图&logo按照日期变回2019年1月对应日期的样子。
// @author       zumg
// @match        https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    console.log("启动")
    //寻找最近的一天
    function dayMove(dDict,limit){
        function yearM(year){
            if((year%4==0 && year%100!=0) || year%400==0)return [31,29,31,30,31,30,31,31,30,31,30,31]
            else return [31,28,31,30,31,30,31,31,30,31,30,31]
        }

        var d=new Date()
        var monLis=yearM(d.getFullYear())
        var num=0
        var date
        while(num<=limit){

            //优先减天数
            if(d.getDate()-num>0) {
                date=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()-num
                if(dDict[date])break
            }
            else{
                var days=d.getDate()-num
                var months=d.getMonth()
                var years=d.getFullYear()
                var monLiss=yearM(d.getFullYear())
                while(days<=0){
                    months-=1
                    if(months==-1){
                        years-=1
                        monLiss=yearM(years)
                        months=11
                    }
                    days+=monLiss[months]
                }
                date=years*10000+(months+1)*100+days
                if(dDict[date])break

            }
            //加天数
            if(d.getDate()+num<=monLis[d.getMonth()]){
                date=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()+num
                if(dDict[date])break
            }
            else{
                var dayt=d.getDate()+num
                var montht=d.getMonth()
                var yeart=d.getFullYear()
                var monList=yearM(d.getFullYear())
                while(dayt>monList[montht]){
                    dayt-=monList[montht]
                    montht+=1
                    if(montht==12){
                        yeart+=1
                        monList=yearM(yeart)
                        montht=0
                    }
                }
                date=yeart*10000+(montht+1)*100+dayt
                if(dDict[date])break
            }
            num+=1
        }
        console.log(num,date)
        return (dDict[date])
    }
    //匹配链接
    var a={20221201: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221202: ['i0.hdslb.com/bfs/archive/403888a045a0549969b979040b88da6c294e7b0f.png', 'i0.hdslb.com/bfs/archive/e2538730233902be6ed61ff658beb467882ddb51.png'], 20221203: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221204: ['i0.hdslb.com/bfs/archive/403888a045a0549969b979040b88da6c294e7b0f.png', 'i0.hdslb.com/bfs/archive/e2538730233902be6ed61ff658beb467882ddb51.png'], 20221205: ['i0.hdslb.com/bfs/archive/403888a045a0549969b979040b88da6c294e7b0f.png', 'i0.hdslb.com/bfs/archive/e2538730233902be6ed61ff658beb467882ddb51.png'], 20221208: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221210: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221211: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221212: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221215: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221216: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221217: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221218: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221219: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221220: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221221: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221222: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221223: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221227: ['i0.hdslb.com/bfs/archive/3df8b541a3da595c111a8132e62b740e72df91d1.png', 'i0.hdslb.com/bfs/archive/86ebed2e57b7b0e31f4868d842f728462b9833b7.png'], 20221229: ['i0.hdslb.com/bfs/archive/fd1686cd045e9fece01fc524b01b44b48df2ece1.png', 'i0.hdslb.com/bfs/archive/b14473636912126e124ea3c6a4d2b62b1a125205.png'], 20221214: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221224: ['i0.hdslb.com/bfs/archive/6c42c40ed54f4bb5ea491894aff693878afa6580.png', 'i0.hdslb.com/bfs/archive/08f98bb10251bb89461c0f3d50c864327b1ac05d.png'], 20221230: ['i0.hdslb.com/bfs/archive/28b71a2c7ab7bf0a683858d980b189abae41b1f2.png', 'i0.hdslb.com/bfs/archive/1fd2a41ee943588049f5375127471e31402bab2b.png']}
    var b=dayMove(a,5)
    //var b=a[20221230]
    var logoUrl=b[1]
    var bannerUrl=b[0]

    //改图片
    setTimeout(function(){
        if(document.getElementById("app"))
            {
            //判断为旧版
            if(bannerUrl)document.getElementById('internationalHeader').getElementsByClassName('bili-banner')[0].style.setProperty("background-image",`url("//${bannerUrl}")`)
            if(logoUrl)document.getElementsByClassName('head-logo')[0].getElementsByClassName('logo-img')[0].setAttribute("src",`//${logoUrl}`)
        }
        else{
            //判断为新版
            if(bannerUrl)document.getElementById('bili-header-banner-img').innerHTML=`<!----><source srcset="//${bannerUrl}" type="image/avif"><source srcset="//${bannerUrl}" type="image/webp"><img src="${bannerUrl}" alt="" loading="eager" onload="">`
            if(document.getElementsByClassName('bili-header__banner')[0].getElementsByTagName('video')[0])document.getElementsByClassName('bili-header__banner')[0].getElementsByTagName('video')[0].remove()
            if(logoUrl)document.getElementsByClassName('header-banner__inner')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].setAttribute("src",`//${logoUrl}`)
        }

    },400)
    console.log("结束")
})();
