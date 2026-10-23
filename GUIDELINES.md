# Retningslinjer for Haaukins-tutorials

Udarbejdet efter en konkret omskrivning af `mqtt-defaults.html` (2026-10-22). Dette dokument er
rettesnoren for at forbedre de resterende ~100 tutorials på samme måde. Hver regel herunder er
udledt af en fejl vi faktisk begik og rettede i den omskrivning, ikke en abstrakt idé.

## 0. Redigér Python-kilden, ALDRIG `.html`-filen direkte

`tutorials/*.html` er GENERERET fra Python-data i `scripts/build_tutorials/labs_*.py` via
`scripts/build_tutorials/gen.py`. En direkte redigering af en `.html`-fil forsvinder ved næste
`python3 gen.py`-kørsel, uden varsel.

**Sådan gør du for en given side (slug = filnavnet uden `.html`):**
1. `grep -rln "slug=\"<slug>\"" scripts/build_tutorials/*.py` for at finde den rigtige fil.
2. Redigér `dict(...)`-posten der (felterne `sections`, `learned`, `spoiler`, og det valgfrie
   `seealso`-felt for "Hvor ses dette igen?"-afsnittet).
3. Kør `python3 gen.py` fra `scripts/build_tutorials/`.
4. `git diff --stat tutorials/` skal kun vise substantielle ændringer i DEN tiltænkte side (de
   øvrige ~103 filer kan vise en enkelt tom linje fra et skabelonfelt, det er forventet og
   harmløst).
5. Commit begge filer sammen: kilden i `scripts/build_tutorials/labs_*.py` og den genererede
   `.html`-fil.

## 1. Kronologisk integritet: fortæl det i den orden det blev opdaget

Et skridt må ikke bruge information vi først fik SENERE som begrundelse for noget vi gjorde
TIDLIGERE. Eleven skal kunne stole på at "fordi X" rent faktisk var kendt, da beslutningen blev
taget.

**Fejlen vi begik:** vi skrev at `operator`/`catalina` blev valgt fordi det er en kendt
Tomcat-default, som var FØR årsag. I virkeligheden blev credentials fundet ved brute-force mod en
generel ordliste, og Tomcat-mønstret blev først bemærket BAGEFTER, som en forklaring på hvorfor
en generel ordliste virkede, ikke som den oprindelige motivation.

**Tjek:** læs hvert "fordi"/"derfor" i guiden. Var den begrundelse reelt kendt på det tidspunkt i
processen, eller er det efterrationalisering der er flyttet for tidligt ind i teksten?

## 2. Vis beslutningspunkterne, ikke kun destinationen

Hvert skridt skal vise HVAD der blev prøvet, HVAD der skete (inklusive mislykkede forsøg), og
hvorfor det resultat ledte til det næste skridt. En fortalt beskrivelse ("vi testede om X virkede
uden login") er ikke nok; vis den faktiske kommando og det faktiske (eller realistiske) output.

**Fejlen vi begik:** vi SKREV at vi "testede den billigste hypotese" og "brute-forcede en
ordliste", men viste ikke de faktiske kommandoer for nogen af de to skridt, kun den endelige
virkende kommando. En elev der fulgte med live, ville ikke kunne se forsøget eller fejlen, kun
konklusionen.

**Tjek:** for hvert skridt i guiden, kan en læser se den KONKRETE handling (kommando, request,
output), eller bliver handlingen kun refereret i prosa?

## 3. Den røde tråd: hvert skridt skal eksplicit koble til det forrige

Eleven skal aldrig sidde og tænke "hvor kom det tal/den idé fra?". Hvert nyt fakta i guiden
(en port, en sti, en antagelse) skal have en synlig kilde: opgavetekst, et scan, et tidligere
resultat.

**Fejlen vi begik:** et skridt påstod "port 1883 er MQTT's standardport" som en løsrevet
kendsgerning, uden at sige at et scan af værten var det der viste porten åben. Det efterlod et
hul: HVORFOR kigger vi på port 1883 overhovedet?

**Tjek:** peg på kilden for hver konkret detalje i guiden. Hvis kilden ikke er synlig, mangler et
mellemliggende skridt.

## 4. Kalibrér dybde til opgavens faktiske kompleksitet

En étkommando-opgave (fx `strings | grep`) skal ikke have samme mængde ræsonnement-stilladsering
som en flertrins-kæde. Overforklaring af noget trivielt er lige så dårligt som underforklaring af
noget komplekst, det virker nedladende og skjuler hvor den egentlige svære pointe er.

**Anvendelse:** før du udbygger en side, spørg: hvor mange REELLE beslutningspunkter er der i
denne opgave? Et étkommando-facit med én klar pointe behøver ikke en 5-trins kæde. Det gør en
flertrins pwn/crypto-kæde.

## 5. Verificér konkrete tekniske detaljer, gæt dem ikke

Værktøjsnavne, modulstier, flag, protokol-detaljer: disse skal være EFTERPRØVET, ikke plausibelt
klingende. En sikker-klingende men forkert kommando er værre end ingen kommando, fordi den
underviser i noget forkert.

**Fejlen vi begik:** vi skrev `auxiliary/scanner/mqtt/mqtt_login` som Metasploit-modulnavn, et
plausibelt gæt baseret på navnekonventionen, men det eksisterer ikke. Det korrekte modul er
`auxiliary/scanner/mqtt/connect` (bekræftet via opslag). Da vi heller ikke kunne bekræfte det
eksakte options-feltnavn for ordlisten, skrev vi "brug `show options` for at se feltet" i stedet
for at gætte endnu et detaljenavn.

**Tjek:** enhver konkret kommando/sti/flag i en guide der IKKE allerede står i det oprindelige
`docs/`-skriveri eller en kørt log, skal verificeres (websøgning, dokumentation, eller test) før
den skrives ned. Er du usikker på en detalje, peg på hvordan læseren selv bekræfter den
(`show options`, `--help`, dokumentation) i stedet for at opfinde den.

## 6. Forklar hvorfor, ikke kun hvad

Hver mekanisk handling (en kommando, et flag, et credential-par) skal ledsages af den
underliggende årsag til at den virker, formuleret som et generelt koncept, ikke kun "gør dette,
og det virker".

**Eksempel fra omskrivningen:** ikke blot "wildcard-subscribe giver dig flagene", men "MQTT har
ingen `SHOW TABLES`; wildcard-subscribe er den funktionelle analog, fordi pub/sub-systemer ikke
har en kendt liste af ressourcer man kan forespørge direkte".

## 7. Generalisér: hvor ses dette igen?

Forbind den konkrete opgave til den bredere klasse af situationer hvor samme mønster går igen.
Uden dette lærer eleven kun at løse DENNE opgave, ikke at genkende mønstret næste gang det ser
anderledes ud.

**Eksempel fra omskrivningen:** "Hvor ses dette igen?"-afsnittet forbinder MQTT-wildcard-subscribe
til Redis' `PSUBSCRIBE *`, Kafka og AMQP, og credential-genbrug til IoT/OT bredt.

## 8. Stilistisk økonomi

Guiden er et opslagsværk man bruger midt i en CTF, ikke en lærebog. Hold sætninger korte, undgå
overdreven brug af tankestreger (brug punktum, komma eller kolon i stedet), og tilføj kun så meget
nyt stillads som princip 4 tilsiger.

## 9. Læs det igennem som eleven, mere end én gang

Den enkelt mest effektive kontrol i denne proces var at genlæse guiden som om man selv sad og
løste opgaven live, ikke én gang, men flere. Første gennemlæsning fangede de narrative/kronologi-
huller (princip 1-3). Anden gennemlæsning, med samme øvelse gentaget, fangede en helt anden
fejlklasse (en faktuel fejl i princip 5). Forskellige gennemlæsninger fanger forskellige ting;
én gennemlæsning er ikke nok.

**Arbejdsgang per side:**
1. Læs den eksisterende side. Identificér den reelle opdagelsesproces (fra `docs/`-skriveriet
   hvis det findes, ellers fra opgavens logik).
2. Omskriv med princip 1-7 i baghovedet, kalibreret efter princip 4.
3. Læs den igennem som eleven, live. Ret kronologi/hul-fejl.
4. Læs den igennem IGEN som eleven, live. Verificér hver konkret teknisk detalje (princip 5).
5. Tjek stil (princip 8) før commit.

## 10. Nix er VORES miljø, ikke elevens

Når et værktøj manglede i Kali og blev hentet via `nix shell nixpkgs#...`, skriv det ÆRLIGT sådan,
det er faktisk hvordan opgaven blev løst, og skal ikke pyntes væk. Men de fleste kursister har kun
en Kali-instans og kender ikke Nix. Giv derfor ALTID et Kali-naturligt alternativ ved siden af
(typisk `apt install <pakke>` eller `pip install <pakke>`), så siden ikke stiltiende forudsætter
et værktøj langt de fleste læsere ikke har.

**Eksempel:** "Vi kørte dette via `nix shell nixpkgs#qrencode` — på en almindelig Kali er
`apt install qrencode` det tilsvarende."

**Tjek:** hver gang `nix shell` optræder i en guide, står der en Kali-native installationsvej lige
ved siden af?
