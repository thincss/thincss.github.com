YUI_config = {
    useConsoleOutput: false,
    filter: 'debug',
    logExclude: {
        "autocomplete-base":1,
        'dom-screen': 1,
        'event-touch': 1,
        yui: 1,
        Selector: 1,
        node: 1,
        attribute: 1,
        event: 1,
        base: 1,
        loader: 1,
        get: 1,
        widget: 1,
        "event-valuechange":1,
         "event-base":1,
        "event-custom-complex":1,
        "autocomplete-base":1,
        "facade":1,
        cache:1,
        date: 1
    },
    debug: true,
    lang: 'es-VE',
};




var test = false,

    retrieves = { "2":{
                         querys:{
                                    categoryBase: '" and xpath=\'//table[@class="adsterix_set"]//tr',
                                    categoryFirst: '|//div[@id="flatMenu"]//a[last()]\'',
                                    categoryMore: '\'',
                                    article: '"and xpath=\'//div[@id=\"show-ad-left-block\"]|//div[@id=\"adwrap\"]//div[@class=\"text\"]//span[@class=\"showAdText\"]|//div[@id=\"contact\"]\''
                                },
                          test: {
                                    category:'yqlexample',
                                    article: 'yqlarticle',
                                    responseTime:1000
                                },
                          objectName: 'RevolRetrieve',
                          url: {
                                 defaultSearch:'resultado-de-la-busqueda.html?',
                                 category:'?'
                               }      
                         },
                  "1":{
                         querys:{
                                    categoryBase: '" and xpath=\'//div[@id="renglones"]',
                                    categoryFirst: '|//span[@id="TdPaginasUp"]//a//span[last()]\'',
                                    categoryMore: '\'',
                                    article: '"and xpath=\'//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelDetalles"]|//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelContacto"]|//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelTelefono"]|//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelMovil"]|//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelWeb"]|//div[@class="detalles_contenido"]//span[@id="ctl00_MainPlaceHolder_LabelDireccion"]\''
                                },
                         test:  {
                                    category:'',
                                    article:'',
                                    responseTime:10000
                                },
                         objectName: 'CubRetrieve',
                          url: {
                                 defaultSearch:'anuncios/',
                                 category:''
                               }                          
                         }
                },

    enableRetrieves = ['1']; 




