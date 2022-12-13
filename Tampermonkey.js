// ==UserScript==
// @name         bilibili头图时光机TimeMachineForBilibili
// @version      0.1
// @description  把bilibili首页头图换成一年前的样子。
// @author       zumg
// @match        https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    console.log("启动")
    //时间
    function dayMove(dDict,limit){
        function yearM(year){
            if((year%4==0 && year%100!=0) || year%400==0)return [31,29,31,30,31,30,31,31,30,31,30,31]
            else return [31,28,31,30,31,30,31,31,30,31,30,31]
        }
        
        d=new Date()
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

    var logoUrl="i0.hdslb.com/bfs/archive/58d322146cb4b1685a5775478b9753f96a0c2ff6.png"
    var bannerUrl="static.hdslb.com/images/header/20141001_banner.jpg"

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



if( windowUrl.match(/https:\/\/www.bilibili.com\/($|\?)/)){
    var source=[["//i0.hdslb.com/bfs/archive/0ac04c23af3b3297bf02dca163474326898d211d.png","//i0.hdslb.com/bfs/archive/583e5db0ffa0c4de4fc88de35e802767a9c93b63.png","//i0.hdslb.com/bfs/archive/ab6b34468bcc179b601541193eda668f2aa6106b.jpg","//i0.hdslb.com/bfs/archive/a421773e566a623fca26e12ae3921bda4a3fd856.png","//i0.hdslb.com/bfs/archive/3329c9f0abfb925ae30441f24d924ad3c19775df.png","//i0.hdslb.com/bfs/archive/57c5ced363be9f08b4cacf1745e221d3bb99d7c5.png"],["//i0.hdslb.com/bfs/archive/bdb288021ff854d3ac618ac8c1eafd300ec9ed9b.png","//i0.hdslb.com/bfs/archive/5d49497b6b7f30950f37c4aff205e7dd1494f3b9.png","//i0.hdslb.com/bfs/archive/bd90aa68aaaaddb1b5421b84298c51f5b90210e0.png","//i0.hdslb.com/bfs/archive/3d30de7942ed74d2515f28ae04eb1444e8d57f40.png","//i0.hdslb.com/bfs/archive/6592e92861e6248205af17702d06ea3f97d81de6.png","//i0.hdslb.com/bfs/archive/58d322146cb4b1685a5775478b9753f96a0c2ff6.png"]]
    var index=Math.floor(Math.random()*6);
    if(document.getElementsByClassName("v-img banner-img").length){document.getElementsByTagName("v-img banner-img")[0].getElementsByTagName("source")[0].setAttribute("srcset",source[0][index]);
    document.getElementsByClassName("logo-img")[0].setAttribute("src",source[1][index]);}
    else setTimeout(function(){document.getElementsByClassName("bili-banner")[0].innerHTML.style.setProperty("background-image","url(\""+source[0][index]+"\")");
    document.getElementsByClassName("logo-img")[0].setAttribute("src",source[1][index]);},500);
}