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
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), akcja("karta")');
  // TODO A5: dopisz pozostale kierunki i akcje oraz zasade kosztu.
}
function status() {
  // TODO A3: wypisz pokoj, energie, przedmioty, zasilanie i stan gry.
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
      console.log(`${!zasilanie ? "Do wyjścia potrzebne jest przywrócenie zasilania oraz posiadanie karty" : 
        "Zebrano wszystkie wymagane przedmioty"}`)
      break
    default:
      console.log("Nieznane pomieszczenie")
  }
}

// SEKCJA B — RUCH
function idz(kierunek) {
  let nastepnyPokoj = pokoj;
  // TODO B1: zablokuj ruch po koncu gry. 
  if(koniec){
    console.log("Nie możesz wykonać ruchu po końcu gry.");
    return;
  }
  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
  switch(kierunek) {
    case "prawo": {
      // dodaj 1
      break;
    }
    case "lewo": {
      // odejmij 1
      break;
    }
    case default:{
      console.log("Nieznany kierunek! Sprobuj jeszcze raz.");
      return;
    }
  }
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.
  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  console.log("Ruch do uzupelnienia");
}

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  // TODO C1: zablokuj akcje po koncu gry.
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  // TODO C2: przed zmiana sprawdz pokoj i wymagany stan.
  // TODO C3: przy odrzuceniu return; przy sukcesie break.
  // TODO C3: po switch jedno zakonczTure().
  // TODO C4: wygrana i koniec ustawione przed rozliczeniem tury!
  console.log("Akcje do uzupelnienia");
}

start();
