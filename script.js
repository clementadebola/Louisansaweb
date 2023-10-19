const eId = (elm)=> (
    document.getElementById(elm)
);
const eQs = (elm)=> (
    document.querySelector(elm)
);
var curCnt = 1;
const pageData = [
    {img: "./1.jpg",title:"SING MOVIE"},
    {img: "./2.jpg",title:"FANTASTIC FOUR"},
    {img: "./3.jpg",title:"AMAZING MOVES"},
    {img: "./about.jpg",title:"BIG TONY"},
    {img: "./about2.png",title:"ALWAYS SEXY"}
];
var perBox = eId("amimate-img-fixed");
var imgBox = eId('amimate-img');
var loader = eId('loader');
var main = eId('main');
let nxt = eId('nxt');
let pre = eId('pre');
let mainImg = eId('img-title');
var title = eId('page-title');
var img = eId('image');
var scrollAction = eQs("div.right-side");
var lastScroll = scrollAction.scrollTop;
function switchContent(next){
    var allClasses = ['from-top','from-bottom','to-top','to-bottom','delay-for-loader'];
    var elm = [mainImg,title];
    elm.forEach(elm=>{
        allClasses.forEach(cls=>{
            elm.classList.remove(cls);
        })
    })
    function restartAnimation(elm){
        elm.style.animationName = null;
        var AnimationName = getComputedStyle(elm).animationName;
        //console.log(AnimationName);
        elm.style.animationName = "none";
        setTimeout(()=>{
            elm.style.animationName = AnimationName;
        },10);
    }
    let setData = ()=>{
        data = pageData[curCnt - 1 ];
        //console.log(data);
        //console.log(curCnt);
        title.innerText = data.title;
        img.setAttribute("src","images/"+data.img);
    }
    var len = pageData.length;
    if(next){
        mainImg.classList.add("from-bottom");
        title.classList.add("to-top");
        if(curCnt + 1 <= len){
            curCnt++;
        }else{
            curCnt = 1;
        }
        setData();
    }else{
        mainImg.classList.add("from-top");
        title.classList.add("to-bottom");
        if(curCnt - 1 <= 0){
            curCnt = len ;
        }else{
            curCnt--;
        }
        setData();
    }
    restartAnimation(mainImg);
    restartAnimation(title);
    eQs("span.cur").innerText= curCnt
}
scrollAction.addEventListener("scroll",()=>{
    event.preventDefault();
    var curScroll = scrollAction.scrollTop;
    if(curScroll > lastScroll){
        //console.log("scrolled down");
        switchContent(true);
    }else{
        //console.log("scrolled up");
        switchContent(false);
    }
    console.log('scrolling')
    lastScroll= curScroll;
})
nxt.onclick = ()=>{
    switchContent(true);
}
pre.onclick = ()=>{
    switchContent(false);
}
function homePage(){
    setTimeout(()=>{
        loader.classList.remove('active');
        main.classList.add('active');
        eQs('body').classList.add('loaded');
    },1000)
}
imgBox.onanimationend = ()=>{
    perBox.classList.add("active");
    console.log("added");
    homePage();
}