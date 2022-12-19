// ==UserScript==
// @name         bilibili头图时光机TimeMachineForBilibilitest
// @version      0.1
// @description  现在就把时间调回2019年1月。头图&logo按照日期变回2019年1月对应日期的样子。
// @author       zumg
// @match        https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @license      GPL
// @namespace 
// ==/UserScript==

(function() {
    function dayMove(dDict,limit,y,m,n){
        //目标字典，最大的偏移天数，年增减，月增减，日增减
        function yearM(year){
            if((year%4==0 && year%100!=0) || year%400==0)return [31,29,31,30,31,30,31,31,30,31,30,31]
            else return [31,28,31,30,31,30,31,31,30,31,30,31]
        }
        function mChange(yyyy,mm,dd){
            while (mm>11){
                mm-=11
                yyyy+=1}
            while(mm<0){
                mm+=11
                yyyy-+1}
            return [yyyy,mm,dd]
        }
        function dChange(yyyy,mm,dd){
            while(dd>yearM(yyyy)[mm]){
                dd-=yearM(yyyy)[mm]
                mm+=1
                var a=mChange(yyyy,mm)
                mm=a[1]
                yyyy=a[0]
            }
            while(dd<1){
                mm-=1
                a=mChange(yyyy,mm)
                mm=a[1]
                yyyy=a[0]
                dd+=yearM(yyyy)[mm]
            }
            return [yyyy,mm,dd]
    
        }
        var d=new Date()
        var yyyy=d.getFullYear()+y
        var mm=d.getMonth()+m
        var a=mChange(yyyy,mm,dd)
        yyyy,mm,dd=a[0],a[1],a[2]
        var dd=d.getDate()+n
        a=dChange(yyyy,mm,dd)
        yyyy,mm,dd=a[0],a[1],a[2]
    
    
        var monLis=yearM(d.getFullYear())
        var num=0
        var date
        var years,months,days=yyyy,mm,dd
        while(num<=limit){
            //优先减天数
            for(var i=1;i<=2;i++){
            dChange(years,months,days)
            years,months,days=a[0],a[1],a[2]
            date=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate()-num
            if(dDict[date]){console.log(num);return (dDict[date]) }
            //加天数
            num*=-1
            }
            num+=1
        }
        return ('不在范围内')
    }
    console.log(1234545)
    var a={20191101: {'video': {'【Mitchie M】初音未来《暗杀公主》【漫画风格MV】': ['https://www.bilibili.com/video/av73877729/', 'i2.hdslb.com/bfs/archive/a98d64e09fd723ae187bf7a7e423b4ca88ba9545.jpg'], '【GUMI&LUKA】Gimme×Gimme【VOCALOID COVER】': ['https://www.bilibili.com/video/av73848765/', 'i1.hdslb.com/bfs/archive/41ca23330fa71c19e5fc2caec797d75770ac290b.jpg'], '【VMOD】最后一期 第一期：欺骗了几乎所有人长达12年的低端骗局': ['https://www.bilibili.com/video/av73900083/', 'i1.hdslb.com/bfs/archive/09da4884c9d0f6809ac205347e3970d19ff70c9a.jpg'], '【明日方舟OP】女性干员的虚度日常': ['https://www.bilibili.com/video/av73862937/', 'i1.hdslb.com/bfs/archive/ea7b92dc6b4711f566229e49fdd2ed107eaa31e2.png'], '【突破次元壁】二次元视觉盛宴一秒降临，感受这个世界的美好！': ['https://www.bilibili.com/video/av73825655/', 'i2.hdslb.com/bfs/archive/4e769384b77c58cf4ec0bae8e4013184659236c0.jpg'], '【日剧混剪/治愈】今天也要好好吃饭': ['https://www.bilibili.com/video/av73923411/', 'i2.hdslb.com/bfs/archive/f0423e3dece92195828f11d60a7188b784c49341.jpg'], '中文歌配上动画3': ['https://www.bilibili.com/video/av73955902/', 'i0.hdslb.com/bfs/archive/b991f1bebf405a51d401810b9a029ac014a9d55b.jpg'], '【新番有毒】十月最离奇一幕 眼睛放刀光 次元斩脖子': ['https://www.bilibili.com/video/av73831891/', 'i1.hdslb.com/bfs/archive/dae15f1d8f61efa5b9ad6a0fa3e6b293df0bf7ed.jpg']}, 'panel': {'': ['https://www.bilibili.com/bangumi/play/ep289695', 'i0.hdslb.com/bfs/archive/f3d4ae462080a23c2bce0a43d6ab37f93c0560c1.jpg@880w_440h.webp']}, 'url': 'http://web.archive.org/web/20191101022530/https://www.bilibili.com/', 'headerUrl': 'i0.hdslb.com/bfs/archive/1ee3febf53becf8ca9e84387c4578f1b41c354be.png', 'logoUrl': 'i0.hdslb.com/bfs/archive/b3f60a4037cbe7a246b82d0ab28f40694a5a756c.png'},}
    
    var b=dayMove(a,15,-4,1,0)
    
        setTimeout(function(){
            document.getElementsByClassName('bili-grid')[1].innerHTML+='<ul style="width: 100%;border: 2px solid rgb(187, 187, 187);padding: 0.8%;margin: 0 auto;font-size: 0;display: block;border-radius: 20px;">'
            for (key in b){
            document.getElementsByClassName('bili-grid')[1].innerHTML+='<li style="width: 23%;margin:  0 auto;padding: 1%;border:0; min-width: 60px;display: inline-block;list-style: nano;font-size: 16px;vertical-align: bottom">'+
                `<a style=" text-decoration:none;" target="_blank" href="${b['key'][1]}">`+
                `<img style="width: 100%;border-radius: 10px;margin-bottom: 5px;" src="${b['key'][1]}"></img>`+
                '<div style="width: 100%;height: 30px;overflow:hidden;font-size: 14px;line-height: 15px;color: black;">'+
                    key+
                '</div>'+
                '</a>'}
            document.getElementsByClassName('bili-grid')[1].innerHTML+='</li>'
    
            
        '</ul>'
            document.getElementsByClassName('bili-grid')[1].classList=''
        },400)
    
    })();