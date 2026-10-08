// WSPOLNY KONTRAKT: nazwy zmiennych i funkcji uzgadnia caly zespol.
const MAKS_ENERGIA = 10;
let pokoj = 1;
let energia = MAKS_ENERGIA;
let karta = false;
let bezpiecznik = false;
let zasilanie = false;
let koniec = false;
let wygrana = false;

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
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
  console.log(`Aktualny status: Pokój: ${nazwaPokoju(pokoj)}; pozostała energia: ${energia}; posiadane przedmioty: ${ karta ? 'karta' : '' }
  ${ bezpiecznik ? 'bezpiecznik' : '' }; Stan zasilania: ${zasilanie ? 'Zasilanie włączone!' : 'Zasilanie wyłączone'};
  Stan gry: ${ koniec ? 'Gra zakonczona' : 'Gra w trakcie' }`);
}   
function mapa() {
  for(let i = 1; i <= 4; i++) {
    console.log(`${nazwaPokoju(i)} ${i == pokoj ? "-> Aktualny pokoj" : ""}`)
  }
}
function rozejrzyj() {
  switch(pokoj) {
    case 1:
      console.log(`${!karta ? "Karta lezy na biurku" : "Wszystko w tym pokoju zostało zebrane"}`)
      break
    case 2:
      console.log(`${!bezpiecznik && !zasilanie ? "Bezpiecznik leży na półce" : "Wszystko w tym pokoju zostało zabrane"}`)
      break
    case 3:
      console.log(`${!zasilanie ? "Zasilanie nie zostało przywrócone" : "Zasilanie zostało przywrócone"}`)
      break
    case 4:
      if(!karta)
        console.log("Do wyjscia potrzebne jest jeszcze zebranie karty")
      if(!zasilanie)
        console.log("DO wyjscia potrzebne jest jeszcze przywrocenie zasilania")
      break
    default:
      console.log("Nieznane pomieszczenie")
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
  let nastepnyPokoj = pokoj; 
  if(energia == 0 ) {koniec = true};
  if(koniec){
    
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
  
  pokoj = nastepnyPokoj;
  rozejrzyj();

}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  if(koniec) {
    console.log("Gra została zakończona, brak możliwości wykonania akcji")
    return
  }
  switch(co) {
    case "karta":
      if(!karta && pokoj == 1) {
        console.log("Podniesiono karte!")
        zakonczTure()
        karta = true
      }
      else if(karta && pokoj == 1)
        console.log("Podniesiono juz karte")
      else if(pokoj != 1)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "bezpiecznik":
      if(!bezpiecznik && !zasilanie && pokoj == 2) {
        console.log("Podniesiono bezpiecznik!")
        zakonczTure()
        bezpiecznik = true
      }
      else if(bezpiecznik && pokoj == 2)
        console.log("Podniesiono juz bezpiecznik")
      else if(!bezpiecznik && zasilanie)
        console.log("Zabrano juz bezpiecznik i przywrocono zasilanie")
      else if(pokoj != 2)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "napraw":
      if(bezpiecznik && !zasilanie && pokoj == 3) {
        console.log("Właczono zasilanie!")
        zakonczTure()
        zasilanie = true
        bezpiecznik = false
      }
      else if(!bezpiecznik && !zasilanie && pokoj == 3)
        console.log("Nie mozesz teraz przywrocic zasilania. Wymagany jest bezpiecznik")
      else if(!bezpiecznik && zasilanie && pokoj == 3)
        console.log("Wlaczono juz zasilanie")
      else if(pokoj != 3)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    case "wyjscie":
      if(zasilanie && karta && pokoj == 4) {
        console.log("gg, gj")
        zakonczTure()
        wygrana = true
        koniec = true
      }
      else if(pokoj != 4)
        console.log("Akcja wykonana w niewlasciwym pokokju")
      break
    default: 
      console.log("Nieznany przedmiot")
      break
  }
}

start();
