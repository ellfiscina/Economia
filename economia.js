$( document ).ready(function() {
   var pgto; //pagamento periodico
   var vp; //valor presente
   var i; //taxa de juro
   var n; //numero de pagamentos
   var vf; //valor futuro
   var result;
   function parcela(vp, i, n){
      return vp*(i*Math.pow(1+i,n))/(Math.pow(1+i,n)-1);
   }

   function avista(pgto,i,n){
      return pgto*(Math.pow(1+i,n)-1)/(i*Math.pow(1+i,n));
   }

   function valorfuturo(pgto,i,n){
      return pgto*(Math.pow(1+i,n) - 1)/i;
   }

   $("#btn").click(function(){
      i = $("#i").val()/100;
      n = $("#n").val();
      if($(".radio:checked").val() == "parcelado"){
         vp = $("#vp").val();
         str = "PGTO = R$";
         result = parcela(vp,i,n);
      }
      else if($(".radio:checked").val() == "avista"){
         pgto = $("#pgto").val();
         str = "VP = ";
         result = avista(pgto,i,n);
      }
      else if($(".radio:checked").val() == "futuro"){
         pgto = $("#pgto").val();
         str = "VF = ";
         result = valorfuturo(pgto,i,n);
      }
         $("#result").text(str + result.toFixed(2));
   });

   $(".radio").click(function(){
      if($(".radio:checked").val() == "parcelado"){
         $("#vp").removeAttr("disabled");
         $("#pgto").attr("disabled","disabled");
      }
      else if($(".radio:checked").val() == "avista" | $(".radio:checked").val() == "futuro"){
         $("#pgto").removeAttr("disabled");
         $("#vp").attr("disabled","disabled");
      }
   });
});