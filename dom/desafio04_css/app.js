new Vue({
  el: '#desafio',
  data: {
    classeDestaque: 'destaque',
    box: true,
    classeDoUsuario: '',
    fundoVerde: false,
    bgDiv: '#FFF',
    progressoBarra: 0,
  },
  methods: {
    iniciarEfeito() {
      setInterval(() => {
        this.classeDestaque = this.classeDestaque == 'destaque' ? 'encolher' : 'destaque';
      }, 500);
    },
    iniciarProgresso() {
      this.progressoBarra = 0;
      let myInterval = setInterval(() => {
        if (this.progressoBarra == 100) {
          clearInterval(myInterval);
          return;
        }
        this.progressoBarra++;
        console.log(this.progressoBarra)
      }, 30);
    },
    aplicaClasseDoUsuario: function (newValue) {
      this.fundoVerde = newValue == 'true';
    },
  },
})
