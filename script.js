
// ANIMATION MENU BURGER

$('.nav-toggle').click(function()
  {
    $(this).toggleClass('opened');
    $('.menu-burger').slideToggle();
  }
)

$('.close-nav').click(function()
  {
    $('.menu-burger').slideToggle();
    $('.nav-toggle').toggleClass('opened');
  }
)

// ANIMATION SKILLBAR

$('.inview-bar').one('inview', function(event, isInView) 
  {
      $('.progress').toggleClass('visible');  
  }
)


// VERIFICATION CHAMPS DU FORMULAIRE

function surligne(champ, erreur)
{
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}

function verifName(champ)
{
  if(champ.value.length < 2 || champ.value.length > 25 )
  {
    surligne(champ, true);
    return false;
  }
  else
  {
    surligne(champ, false);
    return true;
  }
}

function verifMail(champ)
{
  var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

  if(!regex.test(champ.value))
  {
    surligne(champ, true);
    return false;
  }
  else
  {
    surligne(champ, false);
    return true;
  }
}

function verifNumber (champ)
{
  if(isNaN(champ.value))
  {
    surligne(champ, true);
    return false;
  }
  else
  {
    surligne(champ, false);
    return true;
  }
}

function verifMessage (champ)
{
  if(champ.value.length < 10)
  {
    surligne(champ, true);
    return false;
  }
  else
  {
    surligne(champ, false);
    return true;
  }
}

$('.submit').click(function(e)
{
  e.preventDefault();
  var name = $("#name").val();
  var mail = $("#mail").val();
  var message = $("#message").val();
  var rgpd = $("#rgpd").is(':checked');
  var myRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;

  if (!isNaN(name) || name.length == 0)
  {
    $("#result").html("le nom ne peut etre numerique et est obligatoire");
  }
  else
  {
    if (!myRegex.test(mail))
    {
      $("#result").html("l'adresse email n'est pas valide");
    }
    else
    {
      if (!$("#rgpd").is(':checked'))
      {
        $("#result").html("vous devez valider notre politique de confidentialité des données");
      }
      else
      {
        $.ajax({
          url : 'fonction/envoi.php',
          type : 'POST',
          data : {"user-name" : name, "user-mail" : mail, "user-message" : message, "rgpd" : $("#rgpd").is(':checked') },
          dataType : 'json',
          success : function (donnees, statut)
          {
            $("#result").html(donnees);
          },
          error : function (resultat, statut, erreur)
          {
            $("#result").html("erreur : "+erreur+" status : "+status);
          },
        });
      }
    }
  }
})