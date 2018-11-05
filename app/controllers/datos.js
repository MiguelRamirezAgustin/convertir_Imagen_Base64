
setTimeout(function(){

      var datosInformacion= Ti.App.Properties.getString('inform');
      var objetoProperties=JSON.parse(datosInformacion);

       
      var newObjeto=Object.keys(objetoProperties);
      var newValue=Object.values(objetoProperties);

      console.log('dato0_______'+objetoProperties);
       
      for(var i=0; i<newObjeto.length;  i++){

            var newText=newValue[i];
            newText=newText.replace('_', " ");
            newText=newText.replace('_', " ");
            
          
            var labelName = Ti.UI.createLabel({
                  color: "red",
                  height: Ti.UI.SIZE,
                  top: 10,
                  text: newValue[i],
                  left: 10,
                  textAlign: 'left' 
            });
            
            $.viewDatos.add(labelName);
      }

},2000)

