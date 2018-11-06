
var args=$.args;


setTimeout(function(){

     var DatosObjeto=args.response;  

     var formatoObjeto= DatosObjeto;
      
     console.log('informe json____'+ formatoObjeto);

 // for (var i=0; i<formatoObjeto.length; i++){

      var  labeltitulo=Ti.UI.createLabel({
         color:"white",
         top:"3%",
         textAling:Titanium.UI.TEXT_ALIGNMENT_CENTER,
         text:"INFORMACIÒN",
         font:{
               fontSize:18
         }
      });
      var labelNombre =Ti.UI.createLabel({
            color:"white",
            top:"7%",
            left:"5%",
            text:'NOMBRE: ' + formatoObjeto.data[0].value,
            height:Ti.UI.SIZE,
      });

      var labelDomicilio=Ti.UI.createLabel({
            color:"white",
            top:"10",
            left:"5%",
            text:'DOMICILIO: ' + formatoObjeto.data[1].value,
      });

      var labelClave= Ti.UI.createLabel({
           color:"white",
           top:10,
           left:"5%",
           text:"CURP: "+formatoObjeto.data[2].value
      });

      var labeltext = Ti.UI.createLabel({
            color: "white",
            height: Ti.UI.SIZE,
            top:"15",
            text:''+formatoObjeto.text,
            left:"5%",
            textAling:Titanium.UI.TEXT_ALIGNMENT_JUSTIFY,
      });
      
      $.scrollview.add(labeltitulo);
      $.scrollview.add(labelNombre);
      $.scrollview.add(labelDomicilio);
      $.scrollview.add(labelClave);
      $.scrollview.add(labeltext);

  //}
},2000)




