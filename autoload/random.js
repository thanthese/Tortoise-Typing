/* " Author      : Leivince John Marte
// " Date        : September 2019
// " Version     : 1.0
// " Description : Added Random Words and Languages
*/

const fs = require('fs');
const process = require('process');

const randomWordsString = `{"english":["the","be","of","and","a","to","in","he","have","it","that","for","they","i","with","as","not","on","she","at","by","this","we","you","do","but","from","or","which","one","would","all","will","there","say","who","make","when","can","more","if","no","man","out","other","so","what","time","up","go","about","than","into","could","state","only","new","year","some","take","come","these","know","see","use","get","like","then","first","any","work","now","may","such","give","over","think","most","even","find","day","also","after","way","many","must","look","before","great","back","through","long","where","much","should","well","people","down","own","just","because","good","each","those","feel","seem","how","high","too","place","little","world","very","still","nation","hand","old","life","tell","write","become","here","show","house","both","between","need","mean","call","develop","under","last","right","move","thing","general","school","never","same","another","begin","while","number","part","turn","real","leave","might","want","point","form","off","child","few","small","since","against","ask","late","home","interest","large","person","end","open","public","follow","during","present","without","again","hold","govern","around","possible","head","consider","word","program","problem","however","lead","system","set","order","eye","plan","run","keep","face","fact","group","play","stand","increase","early","course","change","help","line"],"italian":["come","io","il","suo","che","lui","era","per","su","sono","con","essi","essere","a","uno","avere","questo","da","caldo","parola","ma","cosa","alcuni","è","esso","voi","o","aveva","il","di","a","e","un","in","noi","lattina","fuori","altro","erano","che","fare","loro","tempo","se","volontà","come","suddetto","un","ogni","dire","fa","set","tre","desiderare","aria","bene","anche","giocare","piccolo","fine","mettere","casa","leggere","mano","porto","grande","compitare","aggiungere","anche","terra","qui","mosto","grande","alto","tale","seguire","atto","perché","chiedere","maschi","cambiamento","è","andato","luce","tipo","spento","bisogno","casa","immagine","provare","noi","di","nuovo","animale","punto","madre","mondo","vicino","costruire","se","stesso","terra","padre","qualsiasi","nuovo","lavoro","parte","prendere","ottenere","posto","fatto","vivere","dove","dopo","indietro","poco","solo","turno","uomo","anno","è","venuto","spettacolo","ogni","buono","me","dare","il","nostro","sotto","nome","molto","attraverso","solo","forma","frase","grande","pensare","dire","aiutare","basso","linea","differire","turno","causa","molto","dire","prima","spostare","diritto","ragazzo","vecchio","troppo","stesso","lei","tutto","ci","quando","su","uso","il","tuo","modo","circa","molti","allora","loro","scrivere","sarebbe","come","così","queste","lei","lungo","rendere","cosa","vedere","lui","due","ha","guardare","di","più","giorno","potuto","andare","venire","ha","fatto","numero","suono","no","più","persone","il","mio","oltre","sapere","acqua","di","chiamata","primo","che","può","giù","lato","stato","ora","trovare"],"german":["die","der","und","in","zu","den","das","nicht","von","sie","ist","des","sich","mit","dem","dass","er","es","ein","ich","auf","so","eine","auch","als","an","nach","wie","im","für","man","aber","aus","durch","wenn","nur","war","noch","werden","bei","hat","wir","was","wird","sein","einen","welche","sind","oder","zur","um","haben","einer","mir","über","ihm","diese","einem","ihr","uns","da","zum","kann","doch","vor","dieser","mich","ihn","du","hatte","seine","mehr","am","denn","nun","unter","sehr","selbst","schon","hier","bis","habe","ihre","dann","ihnen","seiner","alle","wieder","meine","zeit","gegen","vom","ganz","einzelnen","wo","muss","ohne","eines","können","sei","ja","wurde","jetzt","immer","seinen","wohl","dieses","ihren","würde","diesen","sondern","weil","welcher","nichts","diesem","alles","waren","will","herr","viel","mein","also","soll","worden","lassen","dies","machen","ihrer","weiter","leben","recht","etwas","keine","seinem","ob","dir","allen","großen","jahre","weise","müssen","welches","wäre","erst","einmal","mann","hätte","zwei","dich","allein","herren","während","paragraph","anders","liebe","kein","damit","gar","hand","herrn","euch","sollte","konnte","ersten","deren","zwischen","wollen","denen","dessen","sagen","bin","menschen","gut","darauf","wurden","weiß","gewesen","seite","bald","weit","große","solche","hatten","eben","andern","beiden","macht","sehen","ganze","anderen","lange","wer","ihrem","zwar","gemacht","dort","kommen","welt","heute","frau","werde","derselben","ganzen","deutschen","lässt","vielleicht","meiner"],"spanish":["de","la","que","el","en","y","a","los","se","del","las","un","por","con","no","una","su","para","es","al","lo","como","más","o","pero","sus","le","ha","me","si","sin","sobre","este","ya","entre","cuando","todo","esta","ser","son","dos","también","fue","había","era","muy","años","hasta","desde","está","mi","porque","qué","sólo","han","yo","hay","vez","puede","todos","así","nos","ni","parte","tiene","él","uno","donde","bien","tiempo","mismo","ese","ahora","cada","e","vida","otro","después","te","otros","aunque","esa","eso","hace","otra","gobierno","tan","durante","siempre","día","tanto","ella","tres","sí","dijo","sido","gran","país","según","menos"],"chinese":["一","在","有","个","我","不","这","了","他","也","就","人","都","说","而","我们","你","了","要","会","对","及","和","与","以","很","种","的","大","能","着","她","那","上","但","年","还","可以","最","自己","为","来","所","他们","两","各","可","为","或","好","等","又","将","因为","于","由","从","更","被","才","已","者","每","次","把","三","什么","问题","其","让","此","做","再","所以","只","与","则","台湾","却","并","位","想","去","呢","学生","表示","到","公司","将","如果","社会","看","小","天","因此","新","但是","它","中","使","工作","全","觉得","使用","这些","里","并","由于","时候","知道","这样","一","认为","时间","事","过","向","可能","中国","美国","到","和","几","系统","政府","大家","国家","许多","生活","跟","已经","大学","研究","因","本","二","活动","该","世界","应","四","希望","方式","内","项","啊","下","环境","一些","必须","文化","高","孩子","没有","不能","如","开始","元","不同","仍","网路","日本","用","中心","来","对","虽然","重要","地方","进行","关系","市场","太","老师","提供","学校","应该","指出","经济","其他","家","发展","教育","成为","多","非常","便","方面","很多","吃","然后","未","发现","电脑","一样","而且","心","不过","无法","企业"],"korean":["것","하다","있다","수","하다","나","없다","않다","사람","우리","그","아니다","보다","거","보다","같다","주다","대하다","가다","년","한","말","일","이","말하다","위하다","그러나","오다","알다","씨","그렇다","크다","일","사회","많다","안","좋다","더","받다","그것","집","나오다","그리고","문제","그런","살다","저","못하다","생각하다","모르다","속","만들다","데","앞","경우","중","어떤","잘","그녀","먹다","자신","문화","원","생각","어떻다","명","통하다","그러다","그러다","소리","다시","다른","이런","여자","개","정도","다","좀","싶다","보이다","가지다","함께","아이","지나다","많이","시간","너","인간","사실","나다","이렇다","어머니","눈","뭐","점","의하다","시대","다음","이러하다","누구","곳","여러","안","하나","세계","버리다","위","운동","퍼센트","학교","자기","가장","대통령","가지","시작하다","바로","어느","그래서","무엇","정부","모든","번","그거","돈","국가","그런데","날","여기","모두","여성","친구","마음","후","놓다","관계","아버지","남자","어디","몸","얼굴","왜","나타나다","지역","다르다","모습","물","만나다","내다","보이다","쓰다","이것","없이","이번","길","생활","쓰다","뿐","사이","방법","새롭다","내다","앉다","처음","손","몇","그때","과정","삶","갖다","찾다","특히","시","이상","지금","나가다","이야기","교육","사다","경제","아직","잡다","같이","선생님","예술","서다","못","역사","읽다","결과","내용","물론","책","일어나다","당신","시장","넣다","중요하다","무슨","느끼다","어렵다"],"english1000":["as","i","his","that","he","was","for","on","are","with","they","be","at","one","have","this","from","by","hot","word","but","what","some","is","it","you","or","had","the","of","to","and","a","in","we","can","out","other","were","which","do","their","time","if","will","how","said","an","each","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","she","all","there","when","up","use","your","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","street","inch","multiply","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible","plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill","east","paint","language","among","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave","green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","space","heard","best","hour","better","true","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","energy","hunt","probable","bed","brother","egg","ride","cell","believe","perhaps","pick","sudden","count","square","reason","length","represent","art","subject","region","size","vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","fraction","forest","sit","race","window","store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument","kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower","clothe","strange","gone","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean","break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell","fit","flow","fair","bank","collect","save","control","decimal","ear","else","quite","broke","case","middle","kill","son","lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress","cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease","hole","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held","hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand","soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","capital","won't","chair","danger","fruit","rich","thick","soldier","process","operate","practice","separate","difficult","doctor","please","protect","noon","crop","modern","element","hit","student","corner","party","supply","whose","locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","bone","rail","imagine","provide","agree","thus","gentle","woman","captain","guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar","stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print","dead","spot","desert","suit","current","lift","rose","arrive","master","track","parent","shore","division","sheet","substance","favor","connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market","degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth","shell","neck","oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister","steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening","condition","feed","tool","total","basic","smell","valley","nor","double","seat","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term","opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop","stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent"],"polish":["się","i","w","nie","na","z","do","to","że","a","o","jak","ale","po","co","tak","za","od","go","już","jego","jej","czy","przez","tylko","tego","sobie","jeszcze","może","ze","kiedy","pan","ich","dla","by","gdy","teraz","ja","ten","który","nawet","bardzo","przed","tu","jednak","pod","coś","tam","wszystko","przy","więc","nic","bo","nim","żeby","miał","on","być","potem","też","jeśli","bez","nad","gdzie","lecz","siebie","nigdy","ani","właśnie","sam","u","dobrze","niż","jakby","aby","ty","oczy","zawsze","raz","były","no","albo","gdyby","aż","wtedy","przecież","ona","drzwi","jako","chyba","nagle","wszyscy","jeden","czym","kto","sposób","czas","kilka","dlaczego","razem","także","mój","nikt","choć","wiele","dwa","ktoś","lub","trzeba","niech","ku","twarz","którego","we","znowu","człowiek","jakiś","tutaj","szybko","tyle","głos","między","wreszcie","również","życie","oczywiście","znów","swoje","dlatego","zbyt","ciebie","zupełnie","taki","czego","iż","dopiero","powiedzieć","obok","prawie","poza","zaś","wciąż","jeżeli","moje","prawda","trzy","dzień","miejsce","mimo","ponieważ","zaraz","długo","coraz","podczas","natychmiast","zanim","cóż","każdy","zrobić","ojciec","my","dość","oraz","jaki","stanie","wcale","wśród","mieć","zresztą","dziś","ile","chociaż","gdyż","kiedyś","swój","jedynie","pewno","nieco","niemal","gdzieś","jedno","wokół","powoli","wrażenie","matka","świat","kobieta","skąd","myśl","stary","dużo","drogi","nadal","drugi","bowiem","przynajmniej","pewnie","często","razy","mężczyzna","dokładnie","niczego","mówić","dzięki","pewien","widać","cicho","właściwie","rzecz","wolno","oto","ciało","czasem","wiedzieć","stąd","wkrótce","dół","pół","noc","całkiem","wówczas","dom","wzrok","mocno","trudno","dziewczyna","dziecko","skoro","wobec","śmierć","rzeczywiście","koniec","tuż","daleko","pięć","serce","spokojnie","czegoś","wielki","dłoń","część","najpierw","mało","temat","włosy","wraz","usta","widok","równie","ponad"]}`

const randomWords = JSON.parse(randomWordsString);
const args = process.argv;
let wordList = [];
const wordCount = args[2] || 150
const language = args[3] || "english"
const data = randomWords[language] || randomWords.english;
while (wordList.length < wordCount) {
  const randomWord = data[Math.floor(Math.random() * data.length)];
  if (
    wordList[wordList.length - 1] !== randomWord ||
    wordList[wordList.length - 1] === undefined
  ) {
    wordList.push(randomWord);
  }
}

if (args[4] !== undefined && args[4] === 'punc') {
  if (wordList[0] !== undefined) {
    // Capitalize first word
    wordList[0] = wordList[0][0].toUpperCase() + wordList[0].slice(1);

    // Add comma, fullstop, question mark, exclamation mark, semicolon. Capitalize the next word
    for (i = 0; i < wordList.length; i++) {
      const ran = Math.random();
      if (i < wordList.length - 1) {
        if (ran < 0.03) {
          wordList[i] += ',';
        } else if (ran < 0.05) {
          wordList[i] += '.';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.06) {
          wordList[i] += '?';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.07) {
          wordList[i] += '!';
          wordList[i + 1] = wordList[i + 1][0].toUpperCase() + wordList[i + 1].slice(1);
        } else if (ran < 0.08) {
          wordList[i] += ';';
        }
      }
    }
    wordList[wordList.length - 1] += '.';

    // Add quotation marks
  }
}
const writeData = wordList.join(' '); 

// write data to file sample.html
fs.writeFile('/tmp/typings.random',writeData,
    // callback function that is called after writing file is done
    function(err) { 
        if (err) throw err;
        // if no error
        console.log("Data is written to file successfully.")
}); 
