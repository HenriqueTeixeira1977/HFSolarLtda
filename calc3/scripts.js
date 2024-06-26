document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            document.getElementById('endereco').value = data.logradouro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
        })
        .catch(error => console.error('Erro ao buscar o CEP:', error));
});

//  Script da Calculadora

document.getElementById('solar-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const valorConta = parseFloat(document.getElementById('valor-conta').value);
    const consumoMensal = parseFloat(document.getElementById('consumo-mensal').value);
    const custoKwh = valorConta / consumoMensal;

    if (isNaN(valorConta) || isNaN(consumoMensal) || valorConta <= 0 || consumoMensal <= 0) {
        alert('Por favor, insira valores válidos para o valor da conta e o consumo mensal.');
        return;
    }

    // Suposição de 8 horas de sol por dia e 30 dias no mês
    const horasSolDia = 9;
    const diasNoMes = 30;
    const eficienciaPainel = 0.18; // Eficiência média dos painéis solares (18%)
    const areaPainel = 2.8; // Área média de um painel solar em m²
    const potenciaPainel = 0.25; // Potência média de um painel solar em kW (570 W)
    const potenciaModulo = 570;  //
    
    //  Area de Cálculos;
    const potenciaSistema = consumoMensal / (diasNoMes * horasSolDia);
    const qtdePaineis = Math.ceil(potenciaSistema / potenciaPainel);
    const areaMinimaOcupada = qtdePaineis * areaPainel;

    const producaoMensal = potenciaSistema * horasSolDia * diasNoMes;
    const producaoAnual = producaoMensal * 12;
    const custoSistema = potenciaSistema * 7290; // Suposição de custo por kW instalado (ajuste conforme necessário)
    
    const totalPotencia = potenciaModulo * qtdePaineis; 
    const economiaAnual = consumoMensal * custoKwh * 12;
    const payback = custoSistema / economiaAnual;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Investimento:<br> <span>R$${custoSistema.toFixed(2)}</span></p><br>
        <p>Qtde de Painéis:<br> <span>${qtdePaineis}</span></p><br>
        <p>Área Mín:<br> <span>${areaMinimaOcupada.toFixed(2)} m²</span></p><br>
        
        <p>Potencia Total:<br> <span>${totalPotencia.toFixed(2)} WP</span></p><br>       
        <p>Potência Média:<br><span>${potenciaSistema.toFixed(2)} kW</span></p><br>
        <p>Produção Mês:<br> <span>${producaoMensal.toFixed(2)} kWh</span></p><br>
        
        <p>Produção Ano:<br> <span>${producaoAnual.toFixed(2)} kWh</span></p><br>
        <p>Economia Ano:<br> <span>R$ ${economiaAnual.toFixed(2)}</span></p><br>
        <p>PayBack:<br> <span>${payback.toFixed(2)} anos</span></p><br>
    `;

});


//  <!-- Google tag (gtag.js) -->

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2HJZTFTFZ7');

//  Script de envio de dados do Formulario para Google Sheets

const script_do_google = 'https://script.google.com/macros/s/AKfycbzh5phaitF3BEYVF2F6wEAUoeMArc4htJT5b4jesWsHbyBmeDnVAiSC3TdlQs9GGEQ8Xw/exec';
const dados_do_formulario = document.forms['formulario-contato'];

dados_do_formulario.addEventListener('submit', function (e) {
    e.preventDefault();

fetch(script_do_google, { method: 'POST', body: new FormData(dados_do_formulario) })
.then(response => {
    //se os Dados forem gravados corretamente, será enviadad uma mensagem de sucesso
    alert('Dados enviados com Sucesso!', response);
    dados_do_formulario.reset();
})
.catch(error =>
    //  Se houver erro no envio, amensagem abaixo será exibida
    console.error('Erro no envio dos Dados!', error));
});