# Exercici 2 – Pràctica – Serveis (3.5 punts)

## Quina és la diferència entre definir un servei usant el decorador `@Injectable` o `@NgModule`?

Quan es crea un servei i es registra a la secció de `providers` d'`NgModule`, el servei es registra a l'injector `root`. Això significa que el servei és un únic per a tota l'aplicació, i que qualsevol classe o component de l'aplicació pot demanar el servei i es lliura la mateixa instància del servei.

## Quines altres opcions admeten el decorador @Injectable per a la propietat `ProvidedIn`? Per què serveixen les altres configuracions?

`ProvidedIn?`: Determina quins injectors proporcionaran l'injectable.

```TypeScript
providedIn?: Type<any> | 'root' | 'platform' | 'any' | null
```

- `Type<any>` : associa l'injectable amb un `@NgModule` o altres [InjectorType](https://v17.angular.io/api/core/InjectorType). Aquesta opció és obsoleta.
- `null` : Equival a `undefined`. L'injectable no es proporciona automàticament en cap àmbit i s'ha d'afegir a un array de `providers` `@NgModule`, `@Component` o `@Directive`.

Les opcions següents especifiquen que l'injectable s'ha de proporcionar en un dels següents injectors:

- `'root'` : L'injector a nivell d'aplicació a la majoria d'aplicacions.
- `'platform'` : Un injector especial de plataforma singleton compartit per totes les aplicacions de la pàgina.
- `'any'` : Proporciona una instància única a cada mòdul carregats amb mandra (lazy), mentre que tots els mòduls carregats amb ganes (eagerly) comparteixen una instància. Aquesta opció és obsoleta.

[Més informació](https://angular.io/api/core/Injectable)