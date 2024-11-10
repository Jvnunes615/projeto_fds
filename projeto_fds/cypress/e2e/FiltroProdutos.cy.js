describe('test suite filtro produtos', () => {

    // Cenário 1: Exibir produtos que se encaixam na faixa de preço especificada
    it('cenario1', () => { 
        cy.visit('/'); 
        
        // Define a faixa de preço para o filtro
        cy.get('[placeholder="Preço Mínimo"]').type('50'); // Preço mínimo
        cy.get('[placeholder="Preço Máximo"]').type('150'); // Preço máximo
        
        // Aplica o filtro de preços
        cy.get('#search-input').type('\n');

        // Verifica se produtos dentro da faixa de preço são exibidos
        cy.get('.card-title').should('exist')

        });

    // Cenário 2: Não exibir produtos por não ter nenhum na faixa de preço especificada
    it('cenario2', () => { 
        cy.visit('/'); 
        
        // Define uma faixa de preço que não tem produtos
        cy.get('[placeholder="Preço Mínimo"]').type('1000'); // Preço mínimo alto
        cy.get('[placeholder="Preço Máximo"]').type('1500'); // Preço máximo alto
        
        // Aplica o filtro de preços
        cy.get('#search-input').type('\n');

        // Verifica que não há produtos visíveis após aplicar o filtro
        cy.get('.card-title').should('not.exist');

        // Exibe uma mensagem de que não há produtos na faixa de preço
        cy.get('.alert').should('contain', 'Nenhum produto encontrado');
    });
});
