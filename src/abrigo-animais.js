import { animais_brinquedos, animais_tipos } from "./animais-repository.js";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisP1 = [];
    const animaisP2 = [];

    let lista = [];

    const animaisParaAdotar = ordemAnimais.split(",");
    brinquedosPessoa1 = brinquedosPessoa1.split(",");
    brinquedosPessoa2 = brinquedosPessoa2.split(",");

    if (!this.verificaAnimais(animaisParaAdotar))
      return { erro: "Animal inválido" };
    if (!this.verificaBrinquedos(brinquedosPessoa1))
      return { erro: "Brinquedo inválido" };
    if (!this.verificaBrinquedos(brinquedosPessoa2))
      return { erro: "Brinquedo inválido" };

    for (let animal of animaisParaAdotar) {
      let resultado;

      if (
        this.ordemBrinquedos(brinquedosPessoa1, animal) &&
        this.ordemBrinquedos(brinquedosPessoa2, animal)
      ) {
        resultado = `${animal} - abrigo`;
      } else if (this.ordemBrinquedos(brinquedosPessoa1, animal)) {
        if (animaisP1.length < 3) {
          animaisP1.push(animal);
          resultado = `${animal} - pessoa 1`;
          if (animais_tipos[animal] === "gato") {
            this.removeBrinquedosGato(brinquedosPessoa1, animal);
          }
        } else {
          resultado = `${animal} - abrigo`;
        }
      } else if (this.ordemBrinquedos(brinquedosPessoa2, animal)) {
        if (animaisP2.length < 3) {
          animaisP2.push(animal);
          resultado = `${animal} - pessoa 2`;
          if (animais_tipos[animal] === "gato") {
            this.removeBrinquedosGato(brinquedosPessoa2, animal);
          }
        } else {
          resultado = `${animal} - abrigo`;
        }
      } else {
        resultado = `${animal} - abrigo`;
      }

      lista = this.ordemAlfabetica(lista, resultado);
    }

    return {
      lista: lista,
    };
  }

  verificaAnimais(animais) {
    // Verificar se todos os animais existem
    for (let animal of animais) {
      if (!animais_brinquedos[animal]) {
        return false;
      }
    }

    // Verificar duplicatas
    const animaisUnicos = [...new Set(animais)];
    if (animaisUnicos.length !== animais.length) {
      return false;
    }

    return true;
  }

  verificaBrinquedos(brinquedos) {
    const brinquedosValidos = [
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ];

    // Verificar se todos os brinquedos são válidos
    for (let brinquedo of brinquedos) {
      if (!brinquedosValidos.includes(brinquedo)) {
        return false;
      }
    }

    // Verificar duplicatas
    const brinquedosUnicos = [...new Set(brinquedos)];
    if (brinquedosUnicos.length !== brinquedos.length) {
      return false;
    }

    return true;
  }

  // Essa função confere se a pessoa tem a ordem dos brinquedos necessário para
  // poder adotar o animal, retorna true se sim e false se não
  ordemBrinquedos(brinquedosPessoa, animal) {
    const brinquedosAnimal = animais_brinquedos[animal];

    let i = 0;
    const fim = brinquedosAnimal.length;

    for (let brinquedo of brinquedosPessoa) {
      if (brinquedo === brinquedosAnimal[i]) {
        i++;
        if (i == fim) {
          return true;
        }
      }
    }
    return false;
  }

  // Remove os brinquedos que o gato vai usar caso a pessoa vá adotar ele,
  // para garantir que o gato não divida seus brinquedos
  removeBrinquedosGato(brinquedosPessoa, animal) {
    const brinquedosAnimal = animais_brinquedos[animal];
    let j = 0;
    for (let i = 0; i < brinquedosPessoa.length; i++) {
      if (brinquedosPessoa[i] === brinquedosAnimal[j]) {
        brinquedosPessoa = brinquedosPessoa.splice(i, 1);
        i--;
        j++;
      }
    }

    return brinquedosPessoa;
  }

  // Garante a ordem alfabética da saída
  ordemAlfabetica(lista, resultado) {
    let novaLista = [];

    if (lista.length == 0) {
      lista.push(resultado);
      return lista;
    }

    for (let i = 0; i < lista.length + 1; i++) {
      if (lista[i] < resultado) {
        novaLista.push(lista[i]);
      } else {
        novaLista.push(resultado);
        for (i; i < lista.length; i++) {
          novaLista.push(lista[i]);
        }
      }
    }

    return novaLista;
  }
}

const abrigo = new AbrigoAnimais();

abrigo.encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fofo");

export { AbrigoAnimais as AbrigoAnimais };
