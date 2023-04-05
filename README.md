# Enquetinator
De enquetinator is een server side rendered enquete over de minor: Web Design & Devlopment van CMD Amsterdam. Omdat de site server side rendered is en Heroku geen free plan meer heeft :(, is de site niet live te bekijken. Volg [deze stappen](#Installatie) om de site lokaal te draaien.

## Testverslag

### Features
* [x] Server side rendered: 
	* HTML wordt op de server gegenereerd waardoor de core functionaliteit van de site werkt zonder Javascript

* [x] Functioneel zonder client side Javascript: 
	* De site werkt ook zonder Javascript en gebruikt alleen Javascript om de gebruikerservaring te verbeteren

* [x] Server side + client side validation: 
	* Per default worden forms door de server gevalideerd. Wanneer Javascript aan staat, wordt de validatie client side gedaan (en daarna server side)

* [x] Donker & licht thema: 
	* Donker en licht kleurenthema dmv. CSS variabelen en `prefers-color-scheme`

* [x] Extra getest op accessibility: 
	* De site is getest op accessibility en is dus ook te bedienen met het toetsenbord en andere handicaps

### Geteste browsers
* [x] Google Chrome V111.0.5563.146
* [x] Mozilla Firefox v111.0.1 (Linux Mint)
* [x] Lynx v2.9.0dev.10
* [x] Samsung Internet v20.0.3.10
* [x] Safari Desktop v16.2
* [x] Safari Mobile v16.3
* [x] Flow v6.9.0 (Linux Mint)

### Screenreader
Voor de screenreader test heb ik de standaard window narrator gebruikt. Ik liep al gauw tegen wat kleinere dingen aan zoals een `for` attribuut wat ik vergeten was in te vullen of een `label` die niet goed gekoppeld was aan een `input`. Een iets groter probleem wat ik tegenkwam is dat het scherm niet automatisch mee scrollde met de tabindex. Dit kwam omdat ik de radio button en checkmark inputs een position van `fixed` had gegeven om ze te verstoppen zodat alleen het label nog zichtbaar was. Dit heb ik opgelost door de inputs een positie van `absolute` te geven en ze de complete `height` te maken van de `label`. Hierdoor scrollt de browser wel automatisch naar de volgende input.

## Weekverslag

### Week 1

In week 1 ben ik begonnen met het opzetten van de structuur van mijn project. Dit heb ik gedaan door middel van een Express server, Handlebars view engine en typescript voor de server side code. Omdat deze site een server component heeft, kan de meeste Javascript al op de server worden uitgevoerd. Dit maakt het makkelijker om de site te laten werken wanneer client side Javascript is uitgeschakeld.

### Week 2

In week 2 ben ik verder gaan bouwen op de server side code van week 1. De logica voor het opslaan van de antwoorden per vak is geschreven. Hier hoef ik later alleen nog wat toevoegingen te doen om bepaalde velden / stukken optioneel te maken. Wanneer alles server side werkt zoals ik wil, ga ik client side Javascript toevoegen om de gebruikerservaring te verbeteren.

Verder ben ik deze week begonnen aan de styling. Omdat er zowel een dark als light thema moet komen, ben ik veel bezig geweest met kleuren kiezen. Hieronder een deel van mijn donker theme kleurenpallet, wat gedeeltelijk is gebaseerd op mijn [VSCode thema](https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night).

<p align="center">
	<img src="./public/readme-img/palette.png" alt="kleurenpalette">
</p>

### Week 3

In week 3 ben ik, naast het afronden van server side validation, begonnen aan de client side form validation. De validation werkt in principe hetzelfde, alleen is client side validation een stuk sneller omdat er niet op een server gewacht hoeft te worden. Verder heb ik de styling van de site afgemaakt. De site is zo responsive mogelijk en heeft (als het goed is) overal voldoende contrast.

Verder heb ik deze week veel puntjes op de i gezet door middel van veel testen. De site is in ieder geval werkend op [bovenstaande](#geteste-browsers) browsers. De site is ook getest op accessibility en dus geheel met het toetsenbord (en andere handicaps) te bedienen. In Google Lighthouse scoort de site 100% op alle vlakken behalve SEO.

## Installatie
1. Clone de repository
```bash
$ git clone git@github.com:Laurens256/web-app-from-scratch-2223.git
```

2. Navigeer naar de gedownloade folder
```bash
$ cd enquentinator
```

3. Installeer de nodige (dev)dependencies
```bash
$ npm i
```

4. Start de web-app
```bash
$ npm run dev
```

5. Open de web-app in je browser
```
http://localhost:3000/
```
