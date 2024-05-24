function calculate() {
    const valorConta = parseFloat(document.getElementById('valorConta').value);
    const consumoMensal = parseFloat(document.getElementById('consumoMensal').value);

    if (isNaN(valorConta) || isNaN(consumoMensal)) {
        alert('Por favor, insira valores válidos para a conta de luz e consumo mensal.');
        return;
    }

    // Cálculos para os resultados
    const potenciaInstalada = (consumoMensal / 30) / 5; // 5 horas de sol por dia
    const qtdePaineis = Math.ceil(potenciaInstalada / 0.33); // Cada painel de 330W
    const areaMinima = qtdePaineis * 1.94; // Cada painel ocupa 1.94 m²
    const producaoMensal = consumoMensal;
    const producaoAnual = producaoMensal * 12;
    const valorInvestimento = qtdePaineis * 1000; // Exemplo: cada painel custa R$1000
    const economiaAnual = valorConta * 12;
    const retornoInvestimento = valorInvestimento / economiaAnual;

    // Atualizar resultados no DOM
    document.getElementById('potencia').innerText = potenciaInstalada.toFixed(2);
    document.getElementById('paineis').innerText = qtdePaineis;
    document.getElementById('area').innerText = areaMinima.toFixed(2);
    document.getElementById('producaoMensal').innerText = producaoMensal.toFixed(2);
    document.getElementById('producaoAnual').innerText = producaoAnual.toFixed(2);
    document.getElementById('investimento').innerText = valorInvestimento.toFixed(2);
    document.getElementById('economiaAnual').innerText = economiaAnual.toFixed(2);
    document.getElementById('retorno').innerText = retornoInvestimento.toFixed(2);

    document.getElementById('results').style.display = 'block';
}
