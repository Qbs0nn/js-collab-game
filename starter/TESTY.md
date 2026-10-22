
# liteowki w akcjach nie powinny zuzywac energii, 
# reset gry
# nie mozna nic zrobic po koncu gry, 







# 1 RUCH W LEWO I PRAWO.
TEST: Ruch w lewo oraz w prawo powinien zablokować możliwość wyjścia poza pokoje [1-5]. Energia po ruchu powinna spaść w dół o jeden, oraz pokój po wykonaniu ruchu jest przesuwany (jeżeli jest wykonany poprawnie).

Oczekiwany wynik: Nie można wyjść poza pokoje, energia spada w dół po ruchu i pokoje są przesuwane. 

##  Otrzymany wynik: Zgodny z oczekiwanym.

# 2 PRZEDMIOTY 
TEST: Przedmiot po podniesieniu powinien być niemożliwy do podniesienia ponownie(rownież po użyciu danego przedmiotu). 

Oczekiwany wynik: Nie można podnieść przedmiotu już posiadanego, ani podnieść już "zużytego" przedmiotu.

## Otrzymany wynik: Zgodny z oczekiwanym.

# 3 PRZEDMIOTY - PRZEJŚCIE DALEJ
TEST: Bez podniesienia poszczególnych przedmiotow wymaganych do przejścia dalej (np do innego pokoju), nie można iść dalej.

Oczekiwany wynik: Akcja zablokowana bez wymaganego przedmiotu.

## Otrzymany wynik: Zgodny z oczekiwanym.

# 4 WALKA Z EPSZTOJKA
TEST: Walke z EPSZTOJKA można wykonać tylko raz. 

Oczekiwany wynik: Można zawalczyć tylko raz. 

## Otrzymany wynik: Zgodny z oczekiwanym.

# 5 ENERGIA
TEST: Gdy energia wynosi 0, gra powinna sie zakonczyc.

Oczekiwany wynik: Gra zakończona gdy energia jest równa zero.

## Otrzymany wynik: Zgodny z oczekiwanym

# 6 IMPORT | EXPORT
TEST: Czy eksportowanie i importowanie danych przesyla poprawne dane.

Oczekiwany wynik: Wyoksportowany tekst JSON i poprwanie importowane sa dane.

## Otrzymany wynik: Zgodny z oczekiwanym.

# 7 LITEROWKI W AKCJACH
TEST: Czy literowki zuzywaja energie po wykonanie danej akcji.

Oczekiwany wynik: Literowka nie zuzywa energi w danej akcji [np idz("lewoo), akcja("kartaa")]

## Otrzymany wynik: Zgodny z oczekiwanym.

# 8 RESET GRY
TEST: Czy funkcja start() resetuje poprawnie gre (ustawia dane na poczatkowe, itp).

Oczekiwany wynik: reset gry skutkuje ustawieniem danych na poczatkowe.

## Otrzymany wynik: Zgodny z oczekiwanym.

# 9 KONIEC GRY
Test: Czy po koncu gry mozna cos jeszcze robic (akcje, idz itp).

Oczekiwany wynik: Koniec gry skutkuje zablokowaniem jakiejkolwiek mozliwosci akcji badz poruszania sie.

## Otrzymany wynik: Zgodny z oczekiwanym.