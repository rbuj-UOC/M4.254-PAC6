# Exercici 3 – Preguntes teòriques sobre interceptors (1 punt)

## Què són els interceptors?

Angular permet definir interceptors, que conceptualment es poden situar entre l'`HttpClient` i el servidor, la qual cosa permet transformar totes les sol·licituds sortints i escoltar i transformar, si cal, totes les respostes entrants abans de transmetre-les.

## Analitza la següent cadena d'operadors de RxJS, explica cadascun dels passos que s'estan desenvolupant i explica en quin cas faries servir aquest codi:

El següent codi es pot utilitzar per filtrar vins mentre es tecleja a un quadre de cerca:

```TypeScript
this.wines$ = this.searchSubject.pipe(
  startWith(this.searchTerm),
  debounceTime(300),
  distinctUntilChanged(),
  merge(this.reloadProductsList),
  switchMap((query) => this.wineService.getWine(this.searchTerm))
);
```

- La variable anomenada `searchSubject`, podria ser un `Subject` que és un tipus especial d'`RxJS` que actua tant com a observador com a observable. És a dir, és capaç tant d'emetre esdeveniments com de subscriure's a un. Es pot utilitzar  `searchSubject` per activar un esdeveniment sempre que l'usuari escrigui al quadre de cerca.

- `startWith(this.searchTerm)` Amb aquest operador evitem que retorni una llista buida d'existències després que es carregui la pàgina amb el resultat de la cerca. Aquest operador estableix el valor inicial amb el qual s'ha d'activar la cadena observable.

- `debounceTime(300)` evita que es cridi al servidor cada vegada que l'usuari pressiona una tecla. No hi haurà esdeveniments nous durant 300 ms i no s'emetra un esdeveniment nou fins que hagin passat 300 ms des de l'última tecla pressionada.

- `distinctUntilChanged()`, per evitar realitzar la mateixa cerca quan l'usuari desfà el que ha teclejat deixant-ho com estava abans. Aquest operador s'assegura que l'esdeveniment només s'emet si el nou valor és diferent del valor anterior, estalviant així unes quantes crides innecessaries a la xarxa.

- `.merge(this.reloadProductsList)` [Aplana](https://rxjs.dev/api/index/function/merge) aquest operador s'utilitza per aprofitar el mateix observable per carregar la llista, cercar productes i tornar a carregar la llista.

- `.switchMap((query) => this.wineService.getWine(this.searchTerm));` Fins ara, estem utilitzant un `Subject` que emet valors `string`. Però el nostre observable al qual ens unim és un de `Stock[]`. Per a convertir una cadena observable d'un tipus a un altre s'utilitza un tipus particular d'operador `map` anomenat `switchMap`. `switchMap` té un comportament agradable que, a més de convertir d'un tipus d'observable a un altre, també té la capacitat de cancel·lar les subscripcions antigues al vol. Això ajuda a resoldre el problema de resposta fora de comanda d'una manera agradable i neta. Cal tenir en compte que no necessàriament cancel·la la sol·licitud HTTP subjacent, sinó que simplement elimina la subscripció.