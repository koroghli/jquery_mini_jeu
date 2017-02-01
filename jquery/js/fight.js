$(document).ready(function(){
  victory = false;
  defeat = false;
  monstersCount = level1Monster.length;//le nombre des monster ds l array
  herosCount = heroList.length;//le nombre des heros ds l array
//metre un selecteur
$('body').on('click', '.attaque', function() {
  var type=$(this).data('type');
  var parentId = $(this).parent().data('id');

  if($(this).data('type') == "magic") {
    if (heroList[parentId].pm - 5 < 0) {
     alert("vous navez plus assez du mana");
    return false;
    }
  } else {

  }
if (  $(this).hasClass("select")) {


}else {
  $(this).siblings(' .attaque').removeClass("select");
    $(this).addClass("select");
}
var type=$(this).data('type');
var parentId = $(this).parent().data('id');
heroList[parentId].action=type;

});



  /*  Use : Check if hero and monster are alive, to display end of game, and attack randomly opponent team
      TODO : Get rid of it
  */
  $('#fight').on('click', function() {
  var result = checkAttaque();
  if (result == true) {
    heroTurn();
    monsterTurn();
    $('img.attaque').removeClass('select');
    $.each(heroList,function(index, value) {
      if (value.action == "magic") {
        value.pm = value.pm - randRange(5,7) ;
        $("#hero div[data-id='" + index + "' ]").find(' .pm span').html(value.pm);
      }
      value.action=undefined;
    });
  }else {
    alert("choisissez une action par hero ! ");
   }
  });
function checkAttaque() {
  var check = true;
  $.each(heroList, function(index, value) {
    if (value.status == "dead") {
    }else {
      if(value.action == undefined) {
        check=false;
         return false;
      }
    }

  })
  if(check == true) {
    return true;
  }else {
    return false;
  }
};


  function heroTurn() {
    $.each(heroList, function(index, value) {
      // If hero is dead, he doesn't attack
      if(value.status == "alive") {
        if (value.action == "magic") {
          dealDamage(randRange(5, 20), 'm');
        } else if(value.action == "physic") {
            dealDamage(randRange(1, 15), 'm');
        }
      } else {
        console.log("hero mort");
      }
    });
  };
  function monsterTurn() {
    $.each(level1Monster, function(index, value) {
      // If hero is dead, he doesn't attack
      if(value.status == "alive") {
        dealDamage(randRange(1, 15), 'h');
      } else {
        console.log("monstre mort");
      }
    });
  };
  function checkVictory() {};
  function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function endGame(result) {
    if(result == 1) {
      alert("victoire");
      console.log(level1Monster);
    } else {
      alert("defaite");
      console.log(heroList);

    }
  }
  function dealDamage(damage, target) {
    var touched = false;
    if(target == "h") {
      while (touched == false) {
        heroId = randRange(0, (herosCount - 1));
        if(heroList[heroId].status != "dead") {
          heroList[heroId].pv = heroList[heroId].pv - damage;
          $("#hero div[data-id='" + heroId + "']").find('.pv span').html(heroList[heroId].pv);
          if(heroList[heroId].pv <= 0) {
            heroList[heroId].status = "dead";
            $("#hero div[data-id='" + heroId + "']").find('.name').html(heroList[heroId].status);
          }
          touched = true;
        } else {
          var allDead = 0;
          $.each(heroList, function(index, value) {
            if(value.status != "dead") {
              allDead = 1;
              return false;
            }
          });
          if(allDead == 0) {
            endGame(0);
            return false;
          }
        };
      }
    } else if(target == "m") {
      while (touched == false) {
        monsterId = randRange(0, (monstersCount - 1));
        if(level1Monster[monsterId].status != "dead") {
          level1Monster[monsterId].pv = level1Monster[monsterId].pv - damage;
          $("#environment div[data-id='" + monsterId + "']").find('.pv span').html(level1Monster[monsterId].pv);
          if(level1Monster[monsterId].pv <= 0) {
            level1Monster[monsterId].status = "dead";
            $("#environment div[data-id='" + monsterId + "']").find('.name').html(level1Monster[monsterId].status);
          }
          touched = true;
        } else {
          var allDead = 0;
          $.each(level1Monster, function(index, value) {
            if(value.status != "dead") {
              allDead = 1;
              return false;
            }
          });
          if(allDead == 0) {
            endGame(1);
            return false;
          }
        };
      }
    }
  };
});
