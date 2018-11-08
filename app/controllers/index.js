var ImageFactory = require('ti.imagefactory');
var seleccionarImagen = false;
var image;
var movimiento=0;

var viewImg = Ti.UI.createImageView({
	height: '80%',
	width: '85%',
	backgroundColor: "#F0FFFF",
	borderRadius: 10,
	borderWidth: 1,
	borderColor: "white",
	top: "20%"
});
$.viewImage.add(viewImg);

//Abrir Galeria y mostar foto 
function AbrirGaleria() {
	Titanium.Media.openPhotoGallery({
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],

		success: function (event) {
			if (event.mediaTypes == Ti.MEDIA_TYPE_PHOTO) {
				image = event.media;
				viewImg.setImage(event.media);
				seleccionarImagen = true;

			} else {
				alert('No se accede a galeria');
			}
		},
	});
};


//captura foto
function CapturaFoto(e) {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions(function (e) {
			if (e.success) {
				camaraFotos();
			} else {
				alert('No se puede tener permisos de la camara');
			}
		});
	} else {
		camaraFotos();
	};
};


function camaraFotos() {
	Ti.Media.showCamera({
		//Permisos para la camara
		//saveToPhotoGallery: true,
		//allowEditing: false,
		//autohide: false,
		success: function (event) {
			image = event.media;
			viewImg.setImage(event.media);

			seleccionarImagen = true;

		},
	});
};



$.btnEnviar.addEventListener('click', function (e) {
	if (seleccionarImagen == false) {
		viewImg.setBorderColor("red");
		viewImg.setBackgroundImage(backgroundImage = '/images/descarga.png', height = "10%", width = "10%");
		alert('No hay imagen para enviar');
	} else {
		var xhr = Ti.Network.createHTTPClient({
			onload: function (e) {
				var result = JSON.parse(this.responseText);
				console.log('Resultado_________ ', result);

				var DatosObjeto = {
					response: JSON.parse(this.responseText)
				};
				//Mandar a pantalla de datos
				Alloy.createController('datos', DatosObjeto).getView().open();

			},
			onsendstream: function (e) {
				Ti.API.info('Envio informaciòn____:  ' + e.progress);
			},
			onerror: function (e) {
				alert("Volver a intentar");
			},
			timeout: 10000
		});

		var imagenComprimida = ImageFactory.compress(image, 0.25);
		var img = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'imagen.png');
		img.write(imagenComprimida);

		var imag2 = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'imagen.png');
		imag2.read();

		var base64 = Ti.Utils.base64encode(imag2).toString();

		//convertir base64 a json
		var json64 = {
			"source": base64
		};

		xhr.open('POST', 'https://ko7afa9vef.execute-api.us-east-2.amazonaws.com/SDA');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(JSON.stringify(json64));
	}
});


function rotarfoto(e){
	var matrix = Ti.UI.create2DMatrix();
              matrix = matrix.rotate(-90);
      var a = Ti.UI.createAnimation({
            transform : matrix,
	});
	image.animate(a);
};

viewImg.addEventListener('click', function(){
	var matrix = Ti.UI.create2DMatrix();
              matrix = matrix.rotate(-90);
      var a = Ti.UI.createAnimation({
            transform : matrix,
	});
	viewImg.animate(a);
});


$.imgRotar.addEventListener('click', function(){
     rotar();
     //rotarfoto();
});

function rotar(e){
	movimiento =Number(movimiento)+90;
	var movimientoImagen=ImageFactory.imageWithRotation(image,{
		degrees:-90,
	});
	image=movimientoImagen;
	viewImg.setImage(image);
}

$.index.open();


//this function sets the chosen image and removes the 4
//funny faces from the screen
