# Exercici 1 – Preguntes teòriques sobre serveis Angular (1.5 punts)

## Quina és la funció dels components i serveis? (i.e. quan s'ha d'utilitzar cadascun)

En resum, els components són els responsables de decidir quines dades mostrar i com representar-les i mostrar-les a la interfície d'usuari.
Vinculem les nostres dades des dels components cap a la nostra interfície d'usuari, i vinculem els esdeveniments des de la interfície d'usuari als mètodes dels components per permetre i gestionar les interaccions dels usuaris.
És a dir, els components d'Angular són la capa de presentació i haurien d'estar implicats i centrar-se en els aspectes de presentació de les dades.


Però si els components són la nostra capa de presentació, es planteja la pregunta, qui hauria de ser el responsable d'obtenir dades reals i de la lògica empresarial comuna en una aplicació Angular.
Aquí és on entren els serveis d'Angular. Els serveis d'Angular són la capa comuna a la vostra aplicació, que es pot reutilitzar en diversos components. En general, es creen i utilitzen els serveis d'Angular quan:

- S'han de recuperar o enviar dades al vostre servidor. Això pot implicar o no cap tractament de les dades mentre es transfereixen.
- S'ha d'encapsular una lògica d'aplicació que no sigui específica de cap component o una lògica que es pugui reutilitzar entre components.
- S'han de compartir dades entre components, especialment entre components que poden o no saber-se els uns dels altres. Els serveis per defecte són únics a tota la vostra aplicació, cosa que us permet emmagatzemar l'estat i accedir-hi a través de diversos components.

## Què és la injecció de dependències? Per què serveix el decorador `@Injectable`?

La injecció de dependències és el concepte en què qualsevol classe o funció ha de demanar les seves dependències, en lloc d'instanciar-les elles mateixes. L'injector és l'encarregat d'esbrinar què es necessita i com crear-ho. La injecció de dependència té enormes avantatges, ja que permet crear peces modulars i reutilitzables alhora que permet provar facilment components i mòduls.


En el següent exemple no hi ha gaires diferències  entre `MyDummyService` i `MyDIService`, excepte que una classe crea una instancia d'`HttpService` abans d'utilitzar-la, mentre que l'altra en demana una al constructor.

```TypeScript
class MyDummyService {

    getMyData() {
      let httpService = new HttpService();
      return httpService.get('my/api');
    }
}

class MyDIService {

    constructor(private httpService: HttpService) {}

    getMyData() {
      return this.httpService.get('my/api');
    }
}
```

Aquest petit canvi permet moltes coses, com ara:

- Fa més evident el què és necessari perquè cada servei s'executi de veritat, en lloc de saber-ho en temps d'execució.
- En l'exemple, crear una instancia d'`HttpService` va ser trivial, però podria no ser-ho en determinats casos. En aquest cas, cada usuari d'e '`HttpService` haurà de saber exactament com crear-la i configurar-la abans d'utilitzar-la.
- En la prova, és possible que no vulguem fer crides HTTP reals. Allà, podem substituir i crear una instancia `MyDIService` amb un `HttpService` fals que no faci crides reals, mentre que no hi ha res a fer a `MyDummyService`.

Podem veure el servei d'injecció de dependències d'Angular com un magatzem de clau-valor, on qualsevol component o classe pot demanar una clau quan s'inicialitza. En realitat, és molt més complex que un magatzem de clau-valor.

Cada servei ha d'estar registrat com a proveïdor amb un injector. Aleshores qualsevol altra classe pot demanar el servei i l'injector serà l'encarregat de prestar-lo. Angular no té només un injector, sinó que té una jerarquia d'injectors.

S'utilitza el decorador `@Injectable` per a definir una classe com a servei. El sistema d'injecció de dependències angular s'encarregarà d'injectar les dependències al servei.

```TypeScript
import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  constructor() { }

}
```

## Explica els conceptes següents de la programació reactiva que es fan servir a RxJS:
- Observable: representa la idea d'una col·lecció invocable de valors o esdeveniments futurs.
- Observer: és una col·lecció de callbacks que sap escoltar els valors que ofereix l'`Observable`.
- Subscription: representa l'execució d'un `Observable`, és útil principalment per cancel·lar l'execució.
- Operators: són funcions pures que permeten un estil de programació funcional per tractar col·leccions amb operacions com ara `map`, `filter`, `concat`, `reduce`, etc.
- Subject: és equivalent a un `EventEmitter` i l'única manera de multidifusió d'un valor o esdeveniment a diversos `Observers`.
- Schedulers: són despatxadors centralitzats per controlar la concurrència, cosa que ens permet coordinar-nos quan es produeix un còmput, p.ex. `setTimeout` o `requestAnimationFrame` o altres.

[Més informació...](https://rxjs.dev/guide/overview)

## Quina és la diferència entre promeses i observables?

Hi ha algunes diferències entre observables i promeses, principalment:

- Les promeses operen en un únic esdeveniment asíncron, mentre que els observables ens permeten fer front a un flux de zero o més esdeveniments asíncrons.
- A diferència de les promeses, els observables es poden cancel·lar. És a dir, finalment es cridarà al gestor d'èxits o fracassos d'una promesa, mentre que podem cancel·lar una subscripció i no processar dades si no ens interessa.
- Els observables ens permeten compondre i crear fàcilment una cadena de transformacions. Els operadors inclosos permeten algunes composicions fortes i potents, i operacions com `retry` i `replay` fan que la gestió d'alguns casos d'ús habituals sigui trivial. Tot això alhora que podem reutilitzar el nostre codi de subscripció.


## Quina és la funció de la canonada `async`?

Desembolcalla un valor d'una primitiva asíncrona.

```TypeScript
{{ obj_expression | async }}
```

Angular proporciona una canonada anomenada `async` que ens permet vincular a l'`Observable`. Així, Angular s'encarregaria d'esperar que els esdeveniments s'emetin a l'observable i de mostrar directament el valor resultant. Ens estalvia el pas d'haver de subscriure manualment a l'observable.

En l'exemple següent, l'`Observable` actualitza contínuament la vista amb l'hora actual.
```TypeScript
@Component({
  selector: 'async-observable-pipe',
  template: '<div><code>observable|async</code>: Time: {{ time | async }}</div>',
})
export class AsyncObservablePipeComponent {
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
```
[Més informació...](https://angular.io/api/common/AsyncPipe)
