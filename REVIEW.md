# Review af vejledningerne fra en fastsiddende elevs perspektiv

Lavet efter forbedringsrunden (2026-10-22), hvor alle 104 lab-sider fik en "Hvad du har
lært"-oprydning og et nyt "Hvor ses dette igen?"-afsnit. Denne review læser hver side som en elev
der har SIDDET FAST i opgaven i et stykke tid og nu åbner vejledningen for at komme videre. Den
vurderer én ting: lærer siden eleven *hvordan man selv kom på at gøre dette*, eller får de bare
facit?

## Hovedkonklusion

Forbedringsrunden løftede alle sider på to punkter (generalisering + sprog), men den ændrede IKKE
selve brødteksten på de fleste sider. Derfor gælder stadig: **de fleste sider åbner med svaret**
("her er kommandoerne / her er sårbarheden") i stedet for sporet der førte dertil. For en elev der
allerede har prøvet og fejlet, er det netop sporet (hvordan vidste vi at kigge HER?) der mangler.

Tre sider er fuldt omskrevet efter `GUIDELINES.md` og er skabelonen for resten:
`mqtt-defaults`, `beginner-rsa-hardcore`, `serializator`. De viser den kausale kæde, korrekt
kronologi og verificerede kommandoer. Målet for en næste runde er at bringe de øvrige derhen, i
prioriteret rækkefølge.

## Sådan prioriteres der (GUIDELINES.md §4: kalibrér dybde)

Ikke alle sider skal have en 5-trins kæde. En ren `strings | grep`-opgave har ÉT reelt
beslutningspunkt og er fin som den er. Prioriteringen handler derfor om sider hvor der er en RIGTIG
tankegang at lære, men hvor brødteksten springer direkte til facit.

## Tier 1: fuld ræsonnementskæde (skabelon + de deep-rewrites der er lavet)

Oprindelige skabeloner:
- `mqtt-defaults`, `beginner-rsa-hardcore`, `serializator`.

Deep-rewrites lavet i denne runde (var tidligere ren kommando-dump, nu kæde-form med "Sporet":
hvorfor-fulgte-hvert-skridt):
- `shadow`: hintet "in the shadows" + "permissions not under control" peger på `/etc/shadow`;
  viser nu rettigheds-tjek, hash-type-genkendelse, offline-crack, su-via-pty.
- `escalator` + `elevator`: footholdet vises nu som "ingen creds → recon → anonym FTP → SUID-
  enumeration" i stedet for en kommando-blok.
- `cron-my-tab`: `id` afslører den usædvanlige `root-traverse`-gruppe, som leder til jagten på et
  root-cron-script gruppen kan skrive til.
- `its-samba-time`: leder nu med `-sV` → version → CVE-opslag før exploitet.
- `tonic-counter`: viser at man prober andre HTTP-metoder end den ene UI-knap.

Brug alle ovenstående som reference for stil og dybde.

## Tier 2: acceptable efter ærlig gennemlæsning (valgfri let polish)

Ved en anden gennemlæsning som elev viste det sig at disse IKKE er rene facit-dumps: de viser
faktisk nøgle-proben eller det afgørende ræsonnement, bare mere kompakt end Tier 1. De trænger
ikke til en fuld kæde-omskrivning. Rør dem kun hvis der er tid i overskud.

- `set-user-id-hardcore`: viser allerede `find -perm -4000` → GTFObins `-exec` → `-p`-nuancen.
  Fin som den er.
- `micro-cms`: hver af de tre bugs har kommando + en linjes hvorfor (robots = gratis efterretning,
  view/edit = samme ressource, stored XSS belønnet server-side). Acceptabel.
- `comment-all-you-want` / `ninja-sstimulation`: viser `{{7*7}}`→49-proben som første skridt.
  Acceptable.
- `intmonster` / `ice-cream-overflow` / `segfault`: forklarer bug'en ud fra kildekoden. Acceptable.
- `iac-privatekey` / `git-logs`: nævner begge at commit-beskeden er vejskiltet til git-historikken.
  Kompakt men dækkende.
- `certified-secrets`, `admin-logon`, `browserauth`, `exposed-logging`: de mest kompakte. Hvis
  noget skal have en ekstra sætning, er det disse (fx `certified-secrets`: gør eksplicit at man
  LÆSER certifikatet fordi opgaveteksten spørger om det). Lav prioritet.

## Tier 3: allerede solide (ægte ræsonnement ELLER korrekt trivielle)

Disse forklarer enten "hvorfor" fornuftigt i dag, eller er så enkle at mere stillads ville være
nedladende (GUIDELINES §4). De trænger ikke til en kæde-omskrivning, kun evt. små justeringer.

- Netværks-/pcap-forensics med forklaret metode: `network-sniffing`, `follow-telnet-stream`,
  `unhealthy-ftp`, `http-everywhere`, `covert-channels-dns/http/tcp`, `in-the-city`,
  `why-http-qr`.
- Web med reel trin-logik: `sneaky-reviews`, `fartcorp`, `jwt`, `sql-injection`,
  `web-exploitation-ladder`, `hack-swag-shop`, `hackable-app-part2`, `becomming-a-doctor`,
  `csrf-formalbank`, `phishing-cryptobanker`.
- RE/pwn med forklaret analyse: `the-game`, `ransomgang`, `ransomgang-returns`,
  `red-light-green-light`, `galois-force-field-2`, `pwn-strings-gdb`, `postsyd`,
  `bashing-my-keyboard`, `hgls-package-delivery`.
- Crypto/OT med forklaring: `always-be-crypting`, `cracking-the-randomness`, `beg-crypto-ladder`,
  `the-ddc-papers`, `noisy-channel`, `powering-haaukins`, `water-to-the-people`, `water-tank`,
  `ev-charging-ocpp`, `policy-936`, `poursoft-chain`, `campfire-stories`.
- Korrekt trivielle (ét beslutningspunkt, facit ER pointen): `see-my-strings`, `pwn-strings`,
  `based-passwords`, `is-hashing-illegal-pw2`, `ad-security-pw3`, `hasher-2`, `hasher-3`,
  `lost-magic-card`, `broken-but-not-lost`, `dotsuffix`, `winter-snow`, `trashed-secrets`,
  `recovering-files`, `friendly-image`, `the-ransomware-image`, `wizard-activities`,
  `dots-and-dashes`, `base54-bavl`, `flag-in-tree`, `virtual-can-logs`, `network-scanning`,
  `flag-transfer-protocol`, `rocking-ssh`, `the-event`, `johannes-riveren`, `bad-librarian`,
  `health-level-stalker`, `hashle`, `bust-n-crack`, `spaghetti-hex`, `telnet-login`,
  `live-in-a-castle`, OSINT-serien (`public-wifi`, `spot-the-host`, `whos-in-charge`,
  `name-and-shame`, `caught-in-the-net`, `crypto-wallet`, `introduction`).

## Konkret anbefaling til næste runde

Tag Tier 2 i den rækkefølge den står (de giver mest pædagogisk gevinst pr. omskrivning), og brug
de tre Tier 1-sider som skabelon. For hver: find den reelle opdagelsesproces (fra `docs/`-noten
hvis den findes), skriv "Sporet"-afsnittet der viser hvorfor hvert skridt følger af det forrige,
og læs den igennem som eleven to gange (GUIDELINES §9) før commit. Alt arbejde sker i
`scripts/build_tutorials/labs_*.py` + `gen.py`, aldrig i `.html` direkte (GUIDELINES §0).
