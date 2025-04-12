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
