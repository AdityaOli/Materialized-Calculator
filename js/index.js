var operator = "";
var netStack = "";
var numString = "1234567890.";
var operatorString = "+-*/=";
var message = "";
$(function()
{
  Calculator.Reset();
}
);
class Calculator
{
  static Equals() 
  {
    
  }
  static Reset()
  {
    $(".answerDiv").html("0");
    $(".stackDiv").html("0");
    operator = "";
    netStack = "";
  }
}

function displayNumberOnScreen(element)
{
  if(element.id === "AC")
  {
    Calculator.Reset();
  }
  else if(element.id === "CE")
  {
     var temp = $(".stackDiv").text().split("");
     temp.pop();
     netStack = temp.join("");
     $(".stackDiv").html(netStack);
    $(".answerDiv").html("");
  }
  else if(netStack.length === 0)
  {
    if(operatorString.indexOf(element.id)!==-1 && (element.id==="+" || element.id==="-"))
    {
        $(".answerDiv").html(element.id);
        $(".stackDiv").html(element.id);
        netStack=element.id;
    }
    else if(numString.indexOf(element.id)!==-1)
    {
        $(".answerDiv").html(element.id);
        $(".stackDiv").html(element.id);
        netStack+=element.id;
    }
  }
  else
  {
    if((netStack=="+" && element.id=="-") || (netStack=="-" && element.id=="+"))
    {
        netStack=element.id;
        $(".answerDiv").html(element.id);
        $(".stackDiv").html(element.id);
    }
    else if(element.id === "=")
    {
        try{
          var evaluation = eval(netStack);
          if(evaluation != undefined)
          {
            $(".answerDiv").html(evaluation);
            $(".stackDiv").html(netStack+"="+evaluation);
            netStack = evaluation;
            equalsPressed = true;
          }
        }
        catch(error)
        {
          var dialog = document.querySelector('#dialog');
          message = "<p> You tried an invalid operation! Please try again!. </p>"
          $(".mdl-dialog__content").html(message);
          if (! dialog.showModal) 
          {
            dialogPolyfill.registerDialog(dialog);
          }
          dialog.showModal();    
          dialog.querySelector('button:not([disabled])')
                .addEventListener('click', function() 
          {
              dialog.close();
          });
          Calculator.Reset();
        }
    }
    
    else if((operatorString.indexOf(netStack[netStack.length-1]) !==-1 && operatorString.indexOf(element.id) !==-1) || (netStack[netStack.length-1]==="." && element.id==="."))
      {
        var temp = netStack.split("");
        temp.pop();
        temp.push(element.id);
        netStack = temp.join("");
        netStack[netStack.length-1] = element.id;
         $(".answerDiv").html(element.id);
         $(".stackDiv").html(netStack);
      }
    
    else
    {
      if(numString.indexOf(netStack[netStack.length-1]) !== -1 && operatorString.indexOf(element.id)===-1)
      {
         netStack+=element.id;
         $(".answerDiv").html($(".answerDiv").text()+element.id);
         $(".stackDiv").html(netStack);
      }
      else
      {
          netStack+=element.id;
          $(".answerDiv").html(element.id);
          $(".stackDiv").html(netStack);
      }
    }
  }
  
  if($(".answerDiv").text() === "Infinity")
  {
    $(".answerDiv").css("color","red");
  }
  else
    $(".answerDiv").css("color","black");
  
  if($(".answerDiv").text().length>=9 || $("stackDiv").text().length>=15)
  {
          var dialog = document.querySelector('#dialog');
          message = "<p> This is toooooo big for me to handle. Please try again with smaller inputs!. </p>"
          $(".mdl-dialog__content").html(message);
          if (! dialog.showModal) 
          {
            dialogPolyfill.registerDialog(dialog);
          }
          dialog.showModal();    
          dialog.querySelector('button:not([disabled])')
                .addEventListener('click', function() 
          {
              dialog.close();
          });
          Calculator.Reset();
  }
}