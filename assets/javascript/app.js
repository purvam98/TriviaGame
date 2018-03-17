var triviaquestions = [{
    question:"What is the capital of India?",
    answerList: ["Delhi","Kolkata","New Delhi","Gujarat"],
    answer:2
},
{
    question:"What kind of sari comes from Madhya Pradesh?",
    answerList: ["Batik","Chanderi","Sambalpuri","Dhakai"],
    answer:1
},
{
    question:"What is the capital of Madhya Pradesh?",
    answerList: ["Lucknow","Bhutan","Bhopal","Banglore"],
    answer:2
},
{
    question:"What is India's largest state?",
    answerList: ["Maharahtra","Uttar Pradesh","Rajasthan","kerala"],
    answer:2
},
{
    question:"What is the national fruit of India?",
    answerList: ["Mango","Banana","Apple","Pineapple"],
    answer:0
},
{
    question:"What is the capital of Goa?",
    answerList: ["Panaji","Panjali","Delhi","Margao"],
    answer:0
},
{
    question:"What is the capital of Rajasthan?",
    answerList: ["Ranjipur","Porbandar","Jaipur","Delhi"],
    answer:2
},
{
    question:"Who is considered as God of cricket in India?",
    answerList:["Kapil Dev","Sunil Gavaskar","Rahul Dravid","Sachin Tendulkar"],
    answer:3
},
{
    question:"Which James Bond film was made predominantly in and around the city Udaphur?",
    answerList:["Goldfinger","Thunderball","Octopussy","Moonraker"],
    answer:2
},
{
    question:"What is the Capital of India?",
    answerList:["Hindu","Islam","Christianity","Sikhism"],
    answer:0
}
];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that is absolutely right!",
	incorrect: "No, that is wrong!.",
	endTime: "Out of time!",
	finished: "Finally! Let's see how well you did."
}
$("#startbutton").click(function()
{
$(this).hide();
newGame();
});
$("#restartbutton").click(function()
{
$(this).hide();
newGame();
});
//to reset all the values
function newGame()
{
$("#finalmessage").empty();
$("#correct").empty();
$("#incorrect").empty();
$("#unanswered").empty();
currentQuestion=0;
correctAnswer=0;
incorrectAnswer=0;
unanswered=0;

newQuestion();
}
function newQuestion()
{
    
    $("#message").empty();
    $("#correctanswer").empty();
    $('#gif').empty();
    answered=true;
    //For new questions & answerlist
    $("#currentquestion").html("Current Question is "+(currentQuestion+1)+" out of 10");
    $("#question").html(triviaquestions[currentQuestion].question);
    for(var i=0;i<4;i++)
    {
        var choice=$("<div>");
        
        choice.text(triviaquestions[currentQuestion].answerList[i]);
        choice.attr({'data-index': i });
        choice.addClass("thisselect");
        $("#answerlist").append(choice);
    }
    //for timer
    countdown();
    //to hold the time and load the answerGame
    $(".thisselect").click(function()
{
userSelect=$(this).data("index");
clearInterval(time);
answerGame();
});
}
//showing the timer
function countdown()
{   
    answered=true;
    seconds=30;
    $("#timeleft").html("Time Remaining "+seconds);
    time=setInterval(startcountdown,1000);
}
//setting up timer to go down
function startcountdown()
{
    seconds=seconds-1;
    $("#timeleft").html("Time Remaining "+seconds);
    if(seconds<1)
    {
        clearInterval(time);    
        answered=false;
        answerGame();
        
    }
}
//to check answer that is selected is right or wrong and showing the message and gif according to that
function answerGame()
{
    $("#currentquestion").empty();
    $('.thisselect').empty(); //Clears question page
    $('#question').empty();
   
    var correctanswertext=triviaquestions[currentQuestion].answerList[triviaquestions[currentQuestion].answer];
    var correctanswerindex=triviaquestions[currentQuestion].answer;
    if(userSelect==correctanswerindex && answered==true)
    {
        correctAnswer++;
        $("#message").html(messages.correct);
        $('#gif').html('<img src = "assets/images/correct.gif" width = "400px">');
    }
    else if(userSelect != correctanswerindex && answered==true)
    {
        incorrectAnswer++;
        $("#message").html(messages.incorrect);
        $("#correctanswer").html('The correct answer was '+correctanswertext);
        $('#gif').html('<img src = "assets/images/incorrect.gif" width = "200px">');
    }
    else
    {
        unanswered++;
        $("#message").html(messages.endTime);
        $("#correctanswer").html('The correct answer was '+correctanswertext);
    }
    //checking the question value if it is last then it will load the scoreboard otherwise it will increase the value of question and call the newQuestion function
    if(currentQuestion==(triviaquestions.length-1))
    {
        setTimeout(scoreboard,5000);
    }
    else
    {
        
        currentQuestion++;
        
        setTimeout(newQuestion,5000);
    }
}
//showing the final scoreboard
function scoreboard(){
	$('#timeleft').empty();
	$('#message').empty();
	$('#correctanswer').empty();
	$('#gif').empty();

	$('#finalmessage').html(messages.finished);
	$('#correct').html("Correct Answers: " + correctAnswer);
	$('#incorrect').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#restartbutton').addClass("reset");
    $('#restartbutton').show();
    //for starting the game once again
	$('#restartbutton').html("Start Again?");
}