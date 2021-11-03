<template>
<div>
    <div class="bg-dark text-secondary text-right">
        <div>{{$auth.$state.user.rol}}  &emsp; {{ $auth.$state.user.nombreE }} {{$auth.$state.user.primerApellidoE}} {{$auth.$state.user.segundoApellidoE}}  &emsp; {{fechaa}}  &emsp; {{hora}} &emsp;</div> 
    </div>
</div>
    
</template>
<script>
export default { 
  middleware: 'auth',
  name:'footerActivo',
  data(){
    return {
      fecha:null,
      hora:null,
    }    
  },
  mounted(){
    this.cambiarHora()    
  },
  computed:{
    fechaa: function(){
      let f = new Date()     
      return this.fecha = ' '+f.getDate()+'-'+(f.getMonth()+1)+'-'+f.getFullYear()+' '
    },  
  },
  methods: {
    cambiarHora(){
      setInterval(() => {
        this.time()
      }, 1000);
    },
    time(){
      let tim = new Date();
      this.hora =  tim.toLocaleString('es-CO', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    },
  }
}
</script>