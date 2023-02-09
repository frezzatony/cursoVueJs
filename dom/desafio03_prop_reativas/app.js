new Vue({
  el: '#desafio',
  data: {
    valor: 0,
  },
  watch: {
    resultado: function () {
      setTimeout(() => {
        console.log('somente é executado quando muda o valor da variavel \'resultado\'')
        this.valor = 0;
      }, 1000);
    }
  },
  computed: {
    resultado() {
      return this.valor != 37 ? 'Valor Diferente' : 'Valor Igual';
    },
  }
});