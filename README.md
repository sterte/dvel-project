# dvel-project

## Introduzione
Questo documento NON ha pretesa di essere documentazione tecnica sul progetto, ma di essere una sorta di report di progetto dove sono descritte le tecnolgoie utilizzate e le scelte fatte. Data la natura _proof of concept_ del progetto, molti aspetti sono stati coscientemente tralasciati e verranno evidenziati con la dicitura (POC), in altri casi ho sfruttato l'occasoine per ripassare o affrontare argomenti di varia natura, in tal caso commenti sulla mia (im)preparazione e (in)esperienza verranno aggiunti tra [ ].

## Struttura generale
Il progetto rispetta la classica architettura a 3 livelli client/server/db. Nonostante non fosse richiesto l'utilizzo di un db, ma fosse sufficiente utilizzare dati statici e "cablati", è stato predisposto un mini database MongoDB. Il tutto è stato sviluppato testato ed eseguito in locale (POC).


### Database
Per il db ho predisposto un'istanza di MongoDB con un'unica collezione chiamata _item_ di oggetti strutturati come l'esempio seguente:

```json
{
    "_id" : ObjectId("601316da2fac4ef644e4bab1"),
    "type" : "actor",
    "label" : "Jim Carrey",
    "value" : 176185
}
```

Con i campi aventi il seguente significato:
* _id: id automatico di Mongo
* type: tipologia di item (possibili valori: actor/director/movie)
* label: nome del item
* value: id custom (generati a posteriori con valori random tra 1 a 1000000 verificando non ci fossero duplicati)

Le diciture _label_ e _value_ seguono le indicazioni date nelle specifiche ma non sono vincolanti lato client è possibile definire tali etichette per interfacciarsi anche con strutture dati differenti.

La connessione a DB è configurabile tramite property file apposito, ma non è stata impostata autenticazione (POC).

[Conosco marginalmente MongoDB e l'ho utilizzato tramite Mongoose e NodeJS, non ho mai avuto occasione di utilizzare connettore Java per MongoDB]

#### Dati utilizzati
I dati originari sono stati estratti da un database pubblico ( https://www.back4app.com/database/paul-datasets/dataset-with-all-movies )estraendo 200 attori, 200 registi e 200 film casuali.


### Server
I principali strumenti utilizzati lato server (Java 1.8) sono stati:
* Maven
* Jetty
* Jersey ( https://eclipse-ee4j.github.io/jersey/ )

Il server è stato impostato a partire da archetipo maven:
```bash
$ mvn -B archetype:generate \
	-DarchetypeArtifactId=maven-archetype-webapp \
```

Ed utilizzando jetty come server per fare deploy del .war risultante (POC).

Per gestire la REST API (in realtà è sufficiente un singolo entrypoint in GET) è stato usato il framework Jersey.

Lato server sono possibili numerose migliorie per il momento tralasciate, ad esempio gestire connessione ssl, migliorare logging al momento verso lo standard output, si è scavalcato il problema dei CORS con un allow-origin: *, la connessione a DB dall'interno dei metodi di REST API è direttamente fatta col driver MongoDB, senza preoccuparsi di possibili connessioni a DB differenti, tramite factory (POC).

[Ho lavorato a lungo e in dettaglio con webapp Java e Tomcat, il concetto di REST API invece mi è noto attraverso esperimenti perosnali. Ho sempre sviluppato server REST API utilizzando NodeJS ed ExpressJS, non ho mai avuto occasione di farlo con Java. Da una rapida ricerca Jersey mi è sembrato strumento semplice da usare e più che sufficiente per gli scopi del progetto.]

### Client
Il client è sviluppato in ReactJS, i principali strumenti che ho utilizzato sono Redux e Redux-thunk per la gestione dello stato e l'invocazione della REST API ed il logging; react-dom per la navigazione in modalità _single page app_, e per quanto riguarda la resa grafica [mio punto debole], bootstrap e font-awesome.

Come punto di partenza per svolgere il progetto ho ricercato tra le componenti esistenti di textfield con autocompletamento, da utilizzare come punto di partenza su cui costruire, evitando di reinventare la ruota. Dopo una fase di analisi, la scelta è ricaduta su:

https://react-autosuggest.js.org/

La scelta è stata guidata dal fatto che il componente è ben documentato, la comunità è ancora attiva, è personalizzabile con relativa semplicità, mostrando da subito l'elasticità necessaria per riconfigurarlo/ristrutturarlo in ottica delle specifiche ricevute.

Partendo da questo componente, ho fatto modifiche e personalizzazioni e ci ho costruito la parte di selezione/visualizzazione degli elementi selezionati.

#### Struttura del client
Il client è stato strutturato in 4 pagine:
* Home page: breve presentazione e link alla documentazione e alle specifiche
* Single: pagina con una singola istanza del componente implementato
* Multiple: pagina con 3 istanze del component, una pe rogni tipologia (attori, registi, film) e alcune differenze di configurazione per dimostrare l'utilizzo dei vari parametri
* Playground: analoga a _Single_ ma con la possibilità di visualizzare i parametri utilizzati e l'input nascosto, da utilizzare per eventuali esperimenti _live_ mantenendo integre, e prendendo ispirazione, dalle altre due pagine.