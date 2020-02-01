<template>
  <div>
      este es el credito
  </div>
</template>

<script>
class usuario {
  constructor(){
    this.nombre = '';
    this.apellidos = '';
    this.codigo = '';
    this.direccion = '';
    this.celular = '';
    this.rol= '';
  }
}
import axios from 'axios'
export default {
name:'VerCredito',
data () {
    return {
      user: new usuario()
    }
  },
}

</script>

<style>

</style>