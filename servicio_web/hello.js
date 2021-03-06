$(document).ready(function() {
    var a = [
          { data: { id: 'j', name: 'Jerry' } },
          { data: { id: 'e', name: 'Elaine' } },
          { data: { id: 'k', name: 'Kramer' } },
          { data: { id: 'g', name: 'George' } }
        ]
        console.log(a)
    $('#cy').cytoscape({
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(name)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle'
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
      
      elements: {
        nodes: a,
        edges: [
          { data: { source: 'j', target: 'e' } },
          { data: { source: 'j', target: 'k' } },
          { data: { source: 'j', target: 'g' } },
          { data: { source: 'e', target: 'j' } },
          { data: { source: 'g', target: 'j' } }
        ]
      },
      
      ready: function(){
        window.cy = this;
        
        // giddy up...
        
        cy.elements().unselectify();
        
        cy.on('tap', 'node', function(e){
          var node = e.cyTarget; 
          var neighborhood = node.neighborhood().add(node);
          
          cy.elements().addClass('faded');
          neighborhood.removeClass('faded');
        });
        
        cy.on('tap', function(e){
          if( e.cyTarget === cy ){
            cy.elements().removeClass('faded');
          }
        });
      }
    });

    $("#Consultar").click(function(){

        console.log("Consultar")
        var nombre = $('#txt_Nombre').val();
        var pais = $('#txt_Pais').val();
        var fini = $('#txt_FechaIni').val();
        var ffin = $('#txt_FechaFin').val();
        console.log("txt_Nombre " + nombre)
        console.log("txt_Pais " + pais)
        console.log("txt_FechaIni " + fini)
        console.log("txt_FechaFin " + ffin)
        url_post = "http://mine4102-3.virtual.uniandes.edu.co:8080/dar_objeto_consulta"
	    var jsonData = "{\"nombre\":\""+nombre+"\",\"pais\":\""+pais+"\",\"fini\":\""+fini+"\",\"ffin\":\""+ffin+"\"}";
        console.log(url_post)
        console.log("JSON: "+jsonData)
        $.ajax({
	type: "POST",
  	data: jsonData,
    	contentType: "application/json; charset=utf-8",
  	dataType: "json",
        url: url_post
        }).then(function(data) {
            console.log("data: " + data)
            console.log(data.personas)
            console.log(data.relaciones)
            console.log("FORTALEZA: ")
            console.log(data.fortaleza)
            for(var i = 0; i < data.fortaleza.length; i++){
                var elem = data.fortaleza[i]
                console.log(elem)
               $('#resultado_text').append( "<p>"+elem.pais1 +" y "+elem.pais2+" peso:"+elem.peso+"</p>" );
           }
        console.log("txt_Nombre " + nombre)
        console.log("txt_Nombre " + nombre)

        //var personas_grafo = [
          //{ data: { id: 'k', name: 'Kramer' } },
          //{ data: { id: 'g', name: 'George' } }
        //]
        var personas_grafo = data.personas
        console.log(personas_grafo)
        //var links_grafos = [
          //{ data: { source: 'g', target: 'k' } }
        //]
        var links_grafos = data.relaciones
        console.log(links_grafos)
        $('#cy').cytoscape({
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(name)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle'
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
      elements: {
        nodes: personas_grafo,
        edges: links_grafos
      },
      
      ready: function(){
        window.cy = this;
        
        // giddy up...
        
        cy.elements().unselectify();
        
        cy.on('tap', 'node', function(e){
          var node = e.cyTarget; 
          var neighborhood = node.neighborhood().add(node);
          
          cy.elements().addClass('faded');
          neighborhood.removeClass('faded');
        });
        
        cy.on('tap', function(e){
          if( e.cyTarget === cy ){
            cy.elements().removeClass('faded');
          }
        });
      }
    });
    });
    });
});


