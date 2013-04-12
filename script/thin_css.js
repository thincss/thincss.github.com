YUI().use('node',function(Y) {
      var noused = Y.one('#noused'),
          nousadas = Y.one('#nousadas'),
          form = Y.one('.form-horizontal'), 
          DISPLAY = 'display',
          CLICK = 'click', 
          TEXT = 'text',
          CLASS = 'class';
      function activarNousadas() {
        nousadas.setStyle(DISPLAY,'inline');
        form.setStyle(DISPLAY,'none');
      }
      noused.on(CLICK,activarNousadas);
    });