let gra;

function start() {
  gra = { ...stan };
  console.log("UCIECZKA Z WYSPY. Epsztojek wraca za 13 tur.");
  pomoc();
}

function zakonczTure() {
  gra.energia--
  if(gra.lostFight) {
    gra.koniec = true
    console.log("Zrestartuj gre przy użyciu start() aby spróbować jeszcze raz...")
    return
  }
  if (gra.wygrana) {
    console.log("WYGRANA! Odpłynąłeś motorówką z wyspy Jot.E. Mozesz wrocic do domu.");
    return
  } else if (gra.energia === 0) {
    gra.koniec = true;
    console.log("PRZEGRANA. Nie uciekłeś na czas z wyspy. Wpisz start().");
    return
  } else if (gra.energia > 0 && !gra.lostFight) {
    console.log("Pozostala energia: " + gra.energia);
    return
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
  console.log("Dostępne komendy: ")
  console.log('1. start() -> rozpoczyna na nowo rozgrywke')
  console.log('2. pomoc() -> wyświetla na nowo dostępne komendy i ważne zasady')
  console.log('3. status() -> wyświetla status rozgrywki')
  console.log('4. mapa() -> Wyświetla spis pokoi oraz pokój, w którym obecnie jesteś')
  console.log('5. rozejrzyj() -> Wyświetla informacje o pokoju, w którym obecnie jesteś')
  console.log('6. idz("prawo"), idz("lewo") -> Wykonuje akcje ruchu i kończy ture')
  console.log('7. akcja("karta"), akcja("sekret"), akcja("kluczyki"), akcja("ucieczka") -> Wykonuje interakcje')
  console.log(`W tej wersji gry zle wykonany ruch rowniez zuzywa energie`);
  console.log(`[] -> pozostała energia, {} -> zużyta energia`);
}

function stanEnergii() {
  let en = '[]'.repeat(gra.energia)
  let depleted = '{}'.repeat(13 - gra.energia)
  console.log(`Pozostała energia: ${en}${depleted}`)
}

function status() {
  console.log(`Aktualny status: 
      Pokój: ${nazwaPokoju(gra.pokoj)}
      pozostała energia: ${gra.energia}
      posiadane przedmioty: ${gra.karta ? 'karta' : ''} ${gra.bezpiecznik ? 'bezpiecznik' : ''}
      Stan gry: ${gra.koniec ? 'Gra zakonczona' : 'Gra w trakcie'}
      ${gra.bron ? 'Posiadasz bron' : ''}`);
}

function mapa() {
  for (let i = 1; i <= 5; i++) {
    console.log(`${nazwaPokoju(i)} ${i == gra.pokoj ? "-> Aktualny pokoj" : ""}`);
  }
  console.log("Naprzemiennie poruszaj sie lewo i prawo zaleznie od parzystosci pokoju. Ruch w zla strone cofa cie o jeden pokoj")
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
      if(!gra.karta) {
        console.log("Potrzebna jest ci karta, aby dostać się do poziomu: Ściany budynku")
        gra.pokoj -= 1
      }
      else {
        if(!gra.didFightOccur) {
            console.log("Cos jest nie tak...")
            setTimeout(() => {
              console.log("Epsztojka pojawia się przed tobą, zasłania ci drogę do motorówki... musicie walczyć")

              setTimeout(() => {
                if(gra.bron){
                console.log("Posiadałeś broń! Epe na jej widok uciekł, a dla ciebie droga jest wolna!")
                gra.didFightOccur = true;
                }
                else {
                  setTimeout(() => {
                    console.log("Twoje szanse na sukces wynoszą 25%...")
                    let num = Math.floor(Math.random() * (100 - 1) + 1)
                    setTimeout(() => {
                      if(num >= 75) {
                        console.log("Udało sie! Szybko, masz czas aby uciec!!!")
                        gra.didFightOccur = true;
                        zakonczTure()
                      }
                      else {
                        console.log("...Przegrałeś pojedynek... Trafiasz spowrotem do celi.")
                        gra.lostFight = true
                        zakonczTure()
                      }
                    }, 1000);
                  }, 1000);
                }
                setTimeout(() => {
                  zakonczTure();
                }, 2000);
              }, 1000);
          }, 1500);
        }
        else
          console.log("Jestes już blisko plaży, przypomnij sobie czy napewno posiadasz kartę aby się na nią dostać..." +
          + "Przydadzą się rownież kluczyki do motorówki aby raz na zawsze stąd uciec.")
      }
       break
    case 5:
      if (!gra.kluczyki)
        console.log("Aby uciec, potrzebujesz kluczyków");
      else
        console.log("Możesz uciec z wyspy, użyj akcja('ucieczka')!");
      break;
    default:
      console.log("Nieznane pomieszczenie");
  }
}
function idz(kierunek) {
  if(gra.energia === 0) {return}
  let nastepnyPokoj = gra.pokoj
  switch (kierunek) {
    case "prawo": {
      if(gra.pokoj % 2 == 0 && gra.pokoj < 5) {
        nastepnyPokoj += 1
        zakonczTure()
      }
      else if(gra.pokoj % 2 == 1) {
        nastepnyPokoj -= 1
        zakonczTure()
      }
      if(nastepnyPokoj == 0) {
        console.log("Napotkales sciane!")
        nastepnyPokoj = 1
      }
      break;
    }

    case "lewo": {
      if(gra.pokoj % 2 == 1 && gra.pokoj <= 5) { 
        nastepnyPokoj += 1
        zakonczTure()
      }
      else if(gra.pokoj % 2 == 0) {
        nastepnyPokoj -= 1
        zakonczTure()   
      }   
      if(nastepnyPokoj == 0) {
        console.log("Napotkales sciane!")
        nastepnyPokoj = 1
      }
      if(nastepnyPokoj == 6) {
        console.log("Idziesz w złym kierunku...")
        nastepnyPokoj = 5
      }
      break;
    }

    default: {
      console.log("Nieznany kierunek! Sprobuj jeszcze raz.");
      return;
    }
  }

  gra.pokoj = nastepnyPokoj;
  if(gra.energia === 0) {return}
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
        console.log("Podniesiono karte! Czujesz ze cos tutaj jeszcze moze byc...");
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

    case "ucieczka":
      if (gra.kluczyki && gra.pokoj == 5) {
        gra.wygrana = true
        gra.koniec = true
        zakonczTure()
      } else if (gra.pokoj != 5) {
        console.log("Akcja wykonana w niewlasciwym pokokju");
      } else {
        console.log("Do ucieczki potrzebujesz kluczyków");
      }
      break;
    
    case "sekret":
      if(gra.pokoj == 2 && !gra.bron) {
        let num = Math.floor(Math.random() * (100 - 1) + 1)
        if(num > 80) {
          console.log("Znalazles sekretna bron na epsztojke!")
          gra.bron = true
        }
        else
          console.log("Nic nie znalazles... ale możesz szukać dalej!")
        zakonczTure()
      }
      else if(gra.pokoj == 2 && gra.bron) 
        console.log("Znalazłeś już broń! Nie ma tutaj już innych przedmiotów")
      else
        console.log("Akcja wykonana w złym pokoju")
      break;

    default:
      console.log("Nieznany przedmiot");
      break;
  }
}

function exportJSON() {
  const jsonString = JSON.stringify(gra);
  return jsonString;
}

function importJSON(text) {
  let data;
  try {
    data = JSON.parse(text);
    if (data === null || typeof data !== "object") { return false }
  } catch (e) {
    throw new Error("Zle dane importu.")
  }
    if(!Number.isInteger(data.pokoj) || data.pokoj < 1 || data.pokoj > 5) {return false}
    if(!Number.isInteger(data.energia) || data.energia < 0 || data.energia > 13 ) {return false}
    if(typeof data.karta !== "boolean") {return false}
    if(typeof data.kluczyki !== "boolean") {return false}
    if(typeof data.bron !== "boolean") {return false}
    if(typeof data.lostFight !== "boolean") {return false}
    if(typeof data.didFightOccur !== "boolean") {return false}
    if(typeof data.koniec !== "boolean") {return false}
    if(typeof data.wygrana !== "boolean") {return false}  

  gra.pokoj = data.pokoj;
  gra.energia = data.energia;
  gra.karta = data.karta;
  gra.kluczyki = data.kluczyki;
  gra.bron = data.bron;
  gra.lostFight = data.lostFight;
  gra.didFightOccur = data.didFightOccur;
  gra.koniec = data.koniec;
  gra.wygrana = data.wygrana;
  return true
}
start();