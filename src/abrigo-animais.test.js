import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,PIPOCA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve respeitar limite de 3 animais por pessoa", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO",
      "SKATE",
      "Rex,Mimi,Zero,Bola"
    );

    expect(resultado.lista[0]).toBe("Bola - pessoa 1");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 1");
    expect(resultado.lista[2]).toBe("Rex - pessoa 1");
    expect(resultado.lista[3]).toBe("Zero - abrigo"); 
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve garantir que gatos não dividem brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER,RATO",
      "CAIXA,NOVELO",
      "Mimi,Zero"
    );

    expect(resultado.lista[0]).toBe("Mimi - pessoa 1");
    expect(resultado.lista[1]).toBe("Zero - abrigo");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });
});
