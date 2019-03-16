var imgUrl = '../image/rabbit-big.png';
var position = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var ele = document.querySelector('#rabbit');
var endBtn = document.querySelector('#end');
var startBtn = document.querySelector('#start');
var time = '';
animation(ele,position,imgUrl);

/**
 *
 * @param ele
 * @param positions
 * @param imgUrl
 */
function animation(ele,positions,imgUrl){
    ele.style.backgroundImage = 'url('+imgUrl+')';
    ele.style.backgroundRepeat = 'no-repeat';
    var index = 0;
    function run(){
        //console.log(index);
        var position = positions[index].split(' ');
        console.log(ele)
        //console.log(position)
        ele.style.backgroundPositionX = position[0] + 'px';
        ele.style.backgroundPositionY = position[1] + 'px';
        //ele.style.backgroundPosition = position[0] + 'px' + position[1] + 'px';
        /*
        ele.backgroundPositionX = position[0] + 'px';
        ele.backgroundPositionY =  + position[1] + 'px';*/
        index++;
        if(index>=positions.length){
            index = 0;
        }
        time = setTimeout(run,80);
    }
    run();
}
endBtn.addEventListener('click',function(){
    clearTimeout(time);
},false);
startBtn.addEventListener('click',function(){
    animation(ele,position,imgUrl);
},false);
