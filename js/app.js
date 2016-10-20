window.addEventListener("load", function() {
	var contenedor = document.getElementById("contenedor");
	var contenedorTrello = document.getElementById("contenedorTrello");
	var tarjetaLista = document.getElementById("tarjetaLista");
	var formLista =document.getElementById("formLista");
	var botonLista = document.getElementById("botonLista");
	var inputTitulo = document.getElementById("inputTitulo");
	var contador = 1;

	tarjetaLista.addEventListener("click", function() {
		formLista.classList.remove("ocultar");
		this.classList.add("ocultar");
		inputTitulo.focus();		
	})

	botonLista.addEventListener("click", function(e) {
		e.preventDefault();
		var tarjetero = document.createElement("div");

		tarjetero.setAttribute("draggable", "true");
		tarjetero.addEventListener("drop", drop);
		tarjetero.addEventListener("dragover", dragOver);

		tarjetero.classList.add("form", "bloque-inline");
		var textoTarjeta = document.createTextNode(inputTitulo.value);
		tarjetero.insertBefore(textoTarjeta, tarjetero.childNodes[0]);
		formLista.classList.add("ocultar");
		inputTitulo.value = "";
		agregarTitulo(tarjetero);
		tarjetaLista.classList.remove("ocultar");
		contenedor.appendChild(tarjetero);
		contenedor.appendChild(contenedorTrello);	
	})

	function agregarTitulo(tarjetero) {
		var nuevaTarjeta = document.createElement("div");
		nuevaTarjeta.innerText = "Añadir nueva tarjeta...";
		nuevaTarjeta.setAttribute("class", "nuevaTarjeta");
		tarjetero.appendChild(nuevaTarjeta);
			
		nuevaTarjeta.addEventListener("click", function() {
		nuevaTarjeta.classList.add("ocultar");
		agregarTarjeta(tarjetero, nuevaTarjeta);
		})
	}

		inputTitulo.addEventListener("keyup", function(){
		var campoValido = inputTitulo.value;
	   	var nn = campoValido.length;
    	if (nn <= 0){
    		botonLista.disabled = true;
    	}else if (nn >= 1){
    		botonLista.disabled = false;
    	}
    });

	function agregarTarjeta(tarjetero, nuevaTarjeta) {
		var nuevoTextarea = document.createElement("div");
		var textArea = document.createElement("textarea");
		var botonTextarea = document.createElement("button");
		botonTextarea.innerText = "Guardar";
		tarjetero.appendChild(nuevoTextarea);
		nuevoTextarea.insertBefore(textArea, nuevoTextarea.childNodes[0]).classList.add("form-control");
		textArea.focus();
		nuevoTextarea.insertBefore(botonTextarea, nuevoTextarea.childNodes[1]).classList.add("btn", "btn-success", "botonClass");

		botonTextarea.addEventListener("click", function() {
			var tarjetaValue = document.createElement("div");
			tarjetaValue.innerText = textArea.value;

			tarjetaValue.setAttribute("id", contador++);
			tarjetaValue.setAttribute("draggable", "true");
			tarjetaValue.addEventListener("dragstart", dragStart);
			tarjetaValue.addEventListener("dragover", dragOver);
			tarjetaValue.addEventListener("drop", drop);

			tarjetero.appendChild(tarjetaValue).classList.add("form-control", "tarjetaValue");
			nuevoTextarea.classList.add("ocultar");
			nuevaTarjeta.classList.remove("ocultar");
			tarjetero.appendChild(nuevaTarjeta);
		})
	}
			function dragStart(e){
				e.dataTransfer.setData("text", e.target.id);
			}

			function dragOver(e){
				e.preventDefault();
			}

			function drop(e){
				var idDepositado = e.dataTransfer.getData("text");
				this.insertBefore(document.getElementById(idDepositado),e.target);
			}
});