# Akademia Tarnowska

## Kurs
Testowanie i Jakość oprogramowania + praca inżynierska

## Autor
Mikołaj Bryndal

## Temat projektu
Testowanie backendu i komponentów z aplikacji internetowej służącej do monitorowania aktywności użytkownika w serwisie muzycznym 

## Opis projektu

Aplikacja monitorująca aktywność użytkownika w serwisie muzycznym Spotify. Projekt skupia się na dostarczeniu użytkownikom spersonalizowanego i wyjątkowego doświadczenia muzycznego poprzez analizę ich preferencji i zwyczajów słuchania muzyki.

## Uruchomienie projektu

W katalogu projektu uruchomić komendy:

### npm install
### npm run dev

Powinna się otworzyć nowa karta przeglądarki z adresem: [http://localhost:3000](http://localhost:3000/)

## Uruchomienie testów jednostkowych i integracyjnych (frontend)

#### npm run testFront

## Uruchomienie testów jednostkowych i integracyjnych (backend, będzie próbował też front, ale nie ma pozwolenia do plików.jsx )
#### npm run testBack


## Dokumentacja API

## Scenariusze testowe dla testera manualnego

| Test Case ID | Opis | Kroki testowe | Oczekiwany wynik |
| ---------| ---------| ---------| ---------|
| TC_01 | Zalogowanie się na konto Spotify | 1.Kliknij przycisk "Login with spotify" i podaj swoje dane logowania | Pojawienie się panelu głównego|
| TC_02 | Pokaż profil użytkownika | Kliknij w avatar w prawym górnym rogu i wybierz "Profile" | Pojawienie się komponentu z danymi użytkownika|
| TC_03 | Wyloguj | Kliknij w avatar w prawym górnym rogu i wybierz "Logout" | Pojawienie się komponentu z przyciskiem "Login with spotify" |
| TC_04 | Przeglądanie nowych wydań | Kliknij w "Made for You" w lewym panelu bocznym | Pojawienie się komponentu z nowymi wydaniami |
| TC_05 | Pokaż ulubionych artystów | Kliknij w "Favorite Artists" w lewym panelu bocznym | Pojawienie się komponentu zawierającego ulubionych artystów użytkownika |
| TC_06 | Pokaż ulubione utwory  | Kliknij w "Favorite Songs" w lewym panelu bocznym |Pojawienie się komponentu zawierającego ulubione utwory użytkownika wraz z: 1. Wykresem przedstawiającym dystrybucje artystów w playliście, 2. Wykresem przedstawiającym dystrybucje gatunków jeśli jest ona przypisana do artysty |
| TC_07 | Pokaż playlisty użytkownika | Kliknij w "Playlists" | Pojawienie się komponentu z playlistami użytkownika |
| TC_08 | Pokaż playliste użytkownika | Będąc w "Playlists", kliknij na daną playliste lub bezpośrednio kliknij na jedną z panelu bocznego | Pojawienie się komponentu z danymi playlisty wraz z wykresami takimi jak w teście 06 |
| TC_09 | Pokaż obserwowanych artystów | Kliknij w "Followed Artists" | Pojawienie się komponentu z obserwowanymi artystami użytkownika wraz z gatunkami, jeśli isnieją |
| TC_10 | Pokaż zapisane albumy | Kliknij "Albums" | Pojawienie się komponentu z zapisanymi albumami wraz z bubble chart'em (TODO) |

## Technologie użyte w projekcie
### Front-end:
* React
* Redux
* Sass
* Webpack
* Material UI
### Back-end:
* Node.js
* Express.js
### Testowanie:
* supertest
* jest
* react-testing-library