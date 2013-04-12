/**
 * @author russo and dariel
 */


YUI().use('node', 'event', function (Y) 
{ 
        var App = {};

      var output = Y.one('#output'),
          DISPLAY = 'display',
          CLICK = 'click', 
          TEXT = 'text',
          CLASS = 'class';



        App.config = {
            separatorChart: '\n',  //TODO: Esto funciona en el caso de Unix hay que ver si en Win tambien
            chartSize : 2
        };

        /**
         * @method clear
         * @description Retorna un JSON con los resultados de la operacion.
         * @param file {string} Fichero a comprimir
         * @param unused {string} Reglas CSS que no se estan usando
         * @return {JSON}
        */
        App.clear = function(file,unused){
          Y.log('llamando funcion limpiar');
          var size = 0,
              i = 0,
              cleared = file,
              removed = [],
              temp,
              before = file.length * App.config.chartSize,
              after,
              ratio;

          //separa las reglas css por un separador indicado en config
          unused = App.splitList(unused, App.config.separatorChart);

          //Es necesario que las reglas css tambien esten minificadas
          unused = App.minifyFormat(unused);

          //unused ahora tiene todas los selectores separados por coma
          size = unused.length;

          //para cada regla
          //TODO: Hay que optimizar este for
          for ( i; i < size; i++) {

            //machea en el file la regla
            if(unused[i]) {
              temp = App.match(cleared, unused[i]);
              cleared = temp.file;
              removed.push(temp.removed); 
            }

          };

          

          before = App.countKBytes(file);
          after = App.countKBytes(cleared);
          ratio =  100 - (after * 100)/before;
          ratio = ratio.toFixed(2);

          return {error: [], cleared: cleared, removed: removed, before: before+' bytes', after: after+' bytes', ratio: ratio + ' %'};
          


        }

        App.countKBytes = function(cadena) {
          var result = encodeURI(cadena).split(/%..|./).length - 1;
          
         // result = result / 1024;

          //para redondear
          //result=Math.round(result*100)/100  //returns 28.45
          
          //result = result.toFixed(2);
          return result;
        }

        /**
         * @method match
         * @description Machea una regla en el Fichero a Comprimir
         * @param file {string} Fichero donde esta la regla
         * @param selector {string} Regla CSS que hay que buscar
         * @return {JSON}
        */
        App.match = function(file, selector){
          //TODO: la primera regla no la va a encontrar nunca
          var match = '}' + selector + '{',
              size = match.length-1,
              index,
              last,
              iterator,
              buffer = '',
              fileSize = file.length,
              result = {removed: {}, file: ''},
              error;

          //Encontrar el primer caracter donde machea la regla
          index = file.indexOf(match);

          if(index > 0) {
              //Se mueve el iterador una pocision adelante para no comerse la llave de la regla anterior
              iterator = index + 1;

              //busco la proxima llave
              while (file[iterator] !== '}' && iterator < fileSize){

                //Se va llenando un buffer con el selector y sus reglas
                buffer += file[iterator];
                iterator++;
              
              }
              
              
              if (file[iterator] === '}') {

                //Se pone en el buffer la llave del final tambien
                buffer += file[iterator];

                //Se recoge lo que se removio para llevar la estadistica
                result.removed = {selector: selector, completed: buffer, error: error};

                //se remplaza con vacio la regla encontrada
                result.file = file.replace(buffer,'');

                index = result.file.indexOf(match);
          
                if(index > 0){
                  return App.match(result.file, selector);
                } else {
                  return result;
                }

              } else {
                //TODO: Se ,muestra un error fula
                Y.log('Hay problemas con ese fichero css');
                result.error = 'Hay problemas con ese fichero css';
                return result;
              }
          } else {
                //TODO: Se ,muestra un error fula
                Y.log('No hay reglas');
                result.error = 'No hay reglas';
                result.file = file;
                return result;            
          }

         
            
        }

        /**
         * @method minifyFormat
         * @description Minifica cada selector de la lista
         * @param list [] Lista de selectores
         * @return [] Lista de selectores minificada
        */
        App.minifyFormat = function(list){
          var i = 0,
              size = list.length;

          for (i; i < size; i++) {
            list[i] = App.minifySelector(list[i]);
          };

          return list;
        }

        /**
         * @method minifySelector
         * @description Minifica un selector CSS dado
         * @param list [] Lista de selectores
         * @return [] Lista de selectores minificada
        */
        App.minifySelector = function(item) {
          var result = '',
              expresions = [
                            {before:' + ', after:'+'}, 
                            {before:' > ', after:'>'},
                            {before:', ', after:','},
                            {before:' ::', after:'::'}
                           ],
              i = 0,
              size = expresions.length;
          
          //TODO: Ver que otras expresiones pueden aparecer 
          for (i; i < size; i++) {
            item = App.replaceAll(item, expresions[i].before,expresions[i].after);
          };

          return item;

        }

        /**
         * @method replaceAll
         * @description Remplaza todas las apariciones de un caracter dado en una cadena
         * @param cadena {string} Cadena de caracteres
         * @param find {string} SubCadena que se busca
         * @param replace {string} SubCadena de remplazo
         * @return [] cadena con las cosas remplazadas
        */
        App.replaceAll = function(cadena, find, replace) {
          
          //TODO: Este metodo hay que optimizarlo
          cadena = cadena.split(find);
          return cadena.join(replace);
        }

        //TODO: Ver si se puede poner el split directamente arriba
        App.splitList = function(lista, caracter){
          var result = [];
          result = lista.split(caracter);
          return result;
        }
      function verOut() {
        

         var unused = Y.one('#usused').get('value'),
             file = Y.one('#file').get('value'),
             result = {},
             removed,
             size,
             html = '',
             i = 0;
         
         //Se valida que no este vacio lo del archivo
         if (file) {
            result = App.clear(file,unused);

            if ( result.error.length > 0 ) {
              Y.log('Errores');
              Y.log(result.error);
            } else {
                Y.one('#result').set('value', result.cleared);

                //Se recorre la lista de removed para ir visualizando las reglas que se van quitando
                removed = result.removed;
                size = removed.length;

                  /*for ( i; i < size; i++) {

                    html += '<p>'+ removed[i].selector + '--' + removed[i].completed +'</p>'
                    

                  };*/
                 html = size + ' rules deleted';
                // Y.one('.rules').set('innerHTML',html);
                 
                 Y.one('#antes').set('text',result.before);
                 Y.one('#after_clean').set('text',result.after);
                 Y.one('#compression').set('text',result.ratio);         
            }



         } else {
           //Se muestra un error diciendo que debe poner eso
         }







        output.setStyle(DISPLAY,'inline');





      }
        Y.one('#continue').on(CLICK,verOut);

});
