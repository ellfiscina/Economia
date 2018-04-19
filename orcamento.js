$( document ).ready(function() {
	let n;	//período
	let fc = new Array;	//fluxo de caixa
	let vp = new Array;	//valor presente
	let vf = new Array;	//saldo ou valor futuro
	let j; //taxa de juros
	let result;

	function pbd(){
		for (var i = 1; i <= n; i++) {
			vp[i] = parseFloat(fc[i]/Math.pow(1+j, i));
			vf[i] = parseFloat(vp[i]+vf[i-1]);
			if(vf[i] >= 0 & vf[i-1] < 0){
				return ((i-1)+(Math.abs(vf[i-1])/vp[i]));
			}
		}
	}

	function vpl(){
		let val = vp[0];
		for (var i = 1; i <= n; i++) {
			val += vf[i]/Math.pow(1+j, i);
		}
		console.log(val);
		return val;
	}

	$("#aVPL").click(function(){
		let formVPL = '<h4>Valor Presente Líquido</h4><hr>' +
			'<label>Saldo Inicial:</label><br>' +
			'<input type="text" name="vp" id="vp">' +
			'<br><label>Valores Futuros:</label><br>' +
			'<input type="text" name="vf" id="vf" placeholder="100 250 430">' +
			'<br><label>Taxa de juro (%):</label><br>' +
			'<input type="text" name="j" id="j" placeholder="Ex: 95.9">' +
			'<br><label>Período:</label><br>' +
			'<input type="text" name="n" id="n"><br>' +
			'<button class="btn btnO" id="btnVPL">OK</button>';
		$('.form').empty();
		$('.result').empty();
		$('.form').append(formVPL);
		$('#liPBD').removeClass('active');
		$('#liVPL').attr('class', 'active');
	});

	$("#aPBD").click(function(){
		let formPBD = '<h4>Payback Descontado</h4><hr>' +
			'<label>Saldo Inicial:</label><br>' +
			'<input type="text" name="vp" id="vp">' +
			'<br><label>Fluxos de Caixa:</label><br>' +
			'<input type="text" name="fc" id="fc" placeholder="-100 25 40">' +
			'<br><label>Taxa de juro (%):</label><br>' +
			'<input type="text" name="j" id="j" placeholder="Ex: 95.9">' +
			'<br><label>Período:</label><br>' +
			'<input type="text" name="n" id="n"><br>' +
			'<button class="btn btnO" id="btnPBD">OK</button>';
		$('.form').empty();
		$('.result').empty();
		$('.form').append(formPBD);
		$('#liVPL').removeClass('active');
		$('#liPBD').attr('class', 'active');
	});

	$('.form').on('click', '#btnPBD', function(){
		let aux;
		j = parseFloat($("#j").val()/100);
		n = $("#n").val();
		aux = $("#vp").val();
		vp.push(parseFloat(aux));
		vf.push(parseFloat(aux));
		
		aux = $("#fc").val();
		fc = aux.split(" ");
		for (i in fc){
			fc[i] = parseFloat(fc[i], 10);
		} 

		result = pbd();

		vp.length = 0;
		vf.length = 0;
		fc.length = 0;
		$("#num").text(result.toFixed(2) + " anos");
		$("#txt").empty();
	});
	
	$('.form').on('click', '#btnVPL', function(){
		let aux;
		j = parseFloat($("#j").val()/100);
		n = $("#n").val();
		aux = $("#vp").val();
		vp.push(parseFloat(aux));
		
		aux = $("#vf").val();
		vf = aux.split(" ");
		for (i in vf){
			vf[i] = parseFloat(vf[i], 10);
		} 
		vf.unshift(0);
		result = vpl();

		vp.length = 0;
		vf.length = 0;
		fc.length = 0;
		
		$("#num").text(result.toFixed(2));
		if(result > 0){
			$("#txt").text("Projeto Aceito");
		}
		else{
			$("#txt").text("Projeto Rejeitado");
			$(".result").css("color", "#e74c3c");
		}

	});

});