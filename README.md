# Haaukins CTF — tutorials (HTML-site)

Standalone HTML-tutorials for Haaukins-kursister. Åbn [`index.html`](index.html) for den søgbare forside, eller
en enkelt opgave, fx [`heartbleed.html`](heartbleed.html).

**Dette writeup-repo er privat.** Sitet offentliggøres ved at synkronisere *kun* denne mappe til et separat
offentligt repo (så `../docs/` og resten forbliver privat):

```bash
scripts/build_tutorials/publish.sh git@github.com:LOLCATATONIA/haaukins-walkthroughs.git
```

Det offentlige repo serveres så via GitHub Pages (Settings → Pages → Deploy from a branch → main / root).

> Siderne genereres fra `scripts/build_tutorials/` (`python3 gen.py`). Rediger indholdet dér og kør scriptet;
> de færdige `.html`-filer her er resultatet. Tutorials er bevidst **uafhængige af `../docs/`** (vores interne noter).
