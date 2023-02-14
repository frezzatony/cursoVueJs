new Vue({
  el: '#desafio',
  data: {
    nome: 'Tony Frezza',
    idade: 33,
    srcImagem: 'https://www.freecodecamp.org/news/content/images/size/w2000/2022/08/Vue-Blog-Cover-2.png',
  },
  methods: {
    multiplicarIdade: function (fator) {
      return this.idade * fator;
    }
  }
});