const STORY_STOPS = [
  {
    num: '01',
    title: 'Nápad',
    paragraphs: [
      'Můj projekt začal, když jsem <em>hledala aplikaci</em>, která by mi pomohla projít eliminační dietou. Potřebovala jsem mít důležité informace na jednom místě, nemuset si všechno pamatovat a zároveň se v celém procesu neztratit.',
      '<em>Takovou aplikaci jsem nenašla.</em>',
      'Technologie mě vždy bavily a během mateřské mi zároveň začala chybět kreativita a možnost něco vytvářet. Napadlo mě proto, že bych si aplikaci mohla zkusit <em>vytvořit sama</em>.',
      'Neměla jsem zkušenosti s vývojem mobilních aplikací. Neuměla jsem žádný programovací jazyk.',
      'Ale měla jsem problém, který jsem chtěla vyřešit.',
      '<em>A tak jsem začala.</em>'
    ]
  },
  {
    num: '02',
    title: 'Od nápadu k prvnímu návrhu',
    paragraphs: [
      'Na začátku jsem neřešila technologie.',
      'V hlavě jsem si skládala, co by aplikace měla umět, jak by mohla celý proces zjednodušit a jaké informace by měl systém za uživatele hlídat.',
      'Postupně jsem <em>začala kreslit první obrazovky</em> a přemýšlet nad strukturou aplikace.',
      'K projektu jsem se několikrát vracela a zase od něj odcházela. Postupně ale vznikala konkrétnější představa o tom, jak by měl celý systém fungovat.',
      'První návrhy jsem vytvářela v <em>Adobe XD</em>.'
    ]
  },
  {
    num: '03',
    title: 'Musela jsem se to naučit sama',
    paragraphs: [
      'Když byl návrh dostatečně konkrétní, přišla další otázka:',
      '<em>V čem to vytvořím?</em>',
      'Vyhrál pro mě <em>Flutter</em>. Umožnil mi vytvářet aplikaci pro Android i iOS z jednoho kódu.',
      'Učila jsem se <em>Flutter a Dart</em> za pochodu. Hodně jsem používala YouTube, dokumentaci a ChatGPT. V té době ještě nebylo AI-asistované programování tak dostupné jako dnes, takže celý proces byl pomalejší a mnoho problémů jsem musela nejdřív sama pochopit, než jsem je dokázala vyřešit.',
      'První kroky byly velmi základní:',
      '<em>autentizace → databáze → první obrazovky → navigace → stav aplikace → první funkční programy.</em>',
      'Od začátku jsem chtěla, aby jeden účet fungoval na více zařízeních.',
      'Použila jsem proto:',
      { list: ['<em>Firebase Authentication</em> pro účty,', '<em>Cloud Firestore</em> pro data,', '<em>Firebase Storage</em> pro soubory,', '<em>GetX</em> pro správu stavu a další logiku aplikace.'] },
      'Současně jsem od začátku počítala s <em>češtinou i angličtinou</em>.'
    ]
  },
  {
    num: '04',
    title: 'Stavba prvního systému',
    paragraphs: [
      'Jedním z prvních problémů nebylo vytvořit samotnou obrazovku, ale zajistit, aby aplikace věděla, <em>v jakém stavu se uživatel nachází</em>.',
      'Například když měl uživatel aktivní určitý program a aplikaci restartoval, po opětovném spuštění se musel načíst správný program i jeho aktuální stav.',
      'Začala jsem proto pracovat s GetX controllery a postupně vytvářela vlastní strukturu controllerů, modelů a služeb.',
      'Jak aplikace rostla, přibývaly například:',
      { list: ['dietní programy,', 'testování alergenů,', 'seznam vlastních alergenů,', 'kalendář,', 'recepty,', 'blog,', 'notifikace,', 'předplatné,', 'analytika.'] },
      'A s každou další funkcí se zvyšovala potřeba jednotlivé části správně propojit.'
    ]
  },
  {
    num: '05',
    title: 'Když spolu funkce začaly mluvit',
    paragraphs: [
      'Jednou z komplexnějších částí bylo <em>testování alergenů</em>.',
      'Uživatel prochází jednotlivými kroky a aplikace si ukládá stav testování. Alergeny se podle aktuálního stavu mění a výsledek testu se musí propsat také do dalších částí aplikace.',
      'Pokud uživatel zaznamená reakci na určitý alergen, nemá zůstat pouze v testu.',
      'Musí se objevit také v jeho seznamu vlastních alergenů.',
      'To znamenalo propojit stav mezi různými částmi aplikace a zajistit, aby se změny správně propsaly nejen do databáze, ale také do právě otevřeného rozhraní.',
      'Právě na podobných problémech jsem začala chápat rozdíl mezi:',
      '<em>„umím vytvořit obrazovku“</em>',
      'a',
      '<em>„umím vytvořit fungující produkt“.</em>'
    ]
  },
  {
    num: '06',
    title: 'Problém s notifikacemi',
    paragraphs: [
      'Notifikace byly jedna z prvních věcí, která mě opravdu potrápila.',
      'Zpočátku jednoduše nefungovaly.',
      'Musela jsem řešit nastavení Androidu, manifest, oprávnění, timezone i samotné plánování notifikací.',
      'Postupně vznikl vlastní <code>NotificationService</code>, který podle aktuálního stavu aplikace notifikace ruší a znovu plánuje.',
      'Nešlo přitom pouze o jednu notifikaci. Aplikace pracuje s různými typy připomínek a jejich stav se může měnit podle toho, co uživatel v aplikaci udělá.',
      'Byla to pro mě jedna z prvních větších lekcí v tom, že některé funkce vypadají z pohledu designu velmi jednoduše, ale jejich implementace může být překvapivě komplexní.'
    ]
  },
  {
    num: '07',
    title: 'Kalendář, recepty a obsah',
    paragraphs: [
      'Další částí byl kalendář.',
      'Překvapivě nebyl tak složitý, jak jsem původně očekávala.',
      'Postupně jsem ho ale rozšiřovala o další možnosti záznamů a propojovala ho s ostatními částmi aplikace.',
      'Vznikla také sekce receptů a blogu.',
      'Pro správu obsahu jsem použila <em>Storyblok</em>, díky kterému mohu přidávat a upravovat články a recepty bez nutnosti měnit samotný kód aplikace.',
      'U receptů jsem navíc nechtěla pouze vytvořit statický seznam.',
      'Napojila jsem je na informace o dietě a alergenech, takže se obsah automaticky filtruje podle aktuálního nastavení uživatele.',
      'Tím začala vznikat jedna z důležitých vlastností celého produktu:',
      '<em>data z jedné části aplikace ovlivňují obsah v jiné části.</em>'
    ]
  },
  {
    num: '08',
    title: 'Z aplikace se stává produkt',
    paragraphs: [
      'V další fázi jsem začala řešit věci, které už nesouvisely pouze s funkcionalitou.',
      'Potřebovala jsem:',
      { list: ['oddělit placené a bezplatné funkce,', 'implementovat předplatné,', 'připravit onboarding,', 'měřit chování uživatelů,', 'sledovat technické problémy,', 'získávat feedback,', 'aplikaci otestovat a vydat.'] },
      'Pro předplatné jsem nakonec použila <em>RevenueCat</em>.',
      'Začala jsem také pracovat s <em>Firebase Analytics</em> a <em>Crashlytics</em>.',
      'Analytics mi umožňuje sledovat, jak se uživatelé aplikací pohybují a které části používají.',
      'Crashlytics zase sleduje technické problémy a pády aplikace.',
      'A protože analytika sama o sobě nevysvětlí všechno, vytvořila jsem také přímo v aplikaci stránku pro <em>feedback</em>, kde mohou uživatelé napsat, co se jim líbí, co jim chybí nebo kde narazili na problém.'
    ]
  },
  {
    num: '09',
    title: 'Co nefungovalo',
    paragraphs: [
      'Jedna z nejdůležitějších částí projektu přišla až poté, co aplikace začala fungovat.',
      'Zjistila jsem, že některé věci, které mi při návrhu připadaly užitečné, ve skutečnosti užitečné nebyly.',
      'Původně jsem vytvořila systém každodenního odškrtávání úkolů.',
      'Technicky fungoval.',
      'Uživatelé ho ale příliš nevyužívali.',
      'Místo toho, aby pomáhal, přidával další povinnost.',
      'Rozhodla jsem se proto každodenní úkoly odstranit.',
      'To byla pro mě důležitá produktová lekce:',
      '<em>Funkce není hodnotná jen proto, že funguje.</em>'
    ]
  },
  {
    num: '10',
    title: 'Od názvů funkcí k situacím uživatele',
    paragraphs: [
      'Změnila jsem také způsob, jakým uživatel vybírá jednotlivé programy.',
      'Původně jsem pracovala především s názvy programů.',
      'Později jsem si uvědomila, že uživatel nepřemýšlí v názvech funkcí.',
      'Přemýšlí o své situaci.',
      'Místo samotného názvu:',
      '<em>Hlavní podezřelí</em>',
      'jsem proto začala používat:',
      '<em>Hlavní podezřelí</em> — <em>Máte podezření na potravinovou alergii a nevíte, kde začít?</em>',
      'Tahle změna pomohla převést aplikaci z jazyka systému do jazyka uživatele.'
    ]
  },
  {
    num: '11',
    title: 'Redesign onboardingu',
    paragraphs: [
      'Největší změnou prošel onboarding.',
      'Původně měl především představit aplikaci.',
      'Později jsem ho začala používat jako způsob, jak zjistit, <em>v jaké situaci uživatel právě je</em>.',
      'Uživatel zadá informace o své situaci a aplikace je vyhodnotí pomocí předem definovaných pravidel a datového modelu.',
      'Na jejich základě vytvoří vyhodnocení a doporučí další postup.',
      'Po této změně jsem zaznamenala zvýšení počtu spuštěných trialů.'
    ]
  },
  {
    num: '12',
    title: 'Od pravidel k AI',
    paragraphs: [
      'Pravidla a datový model, které jsem vytvořila pro onboarding a rozhodování o dalším postupu, jsem následně využila také pro AI vyhodnocení.',
      'AI pracuje s informacemi, které uživatel během používání aplikace vytváří, a dokáže z nich připravit shrnutí jeho průběhu.',
      'Dokáže shrnout data, která uživatel zadal, a navrhnout mu další krok.'
    ]
  },
  {
    num: '13',
    title: 'Ze stránky alergenů uživatelský profil',
    paragraphs: [
      'Postupně jsem předělala také stránku s alergeny.',
      'Původně fungovala především jako seznam.',
      'Později jsem z ní vytvořila širší <em>uživatelský profil</em>, který obsahuje informace důležité pro další fungování aplikace a AI vyhodnocování.',
      'Uživatel zde může své údaje upravovat, spravovat vlastní alergeny a například si nastavit návštěvu lékaře včetně připomínky.',
      'Přidala jsem také další část procesu – <em>trénink</em>.',
      'Dietní programy, testování a trénink tak na sebe začaly navazovat.'
    ]
  },
  {
    num: '14',
    title: 'Jeden propojený systém',
    paragraphs: [
      'V této fázi už jsem aplikaci nevnímala jako soubor jednotlivých obrazovek.',
      'Začala jsem ji vnímat jako jeden propojený systém.',
      'Informace se mezi jednotlivými částmi aplikace přelévají a každá část může ovlivnit další.',
      'To je podle mě jeden z největších rozdílů mezi první verzí a produktem, který existuje dnes.',
      'Na začátku jsem přemýšlela především v jednotlivých obrazovkách.',
      'Dnes přemýšlím v <em>datech, stavech, návaznostech a celém uživatelském procesu</em>.'
    ]
  },
  {
    num: '15',
    title: 'Malé změny, které mění hodně',
    paragraphs: [
      'Během používání jsem začala hledat také malé momenty, které zbytečně zatěžují uživatele.',
      'Jedním z nich bylo <em>každodenní zapisování</em>.',
      'Pokud se několik dní po sobě nic zásadního nezmění, nedává smysl vyplňovat stále stejné informace od začátku.',
      'Přidala jsem proto možnost: <em>Zaznamenej den</em>. Uživatel může zkopírovat předchozí den a pouze upravit to, co je jinak.',
      'Kalendář jsem rozšířila o další typy záznamů a možnost exportovat data. Blog a recepty lze sdílet pomocí nativního sdílení.',
      'Současně jsem postupně upravovala vizuální podobu jednotlivých obrazovek a zpřehledňovala jejich strukturu.'
    ]
  },
  {
    num: '16',
    title: 'Sledování skutečného produktu',
    paragraphs: [
      'Po vydání aplikace jsem začala sledovat, co se skutečně děje.',
      '<em>Firebase Analytics</em> — sleduji chování uživatelů, průchod aplikací a využívání jednotlivých částí produktu.',
      '<em>Crashlytics</em> — pomáhá mi odhalovat technické problémy a pády aplikace.',
      '<em>Feedback</em> — uživatelé mohou přímo v aplikaci popsat problém, napsat návrh nebo říct, co se jim líbí.',
      'Tyto tři zdroje informací mi dávají mnohem lepší základ pro další rozhodování.'
    ]
  },
  {
    num: '17',
    title: 'Od prototypu k vydanému produktu',
    paragraphs: [
      'Projekt nakonec neopustil fázi návrhů ani prototypu.',
      'Prošel celým procesem:',
      '<em>nápad → UX/UI → vývoj → backend → obsah → monetizace → analytika → testování → release.</em>',
      'Aplikaci jsem vydala na <em>Google Play i App Store</em>.',
      'Dnes je funkční a veřejně dostupná.',
      'Celý produkt jsem vytvořila sama – od prvních návrhů přes vývoj a technickou infrastrukturu až po analytiku, testování, release a následné úpravy.'
    ]
  }
];
