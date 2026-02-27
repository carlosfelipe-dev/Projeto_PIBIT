// Funcionamento dos botões
const botoes_apoio = document.getElementById('material-apoio')
const material_teorico = document.getElementById('material-teorico')
const questionarios = document.getElementById('questionarios') 

botoes_apoio.addEventListener('click', function() {
    alert('Material de Apoio - Em desenvolvimento');
    console.log('Botão Material de Apoio clicado');
});

material_teorico.addEventListener('click', function() {
    alert('Material Teórico - Em desenvolvimento');
    console.log('Botão Material Teórico clicado');
});

questionarios.addEventListener('click', function() {
    alert('Questionários - Em desenvolvimento');
    console.log('Botão Questionários clicado');
});
