// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA = 10;
let gra {
    pokoj: 1,
    energia: MAKS_ENERGIA,
    karta: false,
    bezpiecznik: false,
    zasilanie: false,
    koniec: false,
    wygrana: false
};

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  gra.pokoj = 1;
  gra.energia = MAKS_ENERGIA;
  gra.karta = false;
  gra.bezpiecznik = false;
  gra.zasilanie = false;
  gra.koniec = false;
  gra.wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  if (gra.wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (gra.energia === 0) {
    gra.koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
  else if (gra.energia > 0) {
    gra.energia = gra.energia - 1;
    console.log("Pozostala energia: " + gra.energia);
  }

}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {
  switch(numer) {
    case 1:
      return "Recepcja"
    case 2:
      return "Magazyn"
    case 3:
      return "Serwerownia"
    case 4:
      return "Wyjście"
    default:
      return "Nieznane pomieszczenie" 
  }
}
function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), idz("lewo"), akcja("karta"), akcja("bezpiecznik"), akcja("napraw"), akcja("wyjscie")');
  // TODO A5: dopisz pozostale kierunki i akcje oraz zasade kosztu.
}
function status() {
  console.log(`Aktualny status: Pokój: ${nazwaPokoju(gra.pokoj)}; pozostała energia: ${gra.energia}; posiadane przedmioty: ${ gra.karta ? 'karta' : '' }
  ${ gra.bezpiecznik ? 'bezpiecznik' : '' }; Stan zasilania: ${gra.zasilanie ? 'Zasilanie włączone!' : 'Zasilanie wyłączone'};
  Stan gry: ${ gra.koniec ? 'Gra zakonczona' : 'Gra w trakcie' }`);
}   
function mapa() {
  for(let i = 1; i <= 4; i++) {
    console.log(`${nazwaPokoju(i)} ${i == gra.pokoj ? "-> Aktualny pokoj" : ""}`)
  }
}
function rozejrzyj() {
  switch(pokoj) {
    case 1:
      console.log(`${!gra.karta ? "Karta lezy na biurku" : "Wszystko w tym pokoju zostało zebrane"}`)
      break
    case 2:
      console.log(`${!gra.bezpiecznik && !gra.zasilanie ? "Bezpiecznik leży na półce" : "Wszystko w tym pokoju zostało zabrane"}`)
      break
    case 3:
      console.log(`${!gra.zasilanie ? "Zasilanie nie zostało przywrócone" : "Zasilanie zostało przywrócone"}`)
      break
    case 4:
      if(!gra.karta)
        console.log("Do wyjscia potrzebne jest jeszcze zebranie karty")
      else if(!gra.zasilanie)
        console.log("DO wyjscia potrzebne jest jeszcze przywrocenie zasilania")
      else
        console.log("Spelniasz wymagania aby opuscic szkole")
      break
    default:
      console.log("Nieznane pomieszczenie")
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
  let nastepnyPokoj = gra.pokoj; 
  if(gra.energia == 0 ) {gra.koniec = true};
  if(gra.koniec){
    console.log("Nie możesz wykonać ruchu po końcu gry.");
    return;
  }
  switch(kierunek) {
    case "prawo": {
      
      if(nastepnyPokoj < 4) {
      nastepnyPokoj = nastepnyPokoj + 1;
        zakonczTure();
    } else {
      console.log("Napotkales sciane.");
    }
      break;
    }
    case "lewo": {  
      if(nastepnyPokoj > 1){
        nastepnyPokoj = nastepnyPokoj - 1;
        zakonczTure();
      }
      else {
        console.log("Napotkales sciane");
      }
      break;
    }
    default:{
      console.log("Nieznany kierunek! Sprobuj jeszcze raz.");
      return;
    }
  }
  
  gra.pokoj = nastepnyPokoj;
  rozejrzyj();

}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  if(gra.koniec) {
    console.log("Gra została zakończona, brak możliwości wykonania akcji")
    return
  }
  switch(co) {
    case "karta":
      if(!gra.karta && gra.pokoj == 1) {
        console.log("Podniesiono karte!")
        zakonczTure()
        gra.karta = true
      }
      else if(gra.karta && gra.pokoj == 1)
        console.log("Podniesiono juz karte")
      else if(gra.pokoj != 1)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "bezpiecznik":
      if(!gra.bezpiecznik && !gra.zasilanie && gra.pokoj == 2) {
        console.log("Podniesiono bezpiecznik!")
        zakonczTure()
        gra.bezpiecznik = true
      }
      else if(gra.bezpiecznik && gra.pokoj == 2)
        console.log("Podniesiono juz bezpiecznik")
      else if(!gra.bezpiecznik && gra.zasilanie)
        console.log("Zabrano juz bezpiecznik i przywrocono zasilanie")
      else if(gra.pokoj != 2)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "napraw":
      if(gra.bezpiecznik && !gra.zasilanie && gra.pokoj == 3) {
        console.log("Właczono zasilanie!")
        zakonczTure()
        gra.zasilanie = true
        gra.bezpiecznik = false
      }
      else if(!gra.bezpiecznik && !gra.zasilanie && gra.pokoj == 3)
        console.log("Nie mozesz teraz przywrocic zasilania. Wymagany jest bezpiecznik")
      else if(!gra.bezpiecznik && gra.zasilanie && gra.pokoj == 3)
        console.log("Wlaczono juz zasilanie")
      else if(gra.pokoj != 3)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "wyjscie":
      if(gra.zasilanie && gra.karta && gra.pokoj == 4) {
        gra.wygrana = true
        gra.koniec = true
        zakonczTure()
      }
      else if(gra.pokoj != 4)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    default: 
      console.log("Nieznany przedmiot")
      break
  }
}

start();
