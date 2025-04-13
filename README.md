# Zero Farm Assignment

---

## Esercizio 1: RENDERING

### Domanda: Come evito il rendering su `<ChildCmp />` quando scrivo nella `<input />` ?

**La Soluzione:**

`React.memo`

**Spiegazione:**

Quando lo stato di un componente genitore (`<ParentCmp />`) cambia (ad esempio, a causa di un input utente in un `<input />`), il genitore si ri-renderizza. Per impostazione predefinita, React ri-renderizza anche tutti i suoi componenti figli (`<ChildCmp />`), anche se le props passate al figlio non sono cambiate. Avvolgendo `<ChildCmp />` con `React.memo`, React memorizza il risultato del rendering del figlio. Prima di ri-renderizzarlo, confronta le nuove props con le precedenti: se sono identiche (in questo caso la prop `descrizione` è sempre uguale a `CHILD`), React salta il ri-rendering del figlio e riutilizza l'output memorizzato, ottimizzando le prestazioni.

```jsx
export default React.memo(ChildCmp);
```

---

## Esercizio 2: LOGS

### Domanda: Come organizzeresti le chiamate REST API?

**La Soluzione:**

Creazione endpoint `GET /api/logs?limit=20&before_timestamp=2025-04-13T14:45:00Z`

**Spiegazione:**

Creazione di un endpoint `GET /api/logs` che accetti un parametro `limit (es. ?limit=20)` per definire quanti log ricevere alla volta. Per caricare log più vecchi man mano che l'utente scorre, aggiungere un parametro `?before_timestamp=...`, usando il timestamp dell'ultimo log ricevuto nel gruppo precedente. Per il primo caricamento (i log più nuovi) non serve questo parametro. Il backend deve sempre restituire i log ordinati per data dal più recente al più vecchio e usare `before_timestamp` per filtrare, se specificato. Il frontend sa di essere arrivato alla fine quando l'API gli manda indietro meno log di quanti ne aveva chiesti con `limit`.

```json
[
  { "id": "1", "timestamp": "2025-04-13T14:46:00Z", "message": "Log 1" },
  { "id": "2", "timestamp": "2025-04-13T14:45:00Z", "message": "Log 2" }
]
```

### Domanda: Come realizzeresti questo meccanismo lato frontend?

**La Soluzione:**

- Creazione di un event listener che controlla se l'utente è arrivato quasi in fondo alla lista.
- Creazione di uno stato per tenere traccia dei log.
- Creazione di due variabili per tenere traccia dell'ultimo log e se ci sono ancora dati.
- Creazione di uno stato per il caricamento(isLoading) - necessario ma opzionale in questo esempio

**Spiegazione:**

Con `useEffect` si fa la prima chiamata API appena il componente si monta per prendere i log iniziali. Poi, sempre in un useEffect, si crea un event listener allo `scroll` della finestra o del contenitore della lista. Dentro questo listener, si controlla se l'utente è arrivato quasi in fondo alla lista (calcolando le altezze e la posizione dello scroll). Se sì, e se ci sono ancora log (hasMore), si rifa fa la chiamata API con il `limit` e il `lastTimestamp` giusto. I nuovi log si salvano dentro lo stato, accodando i nuovi log arrivati a quelli precendenti.

```jsx
function LogList() {
  const [logs, setLogs] = useState([]);
  const hasMore = useRef(true);
  const lastTimestamp = useRef(null);
  const LIMIT = 20;

  const loadMoreLogs = useCallback(async () => {
    if (!hasMore.current) return;

    const newLogs = await ...

    if(newLogs.length > 0) {
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);

      lastTimestamp.current = newLogs[newLogs.length - 1].timestamp;
      hasMore.current = newLogs.length === LIMIT;
    } else {
      hasMore.current = false;
    }
  }, []);

  useEffect(() => {
    loadMoreLogs();
  }, [loadMoreLogs]);

  useEffect(() => {
    const handleScroll = () => {
      const container = ...;
      const scrollPosition = window.innerHeight + container.scrollTop;
      const totalPageHeight = container.offsetHeight;
      const threshold = 100;

      const trigger = scrollPosition >= totalPageHeight - threshold;

      if (trigger && hasMore.current) {
        loadMoreLogs();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreLogs]);

  return <pre>{JSON.stringify(logs, null, 2)}</pre>;
}
```

---

## Esercizio 4: Typescript

**Implementazione:**

```typescript
class Buffer<T> {
  private data: T[] = [];

  get(index: number): T | undefined {
    if (index >= 0 && index < this.data.length) {
      return this.data[index];
    }

    return undefined;
  }

  add(element: T): void {
    this.data.push(element);
  }

  remove(element: T): void {
    const index = this.data.indexOf(element);

    if (index > -1) {
      this.data.splice(index, 1);
    }
  }
}
```

---
