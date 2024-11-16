$(function(){
    var saved=localStorage.getItem('HISTORY');
    $('#history').append(saved);
    var $squers=$('.squer')
    var $result=$('.results')
    var $Again=$("#playAgain");
    var AgainstAI=true;
    var PlayerVar=true
    var Xscore=0;
    var Oscore=0;
    var board=[101,101,101,101,101,101,101,101,101]
    for(var i=0;i<9;i++){
        $squers.eq(i).attr('Indx',i)}
    function ReSetGame(){
        PlayerVar=true
        $squers.removeClass('X');
        $squers.removeClass('O');
        $squers.removeAttr('disabled');
        $result.html("(<span class='X'> </span>) turn")
        board=[101,101,101,101,101,101,101,101,101]}
    function AvailableMoves(G){
        var EmptyIndex=[];
        for(var i=0;i<9;i++){
            if (G[i]===101){
                EmptyIndex.push(i)}}
        return(EmptyIndex)}
    function GameEnded(B){
        for(var i=0;i<9;i=i+3){
            if((B[i]===B[i+1])&(B[i+1]===B[i+2])&(B[i+2]!==101)){
                if (B[i]==false){
                    return(1)}else{return(-1)}}}
        for(var i=0;i<9;i++){
            if((B[i]===B[i+3])&(B[i+3]===B[i+6])&(B[i+6]!==101)){
                if (B[i]==false){
                    return(1)}else{return(-1)}}}
        if((B[0]===B[4])&(B[4]===B[8])&(B[8]!==101)){
            if (B[0]==false){
                return(1)}else{return(-1)}}    
        if((B[2]===B[4])&(B[4]===B[6])&(B[6]!==101)){
            if (B[2]==false){
                return(1)}else{return(-1)}} 
        if(AvailableMoves(B).length==0){
            return(0)}
        return 404 }
    function IfEndActions(GG){
        switch(GameEnded(GG)){
            case -1:
                Xscore=Xscore+1
                $('.Xscore').text(Xscore)
                GameFinished('X')
                break
            case 1:
                Oscore=Oscore+1
                $('.Oscore').text(Oscore)
                GameFinished('O')
                break
            case 0:
                $result.html("!TIE!")
                $Again.slideDown()
                break
            default:
                break}}      
    function choserandom(valid_mo){
        var topchoice=[0,2,6,8]
        var availTop=[]
        var seconedchoice=[1,3,5,7]
        var availableseconed=[]
        for(var i=0;i<valid_mo.length;i++){
            for(var x=0;x<topchoice.length;x++){
                if(valid_mo[i]==topchoice[x]){
                    availTop.push(topchoice[x])}}
            for(var x=0;x<seconedchoice.length;x++){
                if(valid_mo[i]==seconedchoice[x]){
                    availableseconed.push(seconedchoice[x])}}}
        var random=Math.floor(Math.random()*10)
        if(availTop.length>0){
            while(random>=availTop.length){
                random=random-availTop.length}
            return(availTop[random])
        }else{
            while(random>=availableseconed.length){
                random=random-availableseconed.length}
            return(availableseconed[random])}}
    function get_AImove(B){
        var best_move;
        var valid_moves=AvailableMoves(B)
        var someOneWon=false
        var importantMove;
        for(var i=0;i<valid_moves.length;i++){
            var best_move=valid_moves[i]
            B[best_move]=false
            var see=GameEnded(B)
            if(see!= 404){
                someOneWon=true
                importantMove=best_move
                break}
            B[best_move]=true
            var see=GameEnded(B)
            if(see!= 404){
                someOneWon=true
                importantMove=best_move
                break}
                B[best_move]=101}
            if(someOneWon==true){
                return(importantMove)}
            if(B[4]==101){
                console.log("O moves to:",4)
                return(4)}
            best_move=choserandom(valid_moves)
            console.log("O moves to:",best_move)
            return best_move}
    function GameFinished(winner){      
        $squers.attr('disabled' , 'true' );
        $result.html("(<span class="+winner+"> </span>) WON!")
        $Again.slideDown()}
    $squers.on('click',function(){
        $(this).attr('disabled' , 'true' );
        $('#vsH') .attr('disabled' , 'true' );
        $('#vsAI') .attr('disabled' , 'true' );
        if (PlayerVar===true){
            $(this).addClass('X')
            $result.html("(<span class='O'> </span>) turn")
        }else{
            $(this).addClass('O')
            $result.html("(<span class='X'> </span>) turn")}
        board[$(this).attr('indx')]=PlayerVar
        IfEndActions(board)
        PlayerVar=!PlayerVar
        if((AgainstAI==true)&&(GameEnded(board)==404)){
            var AImove=get_AImove(board);
            board[AImove]=false;
            var TargetSquer=$squers.eq(AImove);
            TargetSquer.attr('disabled' , 'true' );
            TargetSquer.addClass('O')
            $result.html("(<span class='X'> </span>) turn")
            IfEndActions(board)
            PlayerVar=!PlayerVar}})
    $Again.on('click',function(){
        ReSetGame();
        $('#vsH').removeAttr('disabled');
        $('#vsAI').removeAttr('disabled');
        $(this).slideUp();})
    $('#vsH').on('click',function(){
        $('#vsH').addClass('selected')
        $('#vsAI').removeClass('selected')
        ReSetGame();
        AgainstAI=false;})
    $('#vsAI').on('click',function(){
        $('#vsAI').addClass('selected')
        $('#vsH').removeClass('selected')
        ReSetGame();
        AgainstAI=true;})
    $('#SaveDateH').on('click',function(){
        var Today=new Date()
        var Dateformat= Today.getDate()+"/"+Today.toDateString().substring(4,7)+"/"+Today.getFullYear()+"  "+Today.getHours()+":"+Today.getMinutes()
        $('#history').prepend("<li>"+Dateformat+" X:"+Xscore+" O:"+Oscore+"</li>")})
    window.addEventListener('unload',function(){
        localStorage.setItem('HISTORY',$('#history').html());})})