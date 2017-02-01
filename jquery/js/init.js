$(document).ready(function(){

  // Use : prepare path to icon to use later
  // Utilisation : use it with icon.life
  icon = {
    life: "src/icons/vie.png",
    mana: "src/icons/magie.png",
    magique: "src/icons/magique.png",
    physique: "src/icons/physique.png"
  };

  // Use : display heroes inside #hero div
  // Return : HTML representation of each heroe
  $.each(heroList, function(index, value) {
    $('#hero').append("<div data-id='" + index + "' class='hero-container col-md-3'>" +
     "<p class='name'>" + value.nom + "</p>" +
     "<img src='" + value.img + "'>" +
     "<p class='pv'><img src='" + icon.life + "'><span>" + value.pv + "</span></p>" +
     "<p class='pm'><img src='" + icon.mana + "'><span>" + value.pm + "</span></p>" +
     "<img data-type='magic' class='attaque' src='" + icon.magique + "'>" +
    "<img data-type='physic' class='attaque' src='" + icon.physique + "'>" +
     "</div>");
  });

  // Use : display Monsters inside #environment div
  // Return : HTML representation of each monster
  $.each(level1Monster, function(index, value) {
    $('#environment').append("<div data-id='" + index + "' class='monster-container col-md-3'>" +
     "<p class='name'>" + value.nom + "</p>" +
     "<img src='" + value.img + "'>" +
     "<p class='pv'><img src='" + icon.life + "'><span>" + value.pv + "</span></p>" +
     "<p class='pm'><img src='" + icon.mana + "'><span>" + value.pm + "</span></p>" +
     "</div>");
  });

  // Insert background image
  // TODO : Make dynamic to display levels
  $('#environment').css("background-image", "url('" + "src/decors/level4.jpg" + "')");
  $('#environment').css("background-size", "cover");
  $('#environment').css("background-position", "bottom");
});
