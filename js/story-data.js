const STORY_STOPS = [
  {
    num: '01',
    title: 'Nápad',
    paragraphs: [
      'Můj projekt začal, když jsem <em>hledala aplikaci</em>, která by mi pomohla projít eliminační dietou – a nenašla jsem žádnou, která by mi opravdu vyhovovala.',
      'Technologie mě vždy bavily a během mateřské mi začala chybět kreativita. Napadlo mě, že bych si takovou aplikaci mohla zkusit <em>vytvořit sama</em> – i bez zkušeností a bez znalosti programovacího jazyka.'
    ],
    insight: {
      title: 'Neuměla jsem programovat. Ale měla jsem problém, který jsem chtěla vyřešit.',
      body: 'A to nakonec stačilo, abych začala.'
    }
  },
  {
    num: '02',
    title: 'Od nápadu k prvnímu návrhu',
    images: [
      { src: 'assets/img/story/xd1.jpg', alt: 'První návrh aplikace v Adobe XD', side: 'left', wide: true },
      { src: 'assets/img/story/xd2.jpg', alt: 'První návrh aplikace v Adobe XD', side: 'right', wide: true }
    ],
    paragraphs: [
      'Na začátku jsem neřešila technologie. V hlavě jsem si skládala, co by aplikace měla umět, jak by mohla celý proces zjednodušit a jaké informace by za uživatele měla hlídat.',
      'Postupně jsem <em>začala kreslit první obrazovky</em> v Adobe XD a přemýšlet nad strukturou celého systému – i s několika přestávkami mezi tím.'
    ],
    insight: {
      title: 'K projektu jsem se několikrát vracela a zase od něj odcházela.',
      body: 'Ale pokaždé s konkrétnější představou, jak by měl celý systém fungovat.'
    }
  },
  {
    num: '03',
    title: 'Musela jsem se to naučit sama',
    paragraphs: [
      'Když byl návrh dostatečně konkrétní, přišla další otázka: v čem to vytvořím? Vyhrál pro mě <em>Flutter</em> – umožnil mi stavět aplikaci pro Android i iOS z jednoho kódu.',
      'Učila jsem se Flutter a Dart za pochodu, hlavně přes YouTube, dokumentaci a ChatGPT. AI-asistované programování ještě nebylo tak dostupné jako dnes, takže jsem si spoustu věcí musela nejdřív sama pochopit.'
    ],
    insight: {
      title: 'autentizace → databáze → první obrazovky → navigace → stav aplikace → první funkční programy',
      body: 'Takhle vypadaly úplně první kroky – a od začátku jsem chtěla, aby jeden účet fungoval na více zařízeních.'
    },
    features: [
      { icon: 'flame', title: 'Firebase', body: 'Authentication, Firestore a Storage pro účty, data i soubory.' },
      { icon: 'gear', title: 'GetX', body: 'Správa stavu a další logika aplikace.' },
      { icon: 'globe', title: 'Čeština a angličtina', body: 'Obě jazykové verze od úplného začátku.' }
    ]
  },
  {
    num: '04',
    title: 'Stavba prvního systému',
    paragraphs: [
      'Jedním z prvních problémů nebylo vytvořit obrazovku, ale zajistit, aby aplikace věděla, <em>v jakém stavu se uživatel nachází</em> – a aby to fungovalo správně i po úplném restartu.',
      'Začala jsem proto pracovat s GetX controllery a postupně stavěla vlastní strukturu controllerů, modelů a služeb. Jak aplikace rostla, přibývaly další a další části, které bylo potřeba mezi sebou správně propojit.'
    ],
    insight: {
      title: 'Dietní programy, testování alergenů, kalendář, recepty, blog, notifikace, předplatné, analytika…',
      body: 'S každou další funkcí rostla i potřeba, aby spolu jednotlivé části skutečně mluvily.'
    }
  },
  {
    num: '05',
    title: 'Když spolu funkce začaly mluvit',
    images: [
      { src: 'assets/img/story/pretest.jpg', alt: 'Testování alergenů před update designem', side: 'left' },
      { src: 'assets/img/story/test.jpg', alt: 'Testování alergenů po update designu', side: 'right' }
    ],
    paragraphs: [
      'Jednou z komplexnějších částí bylo <em>testování alergenů</em>. Uživatel prochází jednotlivými kroky, aplikace ukládá stav testování a výsledek se musí propsat i do dalších částí aplikace.',
      'Pokud uživatel zaznamená reakci na alergen, nesmí zůstat jen v testu – musí se objevit i v jeho seznamu vlastních alergenů. To znamenalo propojit stav mezi několika částmi aplikace najednou.'
    ],
    insight: {
      title: '„Umím vytvořit obrazovku“ a „umím vytvořit fungující produkt“ nejsou totéž.',
      body: 'Právě na podobných propojeních jsem ten rozdíl začala skutečně chápat.'
    }
  },
  {
    num: '06',
    title: 'Problém s notifikacemi',
    paragraphs: [
      'Notifikace byly jedna z prvních věcí, která mě opravdu potrápila. Zpočátku jednoduše nefungovaly – musela jsem řešit nastavení Androidu, manifest, oprávnění i časová pásma.',
      'Postupně vznikl vlastní <code>NotificationService</code>, který podle aktuálního stavu aplikace notifikace ruší a znovu plánuje – protože jde o řadu různých typů připomínek, ne jen jednu.'
    ],
    insight: {
      title: 'Některé funkce vypadají v designu jednoduše.',
      body: 'Jejich implementace ale může být překvapivě komplexní – a notifikace byly moje první velká lekce v tomhle.'
    }
  },
  {
    num: '07',
    title: 'Kalendář, recepty a obsah',
    images: [
      { src: 'assets/img/story/prerecept.jpg', alt: 'Recept před update designem', side: 'left' },
      { src: 'assets/img/story/recept.jpg', alt: 'Recept po update designu', side: 'right' }
    ],
    paragraphs: [
      'Další částí byl kalendář. Překvapivě nebyl tak složitý, jak jsem původně očekávala.',
      'Postupně jsem ho ale rozšiřovala o další možnosti záznamů a propojovala ho s ostatními částmi aplikace. Vznikla také sekce receptů a blogu.',
      'Pro správu obsahu používám <em>Storyblok</em>, díky kterému mohu přidávat články a recepty bez zásahu do kódu – a recepty se navíc automaticky filtrují podle diety a alergenů uživatele.'
    ],
    insight: {
      title: 'Nechtěla jsem vytvořit jen statický seznam receptů.',
      body: 'Chtěla jsem, aby obsah byl praktický, personalizovaný a skutečně užitečný i v každodenním životě.'
    },
    features: [
      { icon: 'calendar', title: 'Kalendář', body: 'Záznamy o jídle, pokožce a alergenech.' },
      { icon: 'recipe', title: 'Recepty', body: 'Filtrované podle alergenů a aktuálního nastavení.' },
      { icon: 'document', title: 'Blog', body: 'Ověřené informace a tipy pro rodiče.' }
    ]
  },
  {
    num: '08',
    title: 'Z aplikace se stává produkt',
    paragraphs: [
      'V další fázi jsem začala řešit věci, které už nesouvisely jen s funkcionalitou – oddělit placené a bezplatné funkce, připravit onboarding, změřit chování uživatelů a aplikaci konečně otestovat a vydat.',
      'Pro předplatné jsem použila <em>RevenueCat</em>. Souběžně jsem začala pracovat s <em>Firebase Analytics</em> a <em>Crashlytics</em>, abych viděla, jak se uživatelé v aplikaci pohybují a kde se něco rozbije.'
    ],
    insight: {
      title: 'Analytika sama o sobě nevysvětlí všechno.',
      body: 'Proto jsem přidala přímo do aplikace stránku pro feedback, kam mi uživatelé mohou napsat, co jim chybí nebo co se jim líbí.'
    }
  },
  {
    num: '09',
    title: 'Co nefungovalo',
    images: [
      { src: 'assets/img/story/prehlavni.jpg', alt: 'Hlavní program ještě s každodenními úkoly', side: 'right' },
      { src: 'assets/img/story/hlavni.jpg', alt: 'Hlavní program po odstranění úkolů', side: 'right' }
    ],
    paragraphs: [
      'Jedna z nejdůležitějších částí projektu přišla až poté, co aplikace začala fungovat – zjistila jsem, že některé věci, které mi při návrhu připadaly užitečné, ve skutečnosti užitečné nebyly.',
      'Typickým příkladem byl systém každodenního odškrtávání úkolů. Technicky fungoval, ale uživatelé ho příliš nevyužívali – místo aby pomáhal, přidával další povinnost. Nakonec jsem ho odstranila.'
    ],
    insight: {
      title: 'Funkce není hodnotná jen proto, že funguje.',
      body: 'Musí mít skutečný důvod, proč v produktu existuje.'
    }
  },
  {
    num: '10',
    title: 'Od názvů funkcí k situacím uživatele',
    paragraphs: [
      'Změnila jsem způsob, jakým uživatel vybírá jednotlivé programy. Původně jsem pracovala hlavně s názvy funkcí – později jsem si uvědomila, že uživatel nepřemýšlí v názvech, ale ve své situaci.'
    ],
    insight: {
      title: '„Hlavní podezřelí“ se stal → „Máte podezření na potravinovou alergii a nevíte, kde začít?“',
      body: 'Tahle změna pomohla převést aplikaci z jazyka systému do jazyka uživatele.'
    }
  },
  {
    num: '11',
    title: 'Redesign onboardingu',
    images: [
      { src: 'assets/img/story/onboard.jpg', alt: 'Onboarding po redesignu', side: 'left' }
    ],
    paragraphs: [
      'Největší změnou prošel onboarding. Původně měl hlavně představit aplikaci – později jsem ho začala používat jako způsob, jak zjistit, <em>v jaké situaci uživatel právě je</em>.',
      'Uživatel zadá informace o své situaci a aplikace je vyhodnotí podle předem definovaných pravidel a datového modelu, na jejichž základě doporučí další postup.'
    ],
    insight: {
      title: 'Po této změně vzrostl počet spuštěných trialů.',
      body: 'Pro mě to byl jasný signál, že onboarding už nebyl jen formalita.'
    }
  },
  {
    num: '12',
    title: 'Od pravidel k AI',
    images: [
      { src: 'assets/img/story/ai.jpg', alt: 'Implementace AI vyhodnocení v aplikaci', side: 'right' }
    ],
    paragraphs: [
      'Pravidla a datový model, které jsem vytvořila pro onboarding a rozhodování o dalším postupu, jsem následně využila i pro AI vyhodnocení.'
    ],
    insight: {
      title: 'AI pracuje s daty, která uživatel v aplikaci sám vytváří.',
      body: 'Dokáže z nich připravit shrnutí průběhu a navrhnout další krok.'
    }
  },
  {
    num: '13',
    title: 'Ze stránky alergenů uživatelský profil',
    images: [
      { src: 'assets/img/story/export.jpg', alt: 'Export záznamů pro lékaře', side: 'left' }
    ],
    paragraphs: [
      'Postupně jsem předělala i stránku s alergeny. Původně fungovala hlavně jako seznam – později jsem z ní vytvořila širší <em>uživatelský profil</em> s informacemi důležitými pro další fungování aplikace i AI vyhodnocování.',
      'Uživatel zde může upravovat údaje, spravovat vlastní alergeny a nastavit si třeba návštěvu lékaře i s připomínkou. Přidala jsem také další část procesu – <em>trénink</em>, který navazuje na programy a testování.'
    ],
    insight: {
      title: 'Dietní programy, testování a trénink na sebe začaly navazovat.',
      body: 'Ze samostatných funkcí se stal jeden souvislý proces.'
    }
  },
  {
    num: '14',
    title: 'Jeden propojený systém',
    images: [
      { src: 'assets/img/story/premain.jpg', alt: 'Hlavní obrazovka před update', side: 'left' },
      { src: 'assets/img/story/main.jpg', alt: 'Hlavní obrazovka po update', side: 'right' }
    ],
    paragraphs: [
      'V této fázi jsem aplikaci přestala vnímat jako soubor jednotlivých obrazovek. Informace se mezi jejími částmi přelévají a každá může ovlivnit další.'
    ],
    insight: {
      title: 'To je jeden z největších rozdílů mezi první verzí a produktem, který existuje dnes.',
      body: 'Na začátku jsem přemýšlela v obrazovkách. Dnes přemýšlím v <em>datech, stavech a celém uživatelském procesu</em>.'
    }
  },
  {
    num: '15',
    title: 'Malé změny, které mění hodně',
    images: [
      { src: 'assets/img/story/log.jpg', alt: 'Zaznamenání dne', side: 'right' }
    ],
    paragraphs: [
      'Během používání jsem začala hledat i malé momenty, které uživatele zbytečně zatěžují – třeba každodenní zapisování stále stejných informací od začátku.',
      'Přidala jsem proto tlačítko <em>Zaznamenej den</em>, kterým si uživatel zkopíruje předchozí záznam a upraví jen to, co se změnilo. Kalendář jsem rozšířila o další typy záznamů, export dat a možnost sdílet blog i recepty.'
    ],
    insight: {
      title: 'Zaznamenej den.',
      body: 'Malá změna, která ušetří pár vteřin – ale dělá to každý den.'
    }
  },
  {
    num: '16',
    title: 'Sledování skutečného produktu',
    paragraphs: [
      'Po vydání aplikace jsem začala sledovat, co se skutečně děje.'
    ],
    features: [
      { icon: 'chart', title: 'Firebase Analytics', body: 'Chování uživatelů a využívání jednotlivých částí.' },
      { icon: 'bug', title: 'Crashlytics', body: 'Technické problémy a pády aplikace.' },
      { icon: 'chat', title: 'Feedback', body: 'Co uživatelé přímo v aplikaci napíšou.' }
    ],
    insight: {
      title: 'Tyto tři zdroje mi dávají mnohem lepší základ pro rozhodování.',
      body: 'Než kdybych se spoléhala jen na vlastní odhad.'
    }
  },
  {
    num: '17',
    title: 'Od prototypu k vydanému produktu',
    paragraphs: [
      'Projekt nakonec neopustil fázi návrhů ani prototypu – prošel celým procesem:',
      '<em>nápad → UX/UI → vývoj → backend → obsah → monetizace → analytika → testování → release.</em>'
    ],
    insight: {
      title: 'Aplikaci jsem vydala na Google Play i App Store.',
      body: 'Dnes je funkční, veřejně dostupná – a celou jsem ji od návrhu po release vytvořila sama.'
    }
  }
];
