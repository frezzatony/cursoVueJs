new Vue({
  el: '#app',
  data: {
    players: {
      jogador: {
        life_inicial: 100,
        life: 100,
        ataques: {
          min: 1,
          max: 10,
          min_especial: 10,
          max_especal: 13,
        },
        cura: {
          min: 10,
          max: 17,
        }
      },
      monstro: {
        life_inicial: 100,
        life: 100,
        ataques: {
          min: 10,
          max: 12
        }
      }
    },
    jogoIniciado: false,
    jogoEncerrado: false,
    playerVencedor: null,
    listaAcontecimentos: [],
    sentencas: {
      'attack': ['Jogador lançou uma magia', 'Jogador aplicou um golpe', 'Jogador foi agressivo', 'Jogador aplicou uma investida'],
      'especial-attack': ['Jogador lançou uma SUPER magia', 'Jogador aplicou um ULTRA golpe', 'Jogador HIPER agrediu', 'Jogador aplicou uma MEGA investida'],
      'heal': ['Jogador usou o poder da cura', 'Jogador está aliviado e curado', 'O poder da cura é seu Jogador!'],
      'give-up': ['Monstro lançou uma magia', 'Monstro aplicou um golpe', 'Monstro foi agressivo', 'Monstro aplicou uma investida'],
    }
  },
  methods: {
    iniciarJogo: function () {
      this.jogoIniciado = true;
      this.jogoEncerrado = false;
      this.playerVencedor = null;
      this.players.jogador.life = this.players.jogador.life_inicial;
      this.players.monstro.life = this.players.monstro.life_inicial;
      this.listaAcontecimentos = [];
    },
    encerrarJogo: function () {
      this.jogoIniciado = false;
      this.jogoEncerrado = false;
      this.listaAcontecimentos = [];
    },
    runRodadaSimples: function () {
      this.ataqueJogador();
      this.updateStatusJogo();
      if (!this.jogoEncerrado) {
        this.ataqueMonstro();
        this.updateStatusJogo();
      }
    },
    runRodadaAtaqueEspecial: function () {
      this.ataqueEspecialJogador();
      this.updateStatusJogo();
      if (!this.jogoEncerrado) {
        this.ataqueMonstro();
        this.updateStatusJogo();
      }
    },
    runRodadaCurarJogador: function () {
      this.curarJogador();
      this.ataqueMonstro();
      this.updateStatusJogo();
    },
    ataqueJogador: function () {
      const minValorAtaque = Math.ceil(this.players.jogador.ataques.min);
      const maxValorAtaque = Math.floor(this.players.jogador.ataques.max);
      const valorAtaqueJogador = Math.floor(Math.random() * (maxValorAtaque - minValorAtaque) + minValorAtaque);
      this.players.monstro.life -= valorAtaqueJogador;
      this.addAcontecimento('Jogador', 'attack', valorAtaqueJogador);
    },
    ataqueEspecialJogador: function () {
      const minValorAtaque = Math.ceil(this.players.jogador.ataques.min_especial);
      const maxValorAtaque = Math.floor(this.players.jogador.ataques.max_especal);
      const valorAtaqueJogador = Math.floor(Math.random() * (maxValorAtaque - minValorAtaque) + minValorAtaque);
      this.removeLifeMonstro(valorAtaqueJogador);
      this.addAcontecimento('Jogador', 'especial-attack', valorAtaqueJogador);
    },
    curarJogador: function () {
      const minValorCura = Math.ceil(this.players.jogador.cura.min);
      const maxValorCura = Math.floor(this.players.jogador.cura.max);
      const valorCuraJogador = Math.floor(Math.random() * (maxValorCura - minValorCura) + minValorCura);
      this.addLifeJogador(valorCuraJogador);
      this.addAcontecimento('Jogador', 'heal', valorCuraJogador);
    },
    ataqueMonstro: function () {
      const minValorAtaque = Math.ceil(this.players.monstro.ataques.min);
      const maxValorAtaque = Math.floor(this.players.monstro.ataques.max);
      const valorAtaqueMonstro = Math.floor(Math.random() * (maxValorAtaque - minValorAtaque) + minValorAtaque);
      this.removeLifeJogador(valorAtaqueMonstro);
      this.addAcontecimento('Monstro', 'give-up', valorAtaqueMonstro);
    },
    addAcontecimento: function (player, acao, life) {
      this.listaAcontecimentos.unshift({ time: new Date(), player: player, acao: acao, life: life });
    },
    addLifeJogador: function (valor) {
      if (this.players.jogador.life + valor > 100) {
        this.players.jogador.life = 100;
      }
      if (this.players.jogador.life + valor <= 100) {
        this.players.jogador.life += valor;
      }
    },
    removeLifeJogador: function (valor) {
      if (this.players.jogador.life - valor <= 0) {
        this.players.jogador.life = 0;
      }
      if (this.players.jogador.life - valor >= 0) {
        this.players.jogador.life -= valor;
      }
    },
    removeLifeMonstro: function (valor) {
      if (this.players.monstro.life - valor <= 0) {
        this.players.monstro.life = 0;
      }
      if (this.players.monstro.life - valor >= 0) {
        this.players.monstro.life -= valor;
      }
    },
    updateStatusJogo: function () {
      if (this.players.jogador.life <= 0 || this.players.monstro.life <= 0) {
        this.jogoIniciado = false;
        this.jogoEncerrado = true;
        this.playerVencedor = this.players.jogador.life == 0 ? 'monstro' : 'jogador';
      }
    },
    getSentenca: function (acao, player) {
      const posicaoMin = Math.ceil(0);
      const posicaoMax = Math.floor(this.sentencas[acao].length);
      const posicaoSentenca = Math.floor(Math.random() * (posicaoMax - posicaoMin) + posicaoMin);
      return this.sentencas[acao][posicaoSentenca];
    },
  }
})