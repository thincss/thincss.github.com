YUI().use('node',function(Y) {
      var contacte = Y.one('#modalContacte'),
          inicio = Y.one('#inicio'), 
          acerca = Y.one('#modalAcerca'), 
          divContacte = Y.one('#myEmail'), 
          divInicio = Y.one('.jumbotron'), 
          divAcerca = Y.one('#myModal'), 
          DISPLAY = 'display',
          CLICK = 'click', 
          TEXT = 'text',
          CLASS = 'class';
      function activarContacte() {
        divContacte.setStyle(DISPLAY,'inline');
        divInicio.setStyle(DISPLAY,'none');
        divAcerca.setStyle(DISPLAY,'none');
        contacte.setAttribute(CLASS,'active');
        inicio.setAttribute(CLASS,'');
        acerca.setAttribute(CLASS,'');
      }
      function activarInicio() {
        divContacte.setStyle(DISPLAY,'none');
        divInicio.setStyle(DISPLAY,'inline');
        divAcerca.setStyle(DISPLAY,'none');
        contacte.setAttribute(CLASS,'');
        inicio.setAttribute(CLASS,'active');
        acerca.setAttribute(CLASS,'');
      }
      function activarAcerca() {
        divContacte.setStyle(DISPLAY,'none');
        divInicio.setStyle(DISPLAY,'none');
        divAcerca.setStyle(DISPLAY,'inline');
        contacte.setAttribute(CLASS,'');
        inicio.setAttribute(CLASS,'');
        acerca.setAttribute(CLASS,'active');
      }
      contacte.on(CLICK,activarContacte);
      inicio.on(CLICK,activarInicio);
      acerca.on(CLICK,activarAcerca);
    });