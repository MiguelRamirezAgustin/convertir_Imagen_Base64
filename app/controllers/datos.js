
//Ti.App.Properties.setString('paramsPropertie', JSON.stringify(nombre = pasarParametros));


setTimeout(function(){

      var datosInformacion= Ti.App.Properties.getString('inform');
      var objetoProperties=JSON.parse(datosInformacion);

      console.log('dato0_______'+objetoProperties);
      console.log('Datos1____'+datosInformacion);

      
       
      alert(objetoProperties);

      /*var labelNombre=Ti.UI.createLabel({
            color:"black",
            top:'32%',
            height:Ti.UI.SIZE,
            text:'Nombre: '+objetoProperties.label,
            textAling:Ti.UI.TEXT_ALIGNMENT_CENTER,
      });*/

},2000)