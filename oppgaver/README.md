## 🚀 Kom i gang

### 1. Klon repoet

### 2. Sett opp miljøvariabler

For å kunne bruke Azure-tjenestene må vi legge til API-nøkler og endepunkter i en `.env`-fil. Dette bidrar til å holde sensitiv informasjon sikker.

_Slik gjør du:_

1. **Naviger til Backend-mappen**

Åpne en terminal og naviger til oppgaver-mappen, deretter backend-mappen:

```bash
cd oppgaver/backend
```

2. Opprett en `.env`-fil i rooten på backend-prosjektet.

3. Klikk på lenken under og kopier alt.
   - [https://secret-service.bouvet.no/#/s/4e8f4a81-d8e1-4126-b603-021bba75d6b5/051XQIqqfT40JXF2bTZRdS](https://secret-service.bouvet.no/#/s/c769b4d4-0308-48a6-9504-f38b1f6237d6
   - Skriv inn decryption key for å se innholdet
)
4. Lim inn i `.env`-filen

### 3. Kjør prosjektet

For å kjøre prosjektet anbefales det å bruke to separate terminaler: én for frontend og én for backend.

### Backend

Følg disse trinnene for å sette opp og kjøre backend:

1. **Naviger til Backend-mappen**  
   Åpne en terminal og naviger til oppgaver-mappen, deretter backend-mappen:
   ```bash
   cd oppgaver/backend
   ```
2. **Opprett et virtuelt miljø**
   ```bash
   python3 -m venv .venv
   ```
3. **Aktiver et virtuelt miljø**
   ```bash
   (Mac/linux) source .venv/bin/activate
   (Windows) .venv\Scripts\activate
   ```
4. **Installer nødvendige Python-pakker**
   ```bash
   pip3 install -r requirements.txt
   ```
5. **Kjør Flask server**

   ```bash
   flask run

   ```

*🚨 Første gang prosjektet kjøres, vil kommandoen "flask run" gi en feilmelding. Dette skyldes at det gjenstår noen oppgaver som må fullføres for at den skal fungere som forventet🚨*

### Frontend

Følg disse trinnene for å sette opp og kjøre frontend:

1. **Naviger til Frontend-mappen**
  Åpne en terminal og naviger til `frontend`-mappen:

   ```bash
   cd oppgaver/frontend

   ```

2. **Installer avhengigheter**
   ```bash
   npm install
   ```
3. Run dev server
   ```bash
   npm run dev
   ```

## Oppgave 1 – OBJEKTGJENKJENNING 🔍

_I oppgave 1 skal vi bruke Azure Custom Vision for å gjenkjenne objekter (ingredienser) i et bilde. For å få til dette skal vi sette opp .env-fil, backend-route, og koble dette til frontend._

---

### 1.1 Opprett en route i Frontend for å vise hjemsiden

_Den ferdiglagde komponenten ImageUploadPage viser en side i frontenden der brukerne kan laste opp bilder. Vi skal nå sette opp en route som viser denne som hjemmesiden_

**Oppgave**

1. Naviger til `App.tsx`, som ligger i `src`-mappen.
2. Opprett en ny route med `path= "/"` som peker til komponenten **ImageUploadPage**.

Når du har fullført oppgaven, skal **ImageUploadPage** vises på skjermen.

### 1.2 Validering av filtype i SelectFileButton

_SelectFileButton-komponenten er en knapp som lar brukeren velge en fil (for eksempel et bilde) fra enheten sin._

**Oppgave**

1. Naviger til components/Buttons/SelectFileButton
2. Legg til en sjekk i knappen som sikrer at kun følgende filtyper aksepteres: .png, .jpg, .jpeg
   - Kontrollen skal også sørge for at filtypene er i små bokstaver (lowercase).

_Hint: Her kan man bruke accept-attributtet._

Når oppgaven er fullført, skal det kun være mulig å laste opp filer med formatene **.png**, **.jpg**, eller **.jpeg**.

### 1.3 Backend-route for å gjenkjenne ingredienser

_Når en `POST`-forespørsel sendes til `/recognize_ingredients`, skal bildet som er sendt med forespørselen behandles av Azure Custom Vision for å gjenkjenne ingredienser. Forespørselen skal inneholde et bilde, og endepunktet skal returnere ingrediensene som ble gjenkjent._

**Oppgave**

1. Naviger til services/routes.py i backend
2. Oppdater endepunktet i routes.py for å motta bildet:
   - Metode: `POST`-forespørsel
   - URL:`/recognize_ingredients`
3. Finn ut hvilken klasse som må brukes for å kalle Custom Vision i Azure.
4. Returner en JSON-formatert liste med ingredienser, for eksempel:

```json
["paprika", "onion", "fish oil"]
```

Når oppgaven er fullført, skal det være mulig å kjøre kommandoen `flask run` i backend-terminalen uten at det gir feilmelding. Husk å kjør kommandoen i `oppgaver/backend`. Du kan bytte folder med `cd`

### 1.4 Frontend – Fetch-kall

_I denne oppgaven skal du gjøre et fetch-kall i UploadImageButton.tsx. Komponenten er designet for at brukeren skal kunne laste opp et bilde til et API for å identifisere ingredienser. Når opplastingen er fullført, skal resultatene fra API-et vises som en liste._

**Oppgave**

1.  **Naviger**:

    Naviger til `Buttons/UploadImageButton.tsx`

2.  **Last opp et bilde av kjøleskapet**:

    Last opp et bilde av et kjøleskap med ingredienser. Hvis du ikke har et slikt bilde, kan du også bruke et bilde fra internett. Du vil bli tatt videre til der oppgaven fortsetter.

4.  **Opprett en knapp**:

    Opprett en knapp med teksten "Send" og tilordne den CSS-klassen className={styles.buttons}.

5.  **Håndter knappens funksjonalitet**:

    Når brukeren klikker på knappen, skal bildet som er valgt lastes opp til API-et.  
     _Hint: Bruk `onClick`._

6.  **Sjekk om en fil er valgt**:

    Hvis ingen fil er valgt, logg meldingen "ingen fil er valgt" og returner en tom liste.

7.  **Lag API-kall**:  
     Bruk et POST-kall til følgende URL:  
     `http://127.0.0.1:5000/recognize_ingredients`.  
     Bildet skal sendes som `formData`.

8.  **Konverter responsen til JSON-format**:
    Konverter responsen fra serveren til å være JSON-format

Når du har fullført oppgaven, skal det være mulig å klikke på knappen, og de identifiserte ingrediensene vil bli vist.

## Oppgave 2 – INNHOLDSGENERERING 🧠

_I oppgave 2 skal en oppskrift genereres basert på ingrediensene som ble valgt i forrige steg._

---

### 2.1 Kall på generate_recipe fra frontenden

_I IngredientTagsContainer.tsx finnes det en funskjon `generateRecipe`, som skal kalles når man ønsker å sende listen med tags til backend, og generere en oppskrift. Denne funksjonen er ikke ferdig implementert_

**Oppgave**

Fullfør implementasjonen av `generateRecipe`. Den tar imot en liste av tags (`tags: string[]`), og skal sende disse til `/generate_recipe` endpointet.

1. **Naviger**
   Naviger til `IngredientsTagsContainer/IngredientTagsContainer.tsx`
2. **Lag API-kall**

   Bruk et POST-kall til følgende URL:
   `http://localhost:5000/generate_recipe`

   Headeren skal inneholde: { "Content-Type": "application/json" }

   Bodyen skal inneholde tags som er konvertert til JSON.

3. Hvis responsen er OK, konverter resultatet fra backend til JSON med `await response.json()`.
4. Bruk oppskriften (JSON-data) fra responsen og kall `onDone`-funksjonen med oppskriften.

Når du har fullført oppgavene, vil du bli navigert til en ny side i applikasjonen, som viser en default visning av havregrøt.

### 2.2 Implementer RecipeGenerator

_I backend finnes det en klasse `RecipeGenerator` som er ansvarlig for å generere en oppskrift basert på en liste med
ingredienser. Foreløpig returnerer denne klassen bare dummy-data._

#### Oppgave

I denne oppgaven skal du endre klassen `RecipeGenerator` slik at den kan generere en oppskrift.

1. **Naviger**

   Naviger til `recipe_generator.py`

2. **Ta imot en liste med ingredienser som input**

3. **Kalle på Azure-tjenester**

   Kalle alle nødvendige Azure-tjenester for å generere en oppskrift.
   _Hint: Her trenger man innholdsgenerering og bildegenerering_

4. Returnere en komplett og strukturert oppskrift som resultat.

   _Hint: Her skal man erstatte defaulten med havregrøt_

### 2.3 Forbedre Prompten

_En godt formulert prompt er avgjørende for å generere relevante og presise resultater._

#### Oppgave

1. Gå gjennom eksisterende tekst i prompten i `recipe_generator.py`.
2. Sørg for at prompten er klar, spesifikk og inkluderer all nødvendig kontekst for å generere en oppskrift av høy
   kvalitet.

## Bonusoppgave 3 – Databaseoppgaven (Azure Table Service) 🎉

_Nå skal vi lagre den genererte oppskriften i en database, og hente ut tidligere genererte oppskrifter og vise disse i
frontend. Vi bruker Azure Table Service (en enkel NoSQL-løsning) for å
gjøre dette._

---

### 3.1 Lagring av resultatet

`database.py` inneholder funksjoner for å bruke Azure Table Service databasen. Vi skal først fullføre funksjonen for å lagre oppskrifter i databasen.

### Oppgave

Etter en oppskrift er fullført generert, bruk `save_recipe` for å sende dataene til databasen. Denne funksjonen tar to argumenter.
Først, oppskriften, som vi allerede har, og nummer to, en unik bruker-id `user_id`. Finn funksjonen `useUserId()` i
frontend, og bruk denne til å sende med `user_id` i `generate_recipe` requesten.

### 3.2 Hent ut oppskrifter – get_recipes

_Om forrige steg er gjort riktig, skal oppskriftene dine ligge i Azure Table Service, og det er nå mulig å skrive en funskjon for å hente ut alle oppskrifter
som tilhører deg, og vise disse i frontend._

### Oppgave

I database.py finnes det en funksjon `get_recipes`. Denne er delvis implementert, og gjør følgende:

1. Lag en query som spør etter alle oppskrifter som matcher din `user_id`.

2. Kall på Azure klienten for å hente ut dataen.

For å fullføre funksjonen, må du iterere over dataene, og returnere en liste over oppskrifter.

Dersom alt er gjort riktig, skal dine oppskrifter nå lagres etter de er fullført generert. Når man navigerer til `Mine Oppskrifter` taben i frontend, skal man se alle oppskrifter man har generert tidligere.
