
var viewImg= Ti.UI.createImageView({
	height:'80%',
	width:'90%',
	backgroundColor:"#F0FFFF",
	borderColor:"black",
	borderRadius:10,
	borderWidth:1,
	top:"20%"
});
$.viewImage.add(viewImg);


//Abrir Galeria y mostar foto 
function AbrirGaleria(){
	
	Titanium.Media.openPhotoGallery({
	 mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
	
		success: function(event){
			var cropRect= event.cropRect;
			Ti.API.info('formato'+ event.mediaType);
			console.log(event);
			
			if(event.mediaTypes==Ti.MEDIA_TYPE_PHOTO){
				var image= event.media;
				//Agregar a view la imagen 
				viewImg.setImage(event.media);
				//Convertir a base 64
				var imagenStrin=Ti.Utils.base64encode(image).toString();

				var jsonss= {
					source:imagenStrin
				  };

				 $.btnEnviar.addEventListener('click', function(){
					 var xhr=Ti.Network.createHTTPClient({
						 onload:function(e){
						  var result=JSON.parse(this.responseText);
						  console.log('Resultado_________ ',result);
                                      var informacion=JSON.stringify(result);
						  Ti.App.Properties.setString('inform', JSON.stringify(informacion));
						  Alloy.createController('datos', 'informacion').getView().open();

						 },
						 onsendstream: function(e){
                                       Ti.API.info('Enviar datos___', e.progress);
						 },
						 onerror:function(e){
                                       alert("Error\n", e.error);
						 },
						 timeout:10000
					  });
					       xhr.open('POST', 'https://ko7afa9vef.execute-api.us-east-2.amazonaws.com/SDA');
						 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						 xhr.send(JSON.stringify(jsonss));
				 });
                       
			}else{
				
			}
			Titanium.API.info('Descripcion \n:_______:    '+ cropRect.x + cropRect.y + cropRect.width + cropRect.height);
		},
	});
};


//captura foto

function CapturaFoto(e){
       if(!Ti.Media.hasCameraPermissions()){
		 Ti.Media.requestCameraPermissions(function(e){
                if(e.success){
			    camaraFotos();
		    }else{
			    Ti.API.error('No se puede tener permisos de la camara');
			    alert(e.error);
		    }
		 });
	 }else{
          camaraFotos();
	 };
};


var json64;

function camaraFotos(){
	Ti.Media.showCamera({
		//Permisos para la camara
		saveToPhotoGallery:true,
		allowEditing:false,
		autohide:false,
		success:function(event){
		var ImageFactory= require('ti.imagefactory');
		var image=event.media;
		viewImg.image=image;
			                 
		newBlob=ImageFactory.compress(image, 0.25);
		var img=Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'image.png');
		img.write(newBlob);
		 //convertir imagen a base64
		var base64=Ti.Utils.base64encode(newBlob).toString();
		//convertir base64 a json
		var json64={
			"source":base64
		};
		//json64=JSON.stringify(json64);
		//console.log("Datos", json64);
            $.btnEnviar.addEventListener('click', function(){
                var xhr=Ti.Network.createHTTPClient({
                 onload:function(e){

			var result=JSON.parse(this.responseText); //convertir result a objeto 1_
			console.log('Resultado_________ ',result)
			//alert(JSON.stringify(result));

			var informacion= JSON.stringify(result);//variable para convertir a cadena el objeto 2_

			Ti.App.Properties.setString('inform', JSON.stringify(informacion));
			 
			Alloy.createController('datos', 'informacion').getView().open();

		     },
		     onsendstream: function(e){
			Ti.API.info('______Enviando informaciòn:  ' + e.progress);
		     },
		     onerror: function(e){
                   alert("Error\n:"+ e.error);
		     },
		     timeout:10000
		    });
		    xhr.open('POST', 'https://ko7afa9vef.execute-api.us-east-2.amazonaws.com/SDA');
		    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		    xhr.send(JSON.stringify(json64));
		  });
	      /* Crear archivo txt y almacena la cadena de imgane a base_64
		var f=Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Demo.txt');
		f.write(json64);*/
		},
	});
};
 
$.index.open();
