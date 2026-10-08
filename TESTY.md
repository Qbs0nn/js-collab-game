Testy
1. Napotkanie ściany

Test: Napotkanie ściany nigdy nie posuwa gry, nie zmienia się energia.
Oczekiwany wynik: Gracz nie przechodzi dalej i energia się nie zmniejsza.
Otrzymany wynik: Zgodny z oczekiwanym.

2. Zły ruch lub powtórzenie akcji

Test: Zły ruch lub powtórzenie akcji nie zmniejsza energii.
Oczekiwany wynik: Energia pozostaje bez zmian.
Otrzymany wynik: Zgodny z oczekiwanym.

3. Ponowne podniesienie przedmiotu

Test: Przedmiotu nie da się podnieść drugi raz.
Oczekiwany wynik: Przedmiotu nie można ponownie podnieść i energia się nie zmniejsza.
Otrzymany wynik: Zgodny z oczekiwanym.

4. Włączenie zasilania

Test: Włączenie zasilania wymaga bezpiecznika.
Oczekiwany wynik: Bez bezpiecznika nie można włączyć zasilania.
Otrzymany wynik: Zgodny z oczekiwanym.

5. Wyjście

Test: Wyjście wymaga zasilania i karty.
Oczekiwany wynik: Do wyjścia potrzebne jest włączone zasilanie oraz karta.
Otrzymany wynik: Zgodny z oczekiwanym.

6. Ruch w prawo

Test: Ruch w prawo ZAWSZE przesuwa pokój (pokój > 1 && pokój < 4) i zużywa energię.
Oczekiwany wynik: Pokój zostaje przesunięty o 1, a energia się zmniejsza.
Otrzymany wynik: Zgodny z oczekiwanym.

7. Ruch w lewo

Test: Ruch w lewo w pokoju 2, 3, 4 cofa pokój o 1 i zużywa energię.
Oczekiwany wynik: Pokój cofa się o 1, a energia się zmniejsza.
Otrzymany wynik: Zgodny z oczekiwanym.

8. Reset gry

Test: start() resetuje grę.
Oczekiwany wynik: Gra wraca do stanu początkowego.
Otrzymany wynik: Zgodny z oczekiwanym.

9. Brak energii

Test: Brak energii skutkuje końcem gry. Gdy gra się zakończy nie da się ruszyć.
Oczekiwany wynik: Po utracie całej energii gra się kończy i nie można wykonać kolejnych ruchów.
Otrzymany wynik: Zgodny z oczekiwanym.

10. Literówki i błędne opisy

Test: Literówki i błędne opisy nie zużywają energii.
Oczekiwany wynik: Energia pozostaje bez zmian.
Otrzymany wynik: Zgodny z oczekiwanym.