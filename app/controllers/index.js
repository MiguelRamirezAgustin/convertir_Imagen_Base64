
var viewImg= Ti.UI.createImageView({
	height:'90%',
	width:'70%',
	backgroundColor:"#F0FFFF",
	borderColor:"black",
	borderRadius:10,
	borderWidth:1,
	top:"5%"
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
				var imagenStrin=Ti.Utils.base64encode(image,'utf8').toString();
				
				console.log("Base 64:\n____   "+ imagenStrin);


                        /*Alerta para mostar codigo de base 64 
				setTimeout(function(e){
				 var al=	alert('images:   ' +JSON.stringify(imagenStrin));
				 console.log('images:   ' +JSON.stringify(imagenStrin));
				 console.log(al);
				},1000);*/
			
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


function camaraFotos(){
	Ti.Media.showCamera({
		//Permisos para la camara
		saveToPhotoGallery:true,
		allowEditing:false,
		autohide:false,

		success:function(event){
		    var image=event.media;
		    viewImg.image=event.media;
		    var base64= Ti.Utils.base64encode(image).toString();
		    
		    var base64_De= Ti.Utils.base64decode(base64);

		    var imageSave=Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'image.png');
               //imageSave.write(image);   
		    
		   // Crear archivo txt y almacena la cadena de imgane a base_64
		   var f=Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Demo.txt');
		   f.write(JSON.stringify(base64));


		   /*
		    var blob1=imageSave.read();
		    var tempFile=Titanium.Filesystem.createTempFile();
		    tempFile.write(blob1);
		    var contants=tempFile.read();
		    var x =Ti.Utils.base64encode(contants);
                console.log(x);
		    */
		    //var escritura=JSON.parse(x);
		    //alert(x);
		     


		   // Ti.API.info('el blob:......' + JSON.stringify(blob1, null, 2));
		    
		   //var base64=Ti.Utils.base64encode(blob1);
		   //console.log('imagen:  '+JSON.stringify(base64));

		 
		    
		    /*var imagenString=Ti.Utils.base64encode(image).toString('utf8');
		    console.log('image:   '+imageSave);
		    
		    alert(JSON.stringify(imageSave));
		      */  
		 
		    /*
		    var str_blob= imageSave.read();
		    alert(str_blob.width);
		    alert(str_blob.height);
		    var str_64= Ti.Utils.base64encode(str_blob);
		    var decodificado=Ti.Utils.base64decode(str_64);
		    
		    alert(JSON.stringify(str_64));
		    console.log(str_64);
		    alert('Imagend_Decoder_____'+JSON.stringify(decodificado));
		    console.log(decodificado);*/
		},
	});
};




//funcion para validad si hay internte 
function validaInternet(){
	if(Ti.Network.networktype==Ti.Network.NETWORK_NONE){
		alert('No tienes acceso a intenet');
	};
};

validaInternet();

$.index.open();
