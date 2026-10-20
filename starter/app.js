let gra;

function start() {
  gra = stan;
  console.log("UCIECZKA Z WYSPY. Epsztojek wraca za 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  if (gra.wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (gra.energia === 0) {
    gra.koniec = true;
    console.log("PRZEGRANA. Zły Pan Cię dopadł. Wpisz start().");
  } else if (gra.energia > 0) {
    gra.energia = gra.energia - 1;
    console.log("Pozostala energia: " + gra.energia);
  }
}

// SEKCJA A — INFORMACJE I MAPA

function nazwaPokoju(numer) {
  switch (numer) {
    case 1:
      return pokoje[0];
    case 2:
      return pokoje[1];
    case 3:
      return pokoje[2];
    case 4:
      return pokoje[3];
    default:
      return pokoje[4];
  }
}

function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), idz("lewo"), akcja("karta"), akcja("kluczyki"), akcja("wyjscie")');
}

function status() {
  console.log(`Aktualny status: 
      Pokój: ${nazwaPokoju(gra.pokoj)}
      pozostała energia: ${gra.energia}
      posiadane przedmioty: ${gra.karta ? 'karta' : ''} ${gra.bezpiecznik ? 'bezpiecznik' : ''}
      Stan zasilania: ${gra.zasilanie ? 'Zasilanie włączone!' : 'Zasilanie wyłączone'};
      Stan gry: ${gra.koniec ? 'Gra zakonczona' : 'Gra w trakcie'}`);
}

function mapa() {
  for (let i = 1; i <= 4; i++) {
    console.log(`${nazwaPokoju(i)} ${i == gra.pokoj ? "-> Aktualny pokoj" : ""}`);
  }
}

function rozejrzyj() {
  switch (gra.pokoj) {
    case 1:
      console.log("W tym pokoju nie ma przedmiotów");
      break;
    case 2:
      console.log(`${!gra.karta ? "Karta leży na biurku" : "Karta została już zebrana"}`);
      break;
    case 3:
      console.log(`${!gra.kluczyki ? "Kluczyki leżą na półce" : "Kluczyki zostały już zabrane"}`);
      break;
    case 4:
      if (!gra.karta)
        console.log("Do wejścia na plażę potrzebujesz karty");
      else if (!gra.kluczyki)
        console.log("Aby uciec, potrzebujesz kluczyków");
      else
        console.log("Możesz uciec z wyspy!");
      break;
    default:
      console.log("Nieznane pomieszczenie");
  }
}

// SEKCJA B — RUCH

function idz(kierunek) {
  let nastepnyPokoj = gra.pokoj;

  if (gra.energia == 0) {
    gra.koniec = true;
  }

  if (gra.koniec) {
    console.log("Nie możesz wykonać ruchu po końcu gry.");
    return;
  }

  switch (kierunek) {
    case "prawo": {
      if (nastepnyPokoj < 4) {
        if (nastepnyPokoj === 3 && !gra.karta) {
          console.log("Potrzebujesz karty, aby wejść do pokoju 4.");
          return;
        }

        nastepnyPokoj = nastepnyPokoj + 1;
        zakonczTure();
      } else {
        console.log("Napotkales sciane.");
      }
      break;
    }

    case "lewo": {
      if (nastepnyPokoj > 1) {
        nastepnyPokoj = nastepnyPokoj - 1;
        zakonczTure();
      } else {
        console.log("Napotkales sciane");
      }
      break;
    }

    default: {
      console.log("Nieznany kierunek! Sprobuj jeszcze raz.");
      return;
    }
  }

  gra.pokoj = nastepnyPokoj;
  rozejrzyj();
}

// SEKCJA C — PRZEDMIOTY I WYGRANA

function akcja(co) {
  if (gra.koniec) {
    console.log("Gra została zakończona, brak możliwości wykonania akcji");
    return;
  }

  switch (co) {
    case "karta":
      if (!gra.karta && gra.pokoj == 2) {
        console.log("Podniesiono karte!");
        zakonczTure();
        if (!gra.koniec) gra.karta = true;
      } else if (gra.karta && gra.pokoj == 2) {
        console.log("Podniesiono juz karte");
      } else if (gra.pokoj != 2) {
        console.log("Akcja wykonana w niewlasciwym pokokju");
      }
      break;

    case "kluczyki":
      if (!gra.kluczyki && gra.pokoj == 3) {
        console.log("Podniesiono kluczyki!");
        zakonczTure();
        if (!gra.koniec) gra.kluczyki = true;
      } else if (gra.kluczyki && gra.pokoj == 3) {
        console.log("Podniesiono juz kluczyki");
      } else if (gra.pokoj != 3) {
        console.log("Akcja wykonana w niewlasciwym pokokju");
      }
      break;

    case "wyjscie":
      if (gra.kluczyki && gra.pokoj == 4) {
        gra.wygrana = true;
        gra.koniec = true;
        zakonczTure();
      } else if (gra.pokoj != 4) {
        console.log("Akcja wykonana w niewlasciwym pokokju");
      } else {
        console.log("Do ucieczki potrzebujesz kluczyków");
      }
      break;

    default:
      console.log("Nieznany przedmiot");
      break;
  }
}

function eksport() {
  const jsonString = JSON.stringify(gra, null, 2);
  return jsonString;
}

start();