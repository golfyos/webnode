    var num = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
    var numClick = 0;
    var gotRand = [];
    var json, positionTrue, idTrue;
    var size = 0;
    var numOfHint = 2;
    var hide1=1, hide2=1,hide3;

    $(document).ready(function () {
        $("#temp").hide();
        $("#win").hide();
        $.ajax({
            type: "POST",
            async: false,
            url: '/playing',
            success: function(obj) {
                json = obj;
            },
            error: function(err) {
                console.log(err);
            }
        });
        newgame();
        $(".ans").click(function (event) {
            var id = event.target.id;
            if (id == idTrue) {
                alert("CORRECT !~~~ go next");
                getMoney();
                getQuestion();
                reColorAnswer();
                numClick = 0;
            }
            else {
                alert("WRONG !!! You lose");
                for (var i = 0; i < size; i++)
                    $("#" + num[i]).css("background-color", "red");
                //$('.ans').prop('disabled', true);
                $("#temp").show();
                $("#hint").prop('disabled', true);
                $("#quiz").hide();

            }
        }),
        $("#reset").click(function () {
            reset();
            newgame();
            numOfHint =2;
        }),
        $("#hint").click(function () {
            numClick++;
            hideChoices();
        })
    });
    

    function newgame() {
            var rand;
            var check = true;
            for (var i = 0; i < 8; i++) {
                rand = Math.floor(Math.random() * json["numberOfQuestion"]);
                check = true;
                for (var j = 0; j < gotRand.length; j++) {
                    if (rand == gotRand[j]) {
                        i--;
                        check = false;
                        break;
                    }
                }
                if (check)
                    gotRand.push(rand);
            }
            $("#amountHint").text("2");
            getQuestion();
    }

    
    function getQuestion() {
        if (size == 8) {
            $("#win").show();
            $("#quiz").hide();
            return;
        }
        var current = gotRand[size];
        var data = json["groupQuestion"][current];
        $("#qq").text(data["question"]);
        positionTrue = Math.floor(Math.random() * 4) + 1;
        idTrue = "ans" + positionTrue;
        var trueAns = data["ans4"];
        $("#ans" + positionTrue).html(trueAns);
        var j = 1;
        for (var i = 1; i <= 4; i++) {
            if (i != positionTrue) {
                $("#ans" + i).html(data["ans" + j]);
                j++;
            }
        }
        $("#" + num[size]).css("background-color", "yellow");
        size++;
    }

    function getMoney() {
        $("#" + num[size - 1]).css("background-color", "#28FF28");
    }

    function reset() {
        for (var i = 1; i <= 8; i++)
            $("#" + num[i]).css("background-color", "#ccccff");
        gotRand = [];
        size = 0;
        $("#temp").hide();
        $("#win").hide();
        $("#quiz").show();
        $("#hint").prop('disabled', false);
        reColorAnswer();
        numOfHint = 2;
        numClick = 0;
    }

    
    function hideChoices() {
        if (numOfHint > 0 && numClick==1) {
            numOfHint--;
            $("#amountHint").text(numOfHint);
            //hide1 = 1, hide2 = 1;
            while (true) {
                if (hide1 == positionTrue) {
                    hide1 = Math.floor((Math.random() * 4) + 1);
                }
                if (hide2 == positionTrue || hide2 == hide1) {
                    hide2 = Math.floor((Math.random() * 4) + 1);
                }
                else{
                    break;
                }
            }
            //$("#ans" + hide1).css("background-color", "red");
            //$("#ans" + hide2).css("background-color", "red");
            $("#ans"+hide1).hide();
            $("#ans"+hide2).hide();
        } 
        else if(numOfHint > 0 && numClick == 2){
            numOfHint--;
            $("#amountHint").text(numOfHint);
            for(var i=1;i<=4;i++){
                if(i!= hide1 && i!=hide2 && i!=positionTrue){
                    hide3 = i;
                    break;
                }    
            }
            $("#ans"+hide3).hide();
        }
        else
            alert("You already use all Hints");
    }


    function reColorAnswer() {
        for (var i = 1; i <= 4; i++)
            //$("#ans" + i).css("background-color", "#ccccff");
            $("#ans"+i).show();
    }